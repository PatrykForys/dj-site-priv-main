'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';

interface ImageModalProps {
    images: string[];
    currentIndex: number;
    onClose: () => void;
}

export default function ImageModal({ images, currentIndex, onClose }: ImageModalProps) {
    const [index, setIndex] = useState(currentIndex);
    const [direction, setDirection] = useState(0);

    const handleNext = useCallback(() => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, handleNext, handlePrev]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center"
            onClick={onClose}
        >
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={onClose}
                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-[9999]"
            >
                <IoClose size={36} />
            </motion.button>

            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-[9999] bg-black/20 p-3 rounded-full backdrop-blur-sm"
            >
                <IoIosArrowBack size={36} />
            </motion.button>

            <div
                className="relative max-w-5xl w-full aspect-[4/3] mx-6"
                onClick={e => e.stopPropagation()}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[index]}
                            alt={`Zdjęcie ${index + 1}`}
                            fill
                            className="object-contain"
                            quality={100}
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-[9999] bg-black/20 p-3 rounded-full backdrop-blur-sm"
            >
                <IoIosArrowForward size={36} />
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 text-lg font-medium bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
            >
                {index + 1} / {images.length}
            </motion.div>
        </motion.div>
    );
} 
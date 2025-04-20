"use client";

import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";

interface AudioPermissionPopupProps {
  onAllow: () => void;
  onDeny: () => void;
}

export default function AudioPermissionPopup({
  onAllow,
  onDeny,
}: AudioPermissionPopupProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDeny();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDeny]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 md:bottom-20 md:right-1/4 z-50 bg-black/95 border border-white/10 rounded-lg p-3 md:p-4 shadow-lg backdrop-blur-sm md:max-w-sm w-full mx-auto md:mx-0"
    >
      <button
        onClick={onDeny}
        className="absolute top-1 right-1 md:top-2 md:right-2 text-white/60 hover:text-white transition-colors"
        aria-label="Zamknij"
      >
        <IoClose size={18} />
      </button>

      <p className="text-white text-center text-sm md:text-base mb-3 md:mb-4 mt-1 md:mt-2">
        Przejrzyj moją stronę z dobrą muzyką! 🎧
      </p>
      <div className="flex justify-center gap-2 md:gap-3">
        <button
          onClick={onAllow}
          className="px-3 md:px-4 py-1.5 md:py-2 bg-primary text-white rounded-full text-xs md:text-sm hover:bg-primary/80 transition-colors"
        >
          Tak, włącz
        </button>
        <button
          onClick={onDeny}
          className="px-3 md:px-4 py-1.5 md:py-2 bg-white/10 text-white rounded-full text-xs md:text-sm hover:bg-white/20 transition-colors"
        >
          Nie, dziękuję
        </button>
      </div>
    </motion.div>
  );
}

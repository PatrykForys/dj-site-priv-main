"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ImageModal from "@/components/ImageModal";
import Script from 'next/script';

const images = [
  "/gallery/1.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/7.jpg",
  "/gallery/8.jpg",
  "/gallery/9.jpg",
  "/gallery/10.jpg",
  "/gallery/11.jpg",
  "/gallery/12.jpg",
  "/gallery/14.jpg",
  "/gallery/15.jpg",
  "/gallery/16.jpg",
  "/gallery/17.jpg",
  "/gallery/18.jpg",
  "/gallery/19.jpg",
  "/gallery/20.jpg",
  "/gallery/21.jpg",
  "/gallery/22.jpg",
  "/gallery/23.jpg",
  "/gallery/24.jpg",
  "/gallery/25.jpg",
  "/gallery/26.jpg",
  "/gallery/27.jpg",
  "/gallery/29.jpg",
  "/gallery/30.jpg",
  "/gallery/31.jpg",
  "/gallery/32.jpg",
  "/gallery/33.jpg",
  "/gallery/34.jpg",
  "/gallery/35.jpg",
  "/gallery/36.jpg",
  "/gallery/37.jpg",
  "/gallery/38.jpg",
  "/gallery/39.jpg",
  "/gallery/40.jpg",
  "/gallery/41.jpg",
  "/gallery/42.jpg",
  "/gallery/44.jpg",
  "/gallery/45.jpg",
  "/gallery/46.jpg",
  "/gallery/47.jpg",
  "/gallery/48.jpg",
  "/gallery/49.jpg",
  "/gallery/50.jpg",
  "/gallery/51.jpg",
  "/gallery/52.jpg",
  "/gallery/53.jpg",
  "/gallery/54.jpg",
  "/gallery/55.jpg",
  "/gallery/56.jpg",
  "/gallery/57.jpg",
  "/gallery/58.jpg",
  "/gallery/60.jpg",
  "/gallery/60.jpg",
  "/gallery/90.jpg",
];

export default function GaleriaPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <Script
        id="gallery-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Galeria DJ Den_Weel",
            "description": "Galeria zdjęć i filmów z imprez prowadzonych przez DJ Den_Weel",
            "about": {
              "@type": "Event",
              "name": "Imprezy i wydarzenia muzyczne",
              "description": "Zdjęcia i filmy z wesel, osiemnastek i imprez firmowych"
            },
            "creator": {
              "@type": "Person",
              "name": "DJ Den_Weel",
              "jobTitle": "DJ",
              "url": "https://dj-site-dun.vercel.app"
            }
          })
        }}
      />
      <main className="min-h-screen py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-title"
            >
              Galeria
            </motion.h1>
            <Link
              href="/"
              className="text-primary hover:text-primary/80 transition-colors font-bold relative group"
            >
              <span className="relative">
                Powrót do strony głównej
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image}
                className="relative aspect-square cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`Zdjęcie ${index + 1}`}
                  fill
                  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  priority={index < 12}
                />
              </div>
            ))}
          </div>

          {selectedImage !== null && (
            <ImageModal
              images={images}
              currentIndex={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </div>
      </main>
    </>
  );
}

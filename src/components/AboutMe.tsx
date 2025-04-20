'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ImageModal from '@/components/ImageModal';

export default function AboutMe() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    '/img/80.jpg',
    '/img/78.jpg',
    '/img/79.jpg',
    '/img/30.jpg'
  ];

  return (
    <section id="about" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Zdjęcie główne */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(0)}
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={images[0]}
                alt="Sprzęt DJ-ski"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </div>

          {/* Tekst */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              O mnie
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Cześć! Jestem Daniel, znany jako DJ Den_Weel. Od lat tworzę niezapomniane muzyczne wspomnienia na różnorodnych imprezach - od wesel, przez urodziny, aż po eventy firmowe.
              </p>
              <p>
                Moja pasja do muzyki i profesjonalny sprzęt DJ-ski pozwalają mi dostosować się do każdego wydarzenia i preferencji muzycznych gości. Dzięki wysokiej jakości nagłośnieniu i efektom świetlnym, gwarantuję niezapomniane wrażenia muzyczne na każdej imprezie.
              </p>
              <p>
                Specjalizuję się w tworzeniu idealnej atmosfery, łącząc różne gatunki muzyczne i dostosowując repertuar do charakteru imprezy oraz oczekiwań klientów. Moim celem jest sprawienie, by każde wydarzenie było wyjątkowe i pozostało w pamięci na długo.
              </p>
            </div>

            {/* Galeria miniatur */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(index + 1)}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image}
                      alt={`Zdjęcie ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {selectedImage !== null && (
          <ImageModal
            images={images}
            currentIndex={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </section>
  );
} 
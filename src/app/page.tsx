'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSlider from '@/components/HeroSlider';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import ContactForm from '@/components/ContactForm';
import WhyMeSection from '@/components/WhyMeSection';
import MusicPlayer from '@/components/MusicPlayer';
import FloatingNotes from '@/components/FloatingNotes';
import AboutMe from '@/components/AboutMe';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOfferClick = () => {
    // Najpierw przewijamy do sekcji About z animacją fade-in
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      aboutSection.style.animation = 'fadeIn 1s ease-in';
    }

    // Po 1.5 sekundach przewijamy do sekcji Services z animacją slide-up
    setTimeout(() => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'  
        });
        servicesSection.style.animation = 'slideUp 1s ease-out';
      }
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen">
      {/* Floating music notes background */}
      <FloatingNotes />

      {/* Hero Section */}
      <section className="relative h-screen">
        <HeroSlider />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="hero-text overflow-hidden">
              <span className="block animate-text-reveal">
                Nadaję rytm
              </span>
              <span className="block animate-text-reveal">
                Twoim wspomnieniom
              </span>
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <button
                onClick={handleOfferClick}
                className="btn-primary mt-8 inline-block"
              >
                Poznaj moją ofertę
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about">
        <AboutMe />
      </section>

      {/* Services Section */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Why Me Section */}
      <WhyMeSection />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Music Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <MusicPlayer />
      </div>
    </main>
  );
}

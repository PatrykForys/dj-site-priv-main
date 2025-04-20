'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaPhone, FaYoutube, FaTiktok, FaInstagram, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-12"
        >
          <Link href="/">
            <Image
              src="/img/logo.png"
              alt="DJ Den_Weel Logo"
              width={220}
              height={73}
              className="h-full w-auto object-contain hover:scale-105 transition-all duration-300"
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          {/* Profil DJ-ski na Facebooku */}
          <a
            href="https://www.facebook.com/profile.php?id=100089967923233"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors"
            title="Profil DJ-ski"
          >
            <FaFacebook size={16} />
            <span className="hidden lg:inline text-sm">DJ Den_Weel</span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/chokus74"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors"
          >
            <FaInstagram size={16} />
            <span className="hidden lg:inline text-sm">Instagram</span>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@djden_weel1833"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors"
          >
            <FaYoutube size={16} />
            <span className="hidden lg:inline text-sm">YouTube</span>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@danielwojtasik3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors"
          >
            <FaTiktok size={14} />
            <span className="hidden lg:inline text-sm">TikTok</span>
          </a>

          {/* Telefon */}
          <a
            href="tel:+48667510190"
            className="flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors ml-1"
          >
            <FaPhone size={14} />
            <span className="hidden sm:inline text-sm">667 510 190</span>
          </a>
          <Link href="/admin" className="flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors ml-1">
            <FaUser size={14} />
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
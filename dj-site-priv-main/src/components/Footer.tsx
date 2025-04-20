'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaGithub } from 'react-icons/fa';

const socialVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.68, -0.55, 0.265, 1.55]
    }
  })
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const linkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.68, -0.55, 0.265, 1.55]
    }
  }
};

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-white/10 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Social Media */}
          <motion.div className="flex items-center gap-4">
            <motion.a
              custom={0}
              variants={socialVariants}
              href="https://www.facebook.com/profile.php?id=100089967923233"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-primary transition-colors"
              aria-label="Facebook"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFacebook size={24} />
            </motion.a>
            <motion.a
              custom={1}
              variants={socialVariants}
              href="https://www.instagram.com/chokus74"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-primary transition-colors"
              aria-label="Instagram"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInstagram size={24} />
            </motion.a>
            <motion.a
              custom={2}
              variants={socialVariants}
              href="https://www.youtube.com/@djden_weel1833"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-primary transition-colors"
              aria-label="YouTube"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaYoutube size={24} />
            </motion.a>
            <motion.a
              custom={3}
              variants={socialVariants}
              href="https://www.tiktok.com/@danielwojtasik3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-primary transition-colors"
              aria-label="TikTok"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTiktok size={22} />
            </motion.a>
          </motion.div>

          {/* Links */}
          <motion.div 
            className="flex items-center gap-4"
            variants={linkVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/polityka-prywatnosci"
                className="text-white/80 hover:text-primary transition-colors text-sm"
              >
                Polityka Prywatności
              </Link>
            </motion.div>
          </motion.div>

          {/* Created by */}
          <motion.div 
            className="text-white/60 text-sm flex items-center gap-1"
            variants={linkVariants}
          >
            <motion.a 
              href="https://github.com/PatrykForys" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/80 hover:text-primary transition-colors flex items-center gap-1" 
              aria-label="GitHub Profile"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Stworzone przez <FaGithub size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
} 
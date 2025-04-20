"use client";

import { motion } from "framer-motion";
import { FaMusic } from "react-icons/fa";
import { useEffect, useState } from "react";

function generateNotes(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
  }));
}

export default function FloatingNotes() {
  const [notes, setNotes] = useState<Array<any>>([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let noteCount;

      if (width < 640) {
        noteCount = 5; // znacznie mniej nut na mobile
      } else if (width < 1024) {
        noteCount = 8; // mniej nut na tablet
      } else {
        noteCount = 12; // mniej nut na desktop
      }

      setNotes(generateNotes(noteCount));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {notes.map((note) => (
        <motion.div
          key={note.id}
          initial={{
            x: `${note.x}vw`,
            y: "100vh",
            opacity: 0,
          }}
          animate={{
            y: ["100vh", "-20vh"],
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: 15,
            delay: note.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-primary/20"
        >
          <FaMusic className="w-6 h-6 md:w-8 md:h-8" />
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FaMusic, FaStar, FaUsers, FaHeart } from "react-icons/fa";
import { Glow, GlowArea } from "@/components/glow";

const stats = [
  {
    icon: FaMusic,
    value: 200,
    label: "Przeprowadzonych imprez",
    suffix: "+",
  },
  {
    icon: FaStar,
    value: 100,
    label: "Zadowolonych par młodych",
    suffix: "%",
  },
  {
    icon: FaUsers,
    value: 4000,
    label: "Roztańczonych gości",
    suffix: "+",
  },
  {
    icon: FaHeart,
    value: 10,
    label: "Lat doświadczenia",
    suffix: "+",
  },
];

const features = [
  {
    title: "Profesjonalny sprzęt",
    description: "Najwyższej jakości nagłośnienie i oświetlenie sceniczne",
    glowColor: "teal",
  },
  {
    title: "Elastyczny repertuar",
    description: "Muzyka dopasowana do preferencji i wieku gości",
    glowColor: "#03befc",
  },
  {
    title: "Doświadczenie",
    description: "Wieloletnie doświadczenie w prowadzeniu różnorodnych imprez",
    glowColor: "#03befc",
  },
  {
    title: "Zaangażowanie",
    description: "Pełne oddanie i pasja w tworzeniu niezapomnianych wspomnień",
    glowColor: "teal",
  },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const duration = 2000; // 2 sekundy na animację

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * value));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return (
      <span ref={ref} className="text-4xl font-bold">
        {count}
        {suffix}
      </span>
  );
}

export default function WhyMeSection() {
  return (
    <section
      id="why-me"
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-background/50 to-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-center"
        >
          Dlaczego ja?
        </motion.h2>

        {/* Statystyki */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-4"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        

        {/* Zalety */}
        <GlowArea
          className="grid md:grid-cols-2 gap-8"
          size={{ sm: 200, md: 300, lg: 400, default: 400 }}
          padding={24}
        >
          {features.map((feature, index) => (
            <Glow
              key={feature.title}
              color={feature.glowColor}
              className="rounded-xl h-full"
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="card p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            </Glow>
          ))}
        </GlowArea>
      </div>
    </section>
  );
}

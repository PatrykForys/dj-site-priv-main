"use client";

import { motion } from "framer-motion";
import {
  FaGlassCheers,
  FaBirthdayCake,
  FaHeart,
  FaBuilding,
  FaMusic,
} from "react-icons/fa";
import { PiDiscoBallBold } from "react-icons/pi";
import { Glow, GlowArea } from "@/components/glow";

const services = [
  {
    title: "Wesela",
    icon: FaHeart,
    description: "Profesjonalna oprawa muzyczna Twojego wyjątkowego dnia",
    features: [
      "Spersonalizowana playlista",
      "Profesjonalna organizacja czasu",
      "Prowadzenie zabaw weselnych",
      "Najwyższej jakości sprzęt",
    ],
  },
  {
    title: "18-tki",
    icon: FaGlassCheers,
    description: "Niezapomniana muzyka na Twoje wejście w dorosłość",
    features: [
      "Najnowsze hity",
      "Dynamiczny mix gatunków",
      "Efekty świetlne",
      "Konkursy i zabawy",
    ],
  },
  {
    title: "Urodziny",
    icon: FaBirthdayCake,
    description: "Muzyczna oprawa każdej uroczystości urodzinowej",
    features: [
      "Muzyka dla każdego wieku",
      "Dedykacje muzyczne",
      "Muzyka na życzenie",
      "Zabawy taneczne",
    ],
  },
  {
    title: "Eventy firmowe",
    icon: FaBuilding,
    description: "Profesjonalna obsługa imprez firmowych",
    features: [
      "Muzyka dostosowana do charakteru firmy",
      "Dyskretna obsługa",
      "Przerwy integracyjne",
      "Sprzęt sceniczny",
    ],
  },
  {
    title: "Imprezy okolicznościowe",
    icon: FaMusic,
    description: "Oprawa muzyczna każdego typu wydarzenia",
    features: [
      "Elastyczny repertuar",
      "Profesjonalne nagłośnienie",
      "Oświetlenie sceniczne",
      "Muzyka na życzenie",
    ],
  },
  {
    title: "Imprezy Klubowe",
    icon: PiDiscoBallBold,
    description: "Profesjonalne sety klubowe i niezapomniana atmosfera",
    features: [
      "Muzyka house, techno i EDM",
      "Miksowanie na żywo",
      "Efekty świetlne i lasery",
      "Współpraca z klubami",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-background/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-center mb-10"
        >
          Moje Usługi
        </motion.h2>

        <GlowArea
          className="relative"
          size={{ sm: 200, md: 300, lg: 400, default: 400 }}
          padding={24}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <Glow
                key={service.title}
                color="teal"
                className="rounded-xl h-full"
              >
                <motion.div
                  variants={itemVariants}
                  className="card group p-6 h-full flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <service.icon className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-2 mt-auto">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-400"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Glow>
            ))}
          </motion.div>
        </GlowArea>
      </div>
    </section>
  );
}

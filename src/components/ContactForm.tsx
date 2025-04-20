"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { FaFacebook, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const eventTypes = [
  { id: "wesele", label: "Wesele" },
  { id: "urodziny", label: "Urodziny" },
  { id: "osiemnastka", label: "Osiemnastka" },
  { id: "event_firmowy", label: "Event firmowy" },
  { id: "inne", label: "Inne" },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "success" | "error" | "date-taken" | null
  >(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Sprawdź czy termin jest dostępny
      const checkResponse = await fetch(
        `/api/bookings/check-date?date=${data.eventDate}`
      );
      const { isAvailable } = await checkResponse.json();

      if (!isAvailable) {
        setSubmitStatus("date-taken");
        setIsSubmitting(false);
        return;
      }

      const formattedData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        event_date: data.eventDate,
        event_type: data.eventType,
        message: data.message,
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) throw new Error("Błąd podczas zapisywania rezerwacji");

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-background/50 to-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Informacje kontaktowe */}
          <div className="space-y-8">
            <div>
              <h2 className="section-title mb-4">Kontakt</h2>
              <p className="text-gray-400 mb-8">
                Skontaktuj się ze mną, aby omówić szczegóły Twojego wydarzenia.
                Chętnie odpowiem na wszystkie pytania i pomogę stworzyć
                niezapomnianą atmosferę!
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+48667510190"
                className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FaPhone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Telefon</p>
                  <p className="font-medium">667 510 190</p>
                </div>
              </a>

              <a
                href="https://www.facebook.com/daniel.wojtasik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FaFacebook size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Facebook</p>
                  <p className="font-medium">Daniel Wojtasik</p>
                </div>
              </a>

              {/* Mapa - widoczna tylko na większych ekranach */}
              <div className="hidden md:block mt-8 index">
                <div className="flex items-center gap-3 mb-4 text-white/80 hover:text-primary transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Lokalizacja</p>
                    <p className="font-medium">Syców i okolice</p>
                  </div>
                </div>
                <div className="h-[300px] rounded-lg overflow-hidden border border-white/10">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=17.7102,51.2979,17.7302,51.3179&layer=mapnik&marker=51.307806,17.719750"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Formularz */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 space-y-6 border border-white/10"
            id="contact-form"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-200"
              >
                Imię i nazwisko
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                placeholder="Wprowadź imię i nazwisko"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                placeholder="twoj@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-2 text-gray-200"
              >
                Numer telefonu
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                placeholder="123456789"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="eventDate"
                className="block text-sm font-medium mb-2 text-gray-200"
              >
                Data wydarzenia
              </label>
              <input
                type="date"
                id="eventDate"
                {...register("eventDate")}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
              />
              {errors.eventDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.eventDate.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="eventType"
                className="block text-sm font-medium mb-2 text-gray-200"
              >
                Typ wydarzenia
              </label>
              <select
                id="eventType"
                {...register("eventType")}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400 appearance-none"
              >
                <option value="" className="bg-black">
                  Wybierz typ wydarzenia
                </option>
                {eventTypes.map((type) => (
                  <option key={type.id} value={type.id} className="bg-black">
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.eventType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.eventType.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-gray-200"
              >
                Dodatkowe informacje
              </label>
              <textarea
                id="message"
                {...register("message")}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400 resize-none"
                placeholder="Opisz swoje oczekiwania, preferencje muzyczne, itp."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <p className="text-sm text-gray-400 text-center">
              Wysyłając formularz wyrażasz zgodę na przetwarzanie danych
              osobowych w celu obsługi rezerwacji.{" "}
              <a
                href="/polityka-prywatnosci"
                className="text-primary hover:underline"
                target="_blank"
              >
                Polityka prywatności
              </a>
            </p>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
            </motion.button>

            {submitStatus === "date-taken" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-yellow-500 text-center font-medium space-y-2"
              >
                <p>Przepraszamy, ale wybrany termin jest już zajęty.</p>
                <p className="text-sm">
                  W razie pytań prosimy o kontakt telefoniczny:{" "}
                  <a
                    href="tel:667510190"
                    className="underline hover:text-primary"
                  >
                    667 510 190
                  </a>
                </p>
              </motion.div>
            )}

            {submitStatus === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500 text-center font-medium"
              >
                Dziękuję za wiadomość! Odezwę się najszybciej jak to możliwe.
              </motion.p>
            )}

            {submitStatus === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-center font-medium"
              >
                Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie
                później.
              </motion.p>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

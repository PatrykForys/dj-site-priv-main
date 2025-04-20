"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Polityka Prywatności
          </h1>
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

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            1. Administrator danych osobowych
          </h2>
          <p className="text-gray-300">
            Administratorem Twoich danych osobowych jest Daniel Wojtasik,
            prowadzący działalność jako DJ Daniel Wojtasik. Kontakt: tel. 667
            510 190.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            2. Zakres zbieranych danych
          </h2>
          <p className="text-gray-300">
            Poprzez formularz kontaktowy zbieramy następujące dane:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>Imię i nazwisko</li>
            <li>Adres email</li>
            <li>Numer telefonu</li>
            <li>Data planowanego wydarzenia</li>
            <li>Typ wydarzenia</li>
            <li>Dodatkowe informacje podane w wiadomości</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            3. Cel przetwarzania danych
          </h2>
          <p className="text-gray-300">
            Twoje dane osobowe są przetwarzane w celu:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>Obsługi zapytań i rezerwacji terminów</li>
            <li>Kontaktu w sprawie szczegółów wydarzenia</li>
            <li>Realizacji umowy o świadczenie usług</li>
            <li>Wystawienia dokumentów księgowych</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            4. Podstawa prawna
          </h2>
          <p className="text-gray-300">Dane są przetwarzane na podstawie:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>
              Art. 6 ust. 1 lit. b RODO - przetwarzanie jest niezbędne do
              wykonania umowy
            </li>
            <li>
              Art. 6 ust. 1 lit. c RODO - przetwarzanie jest niezbędne do
              wypełnienia obowiązku prawnego
            </li>
            <li>
              Art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interes
              administratora
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            5. Okres przechowywania danych
          </h2>
          <p className="text-gray-300">Dane będą przechowywane przez okres:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>Do czasu realizacji wydarzenia i rozliczenia usługi</li>
            <li>Przez okres wymagany przepisami prawa podatkowego (5 lat)</li>
            <li>Do czasu przedawnienia roszczeń</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">6. Twoje prawa</h2>
          <p className="text-gray-300">
            W związku z przetwarzaniem danych osobowych przysługują Ci
            następujące prawa:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>Prawo dostępu do swoich danych</li>
            <li>Prawo do sprostowania danych</li>
            <li>Prawo do usunięcia danych</li>
            <li>Prawo do ograniczenia przetwarzania</li>
            <li>Prawo do przenoszenia danych</li>
            <li>Prawo do wniesienia sprzeciwu</li>
            <li>Prawo do wniesienia skargi do organu nadzorczego (UODO)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            7. Bezpieczeństwo danych
          </h2>
          <p className="text-gray-300">
            Twoje dane są chronione poprzez zastosowanie odpowiednich środków
            technicznych i organizacyjnych, zgodnych z obowiązującymi przepisami
            o ochronie danych osobowych. Dane są przechowywane na bezpiecznych
            serwerach Supabase z szyfrowaniem SSL.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            8. Kontakt w sprawie danych osobowych
          </h2>
          <p className="text-gray-300">
            W sprawach związanych z ochroną danych osobowych możesz kontaktować
            się ze mną:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>Telefonicznie: 667 510 190</li>
            <li>Poprzez formularz kontaktowy na stronie</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            9. Zmiany w polityce prywatności
          </h2>
          <p className="text-gray-300">
            Zastrzegam sobie prawo do wprowadzania zmian w polityce prywatności.
            Aktualna wersja będzie zawsze dostępna na tej stronie.
          </p>
        </section>

        <p className="text-sm text-gray-400 mt-12">
          Ostatnia aktualizacja: 24.01.2024
        </p>
      </motion.div>
    </div>
  );
}

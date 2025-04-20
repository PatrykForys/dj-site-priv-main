"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FaTimes,
  FaSortDown,
  FaSortUp,
  FaCog,
  FaTrash,
  FaCalendarAlt,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  event_date: string;
  event_type: string;
  message: string;
  created_at: string;
  is_deleted: boolean;
};

type SortField = "event_date" | "name" | "event_type";
type SortOrder = "asc" | "desc";

const eventTypes = [
  { id: "wesele", label: "Wesele" },
  { id: "urodziny", label: "Urodziny" },
  { id: "osiemnastka", label: "Osiemnastka" },
  { id: "event_firmowy", label: "Event firmowy" },
  { id: "inne", label: "Inne" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const filterButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("event_date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filterType, setFilterType] = useState<string>("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDateChange, setShowDateChange] = useState(false);
  const [newDate, setNewDate] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      if (!response.ok) throw new Error("Błąd pobierania rezerwacji");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  const handleAnalytics = () => {
    router.push("/admin/analytics");
  };

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const handleShowAll = () => {
    setSelectedDate(null);
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getBookingsForDate = (date: Date) => {
    return bookings.filter(
      (booking) =>
        new Date(booking.event_date).toDateString() === date.toDateString()
    );
  };

  const getSortedAndFilteredBookings = () => {
    let filteredBookings = bookings.filter(booking => !booking.is_deleted);

    if (selectedDate) {
      filteredBookings = filteredBookings.filter(
        (booking) =>
          new Date(booking.event_date).toDateString() === selectedDate.toDateString()
      );
    }

    if (filterType) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.event_type === filterType
      );
    }

    return filteredBookings.sort((a, b) => {
      if (sortField === "event_date") {
        const dateA = new Date(a.event_date).getTime();
        const dateB = new Date(b.event_date).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortField === "event_type") {
        return sortOrder === "asc"
          ? a.event_type.localeCompare(b.event_type)
          : b.event_type.localeCompare(a.event_type);
      }
      return 0;
    });
  };

  const tileContent = ({ date }: { date: Date }) => {
    const bookingsForDate = getBookingsForDate(date);
    if (bookingsForDate.length > 0) {
      return (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>
      );
    }
    return null;
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <FaSortUp size={14} className="transition-transform duration-200" />
    ) : (
      <FaSortDown size={14} className="transition-transform duration-200" />
    );
  };

  const handleDeleteBooking = async (bookingId: number) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_deleted: true }),
      });

      if (!response.ok) throw new Error("Błąd oznaczania rezerwacji jako usuniętej");

      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, is_deleted: true }
            : booking
        )
      );
      setShowDeleteConfirm(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error marking booking as deleted:", error);
    }
  };

  const handleBookingDateChange = async (
    bookingId: number,
    newDate: string
  ) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event_date: newDate }),
      });

      if (!response.ok) throw new Error("Błąd aktualizacji daty");

      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, event_date: newDate }
            : booking
        )
      );
      setShowDateChange(false);
      setSelectedBooking(null);
      setNewDate("");
    } catch (error) {
      console.error("Error updating booking date:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel Administratora</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAnalytics}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-200 flex items-center gap-2"
            >
              <FaChartBar className="h-5 w-5" />
              Analityka
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200 flex items-center gap-2"
            >
              <FaSignOutAlt className="h-5 w-5" />
              Wyloguj się
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Kalendarz */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Kalendarz Rezerwacji
              </h2>
              <div className="calendar-container flex justify-center">
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  tileContent={tileContent}
                  className="w-full bg-transparent border-none"
                  selectRange={false}
                />
              </div>
            </div>
          </div>

          {/* Lista rezerwacji */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col h-[600px]">
            <motion.div
              layout
              className="flex justify-between items-center mb-4"
            >
              <motion.h2 layout="position" className="text-xl font-semibold">
                {selectedDate
                  ? `Rezerwacje na ${selectedDate.toLocaleDateString()}`
                  : "Wszystkie rezerwacje"}
              </motion.h2>
              <AnimatePresence>
                {selectedDate && (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onClick={handleShowAll}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 transition-colors rounded-lg"
                  >
                    <FaTimes size={14} />
                    <span>Pokaż wszystkie</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Opcje sortowania i filtrowania */}
            <div className="flex gap-4 mb-4">
              <div className="flex gap-2">
                {["event_date", "name", "event_type"].map((field) => (
                  <motion.button
                    key={field}
                    variants={filterButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleSort(field as SortField)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      sortField === field
                        ? "bg-primary/20 text-primary"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <span>
                      {field === "event_date"
                        ? "Data"
                        : field === "name"
                        ? "Nazwa"
                        : "Typ"}
                    </span>
                    {getSortIcon(field as SortField)}
                  </motion.button>
                ))}
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1.5 text-sm bg-black/50 rounded-lg border border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
              >
                <option value="" className="bg-black">
                  Wszystkie typy
                </option>
                {eventTypes.map((type) => (
                  <option key={type.id} value={type.id} className="bg-black">
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {isLoading ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-4"
              >
                Ładowanie rezerwacji...
              </motion.p>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4 overflow-y-auto flex-1 pr-2"
              >
                <AnimatePresence mode="popLayout">
                  {getSortedAndFilteredBookings().map((booking) => (
                    <motion.div
                      key={booking.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors relative"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">
                            Klient: {booking.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            Email: {booking.email}
                          </p>
                          <p className="text-sm text-gray-400">
                            Tel: {booking.phone}
                          </p>
                        </div>
                        <span className="text-sm text-primary">
                          {new Date(booking.event_date).toLocaleDateString('pl-PL', {
                            day: '2-digit',
                            month: '2-digit', 
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-sm mt-2">
                        <span className="text-gray-400">Typ wydarzenia:</span>{" "}
                        {eventTypes.find(
                          (type) => type.id === booking.event_type
                        )?.label || booking.event_type}
                      </p>
                      <p className="text-sm mt-1 text-gray-300">
                        Opis: {booking.message}
                      </p>

                      {/* Przycisk zarządzania */}
                      <div className="absolute bottom-4 right-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedBooking(booking)}
                          className="text-white hover:text-[rgb(var(--color-primary))] transition-colors"
                        >
                          <FaCog size={20} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <AnimatePresence>
                  {getSortedAndFilteredBookings().length === 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-gray-400 text-center py-4"
                    >
                      Brak rezerwacji{selectedDate ? " na ten dzień" : ""}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal potwierdzenia usunięcia */}
      <AnimatePresence>
        {showDeleteConfirm && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl max-w-md w-full border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">
                Potwierdź usunięcie
              </h3>
              <p className="text-gray-300 mb-6">
                Czy na pewno chcesz ukryć rezerwację dla {selectedBooking.name}{" "}
                na dzień{" "}
                {new Date(selectedBooking.event_date).toLocaleDateString()}?
                Rezerwacja pozostanie w bazie danych, ale nie będzie widoczna w panelu.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Anuluj
                </button>
                <button
                  onClick={() => handleDeleteBooking(selectedBooking.id)}
                  className="px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 transition-colors"
                >
                  Ukryj
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu zarządzania rezerwacją */}
      <AnimatePresence>
        {selectedBooking && !showDeleteConfirm && !showDateChange && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl max-w-md w-full border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">
                Zarządzaj rezerwacją
              </h3>
              <div className="space-y-4">
                <button
                  onClick={() => setShowDateChange(true)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-3"
                >
                  <FaCalendarAlt />
                  Zmień termin
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors flex items-center gap-3"
                >
                  <FaTrash />
                  Usuń rezerwację
                </button>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="mt-4 w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                Anuluj
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal zmiany terminu */}
      <AnimatePresence>
        {showDateChange && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl max-w-md w-full border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4">Zmień termin</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nowy termin
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  />
                </div>
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => {
                      setShowDateChange(false);
                      setNewDate("");
                    }}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={() =>
                      handleBookingDateChange(selectedBooking.id, newDate)
                    }
                    disabled={!newDate}
                    className="px-4 py-2 rounded-lg bg-primary/80 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Zapisz zmiany
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

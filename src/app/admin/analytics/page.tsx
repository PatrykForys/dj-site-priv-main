"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaEye,
  FaChartLine,
  FaMobile,
  FaDesktop,
  FaLink,
  FaList,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";

interface Stats {
  totalBookings: number;
  todayBookings: number;
  weeklyBookings: number;
  monthlyBookings: number;
  todayStats: {
    total_views: number;
    unique_views: number;
  };
  weeklyStats: {
    total_views: number;
    unique_views: number;
  };
  monthlyStats: {
    total_views: number;
    unique_views: number;
  };
  pageStats: Array<{
    page: string;
    total_views: number;
    unique_views: number;
    mobile_views: number;
    desktop_views: number;
    last_visit: string;
  }>;
  deviceStats: Array<{
    device_type: string;
    total_views: number;
    unique_views: number;
  }>;
  referrerStats: Array<{
    source: string;
    count: number;
  }>;
  eventTypes: Array<{
    event_type: string;
    count: number;
  }>;
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/analytics");
        if (!response.ok) throw new Error("Błąd pobierania danych");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Wystąpił błąd");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-end mb-6 mr-11 mt-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <FaArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Panel Analityki</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Statystyki rezerwacji */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FaChartLine className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold">Wszystkie rezerwacje</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalBookings}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <FaCalendarAlt className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">Dzisiejsze rezerwacje</h3>
          </div>
          <p className="text-3xl font-bold">{stats.todayBookings}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <FaCalendarAlt className="h-5 w-5 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold">Rezerwacje (7 dni)</h3>
          </div>
          <p className="text-3xl font-bold">{stats.weeklyBookings}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <FaCalendarAlt className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold">Rezerwacje (30 dni)</h3>
          </div>
          <p className="text-3xl font-bold">{stats.monthlyBookings}</p>
        </motion.div>

        {/* Statystyki odwiedzin */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <FaEye className="h-5 w-5 text-teal-500" />
            </div>
            <h3 className="text-lg font-semibold">Dzisiejsze odwiedziny</h3>
          </div>
          <p className="text-3xl font-bold">{stats.todayStats.total_views}</p>
          <p className="text-sm text-gray-400">
            Unikalne: {stats.todayStats.unique_views}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <FaEye className="h-5 w-5 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold">Odwiedziny (7 dni)</h3>
          </div>
          <p className="text-3xl font-bold">{stats.weeklyStats.total_views}</p>
          <p className="text-sm text-gray-400">
            Unikalne: {stats.weeklyStats.unique_views}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <FaEye className="h-5 w-5 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold">Odwiedziny (30 dni)</h3>
          </div>
          <p className="text-3xl font-bold">{stats.monthlyStats.total_views}</p>
          <p className="text-sm text-gray-400">
            Unikalne: {stats.monthlyStats.unique_views}
          </p>
        </motion.div>
      </div>

      {/* Szczegółowe statystyki */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statystyki stron */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <FaList className="h-5 w-5 text-cyan-500" />
            </div>
            <h3 className="text-xl font-semibold">Statystyki stron</h3>
          </div>
          <div className="space-y-4">
            {stats.pageStats.map((page) => (
              <div key={page.page} className="border-b border-white/10 pb-4">
                <h4 className="font-medium mb-2">
                  {page.page === "/"
                    ? "Strona główna"
                    : page.page === "/galeria"
                    ? "Galeria"
                    : page.page === "/polityka-prywatnosci"
                    ? "Polityka prywatności"
                    : page.page}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">
                      Wszystkie odwiedziny
                    </p>
                    <p className="text-lg font-semibold">{page.total_views}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Unikalne odwiedziny</p>
                    <p className="text-lg font-semibold">{page.unique_views}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMobile className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Mobile</p>
                      <p className="text-lg font-semibold text-center">
                        {page.mobile_views}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaDesktop className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Desktop</p>
                      <p className="text-lg font-semibold text-center">
                        {page.desktop_views}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Ostatnia wizyta: {new Date(page.last_visit).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Statystyki urządzeń i źródeł */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <FaMobile className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold">Urządzenia</h3>
            </div>
            <div className="space-y-4">
              {stats.deviceStats.map((device) => (
                <div
                  key={device.device_type}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    {device.device_type === "mobile" ? (
                      <FaMobile className="text-gray-400" />
                    ) : (
                      <FaDesktop className="text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium">{device.device_type}</p>
                      <p className="text-sm text-gray-400">
                        Unikalne: {device.unique_views}
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{device.total_views}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <FaLink className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold">Źródła ruchu</h3>
            </div>
            <div className="space-y-4">
              {stats.referrerStats.map((referrer) => (
                <div
                  key={referrer.source}
                  className="flex justify-between items-center"
                >
                  <p className="font-medium">{referrer.source}</p>
                  <p className="text-2xl font-bold">{referrer.count}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/20 rounded-lg">
                <FaList className="h-5 w-5 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold">Typy wydarzeń</h3>
            </div>
            <div className="space-y-4">
              {stats.eventTypes.map((type) => (
                <div
                  key={type.event_type}
                  className="flex justify-between items-center"
                >
                  <p className="font-medium">{type.event_type}</p>
                  <p className="text-2xl font-bold">{type.count}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

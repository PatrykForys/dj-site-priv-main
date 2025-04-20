"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Lista śledzonych stron
const TRACKED_PATHS = ['/', '/galeria', '/polityka-prywatnosci'];

function formatDate(date: Date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hasTrackedInitialView = useRef<boolean>(false);
  const lastTrackedPath = useRef<string>('');

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };

  const sendAnalytics = async () => {
    // Sprawdź czy ścieżka powinna być śledzona
    if (!TRACKED_PATHS.includes(pathname)) {
      return;
    }

    // Sprawdź czy ścieżka się zmieniła
    if (lastTrackedPath.current === pathname) {
      return;
    }

    try {
      const analyticsData = {
        page: pathname,
        userAgent: navigator.userAgent,
        deviceType: getDeviceType(),
        referrer: document.referrer,
        timestamp: formatDate(new Date()),
      };

      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(analyticsData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Aktualizuj ostatnio śledzoną ścieżkę
      lastTrackedPath.current = pathname;
    } catch (error) {
      console.error("Błąd podczas wysyłania danych analitycznych:", error);
    }
  };

  useEffect(() => {
    // Wysyłamy analitykę tylko dla śledzonych ścieżek
    if (!TRACKED_PATHS.includes(pathname)) {
      return;
    }

    // Wysyłamy analitykę po małym opóźnieniu
    const timer = setTimeout(() => {
      if (!hasTrackedInitialView.current || lastTrackedPath.current !== pathname) {
        sendAnalytics();
        hasTrackedInitialView.current = true;
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return <>{children}</>;
};

// Dodajemy deklarację dla TypeScript
declare global {
  interface Window {
    isUnloading: boolean;
  }
}

export default AnalyticsProvider;

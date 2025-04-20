import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const inter = Inter({ subsets: ["latin", "latin-ext"] });
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dj-site-dun.vercel.app';

export const metadata: Metadata = {
  title: "DJ Den Weel | Strona Główna",
  description:
    "Profesjonalna oprawa muzyczna wesel, osiemnastek, urodzin i imprez firmowych w Sycowie i okolicach. DJ Den_Weel - 10 lat doświadczenia, nowoczesny sprzęt, niezapomniana zabawa gwarantowana!",
  keywords:
    "DJ DEN WEEL, DJ DENWEEL, DJ DenWeel, DJ Den Weel, Dj DenWeel, Dj Den Weel, DJ Den_Weel, Dj Den_Weel, dj den_weel, dj na wesele Syców, dj na imprezę, oprawa muzyczna, wesele, osiemnastka, impreza firmowa, muzyka na wesele, dj weselny, dolnośląskie, wodzirej, najlepszy dj, profesjonalny dj",
  authors: [{ name: "DJ Den_Weel" }],
  creator: "DJ Den_Weel",
  publisher: "DJ Den_Weel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "DJ Den Weel | Strona Główna",
    description:
      "Profesjonalna oprawa muzyczna wesel, osiemnastek, urodzin i imprez firmowych. 10+ lat doświadczenia, nowoczesny sprzęt, niezapomniana zabawa gwarantowana!",
    url: baseUrl,
    siteName: "DJ Den Weel",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DJ Den Weel - Profesjonalna Oprawa Muzyczna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Den Weel | Strona Główna",
    description: "Profesjonalna oprawa muzyczna wesel i imprez w Sycowie i okolicach. Sprawdź wolne terminy!",
    images: ["/img/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  verification: {
    google: "twój-kod-weryfikacyjny-google",
    yandex: "twój-kod-weryfikacyjny-yandex",
    yahoo: "twój-kod-weryfikacyjny-yahoo",
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'pl-PL': baseUrl,
    },
  },
  category: "music",
  icons: {
    icon: [
      {
        url: "/img/logo.ico",
        sizes: "any",
      },
    ],
    shortcut: ["/img/logo.ico"],
    apple: [
      {
        url: "/img/logo.ico",
        sizes: "180x180",
        type: "image/ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/img/logo.ico" />
        <link rel="shortcut icon" href="/img/logo.ico" />
        <link rel="apple-touch-icon" href="/img/logo.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EntertainmentBusiness",
              "name": "DJ Den_Weel",
              "image": "/img/og-image.jpg",
              "description": "Profesjonalna oprawa muzyczna wesel, osiemnastek, urodzin i imprez firmowych w Sycowie i okolicach.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Syców",
                "addressRegion": "Dolnośląskie",
                "addressCountry": "PL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "51.307806",
                "longitude": "17.719750"
              },
              "url": baseUrl,
              "telephone": "+48667510190",
              "priceRange": "$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ]
              },
              "sameAs": [
                "https://www.facebook.com/profile.php?id=100089967923233",
                "https://www.instagram.com/chokus74",
                "https://www.youtube.com/@djden_weel1833",
                "https://www.tiktok.com/@danielwojtasik3"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased scroll-smooth`}>
        <AnalyticsProvider>
          <Header />
          <main className="pt-12">{children}</main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}

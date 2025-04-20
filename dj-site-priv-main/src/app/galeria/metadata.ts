import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DJ Den Weel | Galeria",
  description: "Zobacz galerię zdjęć i filmów z imprez prowadzonych przez DJ Den Weel. Wesela, osiemnastki, imprezy firmowe i inne wydarzenia w profesjonalnej oprawie muzycznej.",
  keywords: "galeria dj, zdjęcia z wesel, filmy z imprez, DJ DEN WEEL, DJ DENWEEL, DJ DenWeel, DJ Den Weel, Dj DenWeel, Dj Den Weel, DJ Den_Weel, Dj Den_Weel, dj den_weel, oprawa muzyczna zdjęcia, wesele zdjęcia, imprezy firmowe galeria",
  openGraph: {
    title: "DJ Den Weel | Galeria",
    description: "Zobacz galerię zdjęć i filmów z imprez prowadzonych przez DJ Den Weel. Profesjonalna oprawa muzyczna w obiektywie.",
    url: "https://dj-site-dun.vercel.app/galeria",
    type: "website",
    images: [
      {
        url: "/img/gallery-og.jpg",
        width: 1200,
        height: 630,
        alt: "Galeria DJ Den Weel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Den Weel | Galeria",
    description: "Zobacz zdjęcia i filmy z imprez prowadzonych przez DJ Den Weel",
    images: ["/img/gallery-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  alternates: {
    canonical: "https://dj-site-dun.vercel.app/galeria",
  },
}; 
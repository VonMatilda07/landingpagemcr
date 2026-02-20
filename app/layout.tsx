// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({ 
  weight: ["300", "400", "700", "900"], 
  subsets: ["latin"], 
  variable: "--font-merriweather" 
});

export const metadata: Metadata = {
  title: "Mahakam Coffee Roastery | Specialty Coffee Tenggarong",
  description:
    "Menghadirkan profil roasting presisi dari jantung Kalimantan Timur. We roast, you brew.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} ${merriweather.variable} bg-coffee-950 text-coffee-100 antialiased selection:bg-gold-500 selection:text-coffee-950`}>
        {children}
      </body>
    </html>
  );
}
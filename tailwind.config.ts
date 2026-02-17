import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Kalau struktur foldermu gapake 'src', uncomment baris bawah ini:
     "./app/**/*.{js,ts,jsx,tsx,mdx}",
     "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet Coffee Dark Mode
        coffee: {
          950: '#0c0a09', // Background Utama (Sangat Gelap)
          900: '#1c1917', // Background Card/Section
          800: '#292524', // Border/Divider
          700: '#a8a29e', // Muted Text
          100: '#f5f5f4', // Main Text (White-ish)
        },
        // Aksen Emas/Tembaga (Mahakam Gold)
        gold: {
          400: '#fbbf24', 
          500: '#d97706', // Warna Utama Tombol/Highlight
          600: '#b45309', // Hover state
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'], // Body text
        serif: ['var(--font-merriweather)'], // Headings
      },
    },
  },
  plugins: [],
};
export default config;
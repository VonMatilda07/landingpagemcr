// data/products.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  process: string; // Washed, Natural, Honey
  roastLevel: "Light" | "Medium" | "Medium-Dark" | "Dark";
  tastingNotes: string[];
  price: number; // Harga mulai dari
  image: string; // Path ke folder public nanti
  isAvailable: boolean;
}

export const products: Product[] = [
  {
    id: "anggrek-hitam",
    name: "Anggrek Hitam Blend",
    description: "Signature blend kebanggaan Mahakam. Body tebal dengan aroma floral yang mengingatkan pada hutan hujan tropis.",
    process: "Mixed",
    roastLevel: "Medium-Dark",
    tastingNotes: ["Dark Chocolate", "Wild Flower", "Brown Sugar"],
    price: 85000,
    image: "/images/beans-placeholder.jpg", // Nanti ganti foto asli
    isAvailable: true,
  },
  {
    id: "melintang-robust",
    name: "Melintang Robusta",
    description: "Kopi tangguh dari dataran tinggi. Cocok untuk teman lembur coding atau penikmat kopi susu kekinian.",
    process: "Full Washed",
    roastLevel: "Dark",
    tastingNotes: ["Spices", "Nutty", "Bold Cocoa"],
    price: 65000,
    image: "/images/beans-placeholder.jpg",
    isAvailable: true,
  },
  {
    id: "semayang-dampit",
    name: "Semayang (Robusta Dampit)",
    description: "Single origin pilihan dengan kurasi ketat. Rasa clean dengan kafein yang nendang.",
    process: "Natural",
    roastLevel: "Medium",
    tastingNotes: ["Caramel", "Earth", "Tobacco"],
    price: 70000,
    image: "/images/beans-placeholder.jpg",
    isAvailable: true,
  },
  {
    id: "orcaella-special",
    name: "Orcaella Edition",
    description: "Edisi terbatas. Dinamai dari pesut Mahakam, kopi ini menawarkan kompleksitas rasa yang langka.",
    process: "Anaerobic Natural",
    roastLevel: "Light",
    tastingNotes: ["Tropical Fruit", "Winey", "Bright Acidity"],
    price: 120000,
    image: "/images/beans-placeholder.jpg",
    isAvailable: false, // Contoh stok habis
  },
];
// components/ProductCard.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Info } from 'lucide-react';

interface Variant {
  weight: string;
  price: number;
}

// Pastikan interface ini match dengan data dari page.tsx
interface Product {
  id: string;
  name: string;
  slug: string; // <--- WAJIB ADA (URL)
  description: string;
  process: string;
  fullDescription?: string; // Opsional
  roastLevel: string;
  image: string;
  isAvailable: boolean;
  variants: Variant[];
  
  // Update: Tambahkan field opsional ini biar Vercel gak error
  region?: string;
  altitude?: string;
  variety?: string[];
  grade?: string;
  brewingTemp?: string;
  brewingMethods?: string[];
  tastingNotes?: string[];
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  
  // Format Rupiah
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Ambil harga terendah untuk display "Mulai dari"
  const startPrice = product.variants && product.variants.length > 0 
    ? product.variants[0].price 
    : 0;

  // Link WhatsApp Pintas (Tombol Keranjang)
  const waNumber = "6281255671334"; // Ganti dengan nomor WhatsApp yang valid
  const message = `Halo Mahakam Roastery, saya tertarik dengan kopi *${product.name}*. Boleh minta info detail?`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      {/* LINK UTAMA:
        Membungkus seluruh kartu. Kalau diklik lari ke /product/nama-slug 
      */}
      <Link 
        href={`/product/${product.slug}`} 
        className="group relative bg-coffee-950 border border-coffee-800 rounded-xl overflow-hidden hover:border-gold-500/50 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-gold-500/10 block"
      >
        
        {/* --- BAGIAN GAMBAR --- */}
        <div className="relative h-72 md:h-64 p-3 bg-coffee-900/30">
           <div className="relative h-full w-full rounded-lg overflow-hidden border border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] group-hover:border-gold-500/30 transition-all duration-500">
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500 z-10 mix-blend-overlay"></div>
             <img 
               src={product.image} 
               alt={product.name}
               className="w-full h-full object-contain md:object-cover object-top md:object-center transform group-hover:scale-110 transition duration-700 ease-out brightness-90 group-hover:brightness-105"
             />
           </div>
           
           {/* Badge Roast Level */}
           <div className="absolute top-5 left-5 z-20">
             <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-gold-500/90 text-coffee-950 shadow-lg backdrop-blur-sm border border-gold-400/50">
               {product.roastLevel}
             </span>
           </div>
        </div>

        {/* --- BAGIAN KONTEN --- */}
        <div className="p-6 flex flex-col flex-grow bg-coffee-900/50">
          
          {/* Region */}
          <span className="text-[10px] text-gold-500 font-bold uppercase tracking-wider mb-1 block">
             {product.region || 'Indonesia'}
          </span>
          
          {/* Nama Produk */}
          <h3 className="text-xl font-serif font-bold text-coffee-100 mb-1 group-hover:text-gold-400 transition-colors">
            {product.name}
          </h3>
          
          {/* Process */}
          <p className="text-xs text-gray-500 font-bold mb-4 uppercase tracking-widest">
            {product.process} Process
          </p>
          
          {/* Deskripsi Pendek */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
            {product.description}
          </p>
          
          {/* Tombol Lihat Detail (Visual Saja) */}
          <div className="text-gold-400 text-sm font-medium group-hover:text-white transition-colors flex items-center gap-1 mb-6 w-fit">
            <Info size={14} /> Lihat Detail
          </div>
          
          {/* Footer Kartu: Harga & Tombol WA */}
          <div className="flex items-center justify-between pt-4 border-t border-coffee-800 mt-auto">
            <div className="flex flex-col">
               <span className="text-[10px] text-gray-500">Mulai dari</span>
               <span className="text-lg font-bold text-white">
                 {formatRupiah(startPrice)}
               </span>
            </div>
            
            {/* Tombol Keranjang (WA) */}
            <object> 
                <a 
                    href={waLink} 
                    target="_blank" 
                    className="bg-coffee-100 hover:bg-gold-500 text-coffee-950 p-2 rounded-lg transition-colors block cursor-pointer"
                    onClick={(e) => e.stopPropagation()} 
                >
                    <ShoppingBag size={20} />
                </a>
            </object>
          </div>
        </div>

      </Link>
    </motion.div>
  );
}
// components/GallerySection.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { urlForImage } from '@/sanity/lib/image';

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: any;
  description: string;
}

export default function GallerySection({ items }: { items: GalleryItem[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Hitung lebar area geser otomatis
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [items]);

  // Efek Parallax Text (Judul bergerak dikit pas scroll)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={targetRef} className="py-24 bg-coffee-950 overflow-hidden relative border-b border-white/5">
      
      {/* Background Pattern Halus */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

      <div className="container mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
        <motion.div style={{ y }} className="max-w-xl">
          <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
            Behind The Scenes
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
            Transparansi Proses <br /> 
            <span className="text-coffee-700 italic">Dari Hulu ke Hilir.</span>
          </h2>
        </motion.div>

        {/* Petunjuk Geser */}
        <div className="flex items-center gap-2 text-gold-500/50 text-sm font-medium animate-pulse">
           <span>Geser untuk melihat</span>
           <MoveRight size={18} />
        </div>
      </div>

      {/* --- DRAGGABLE CAROUSEL --- */}
      <div className="pl-6 md:pl-12 relative z-10">
        <motion.div 
          ref={carouselRef} 
          className="cursor-grab active:cursor-grabbing overflow-hidden"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            className="flex gap-6 w-max"
          >
            {items.map((item) => (
              <motion.div 
                key={item._id}
                className="relative h-[400px] w-[300px] md:w-[350px] rounded-xl overflow-hidden group border border-white/10 shadow-2xl"
              >
                {/* Gambar */}
                <img 
                  src={urlForImage(item.image).url()} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Gelap */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Text Content (Muncul Pas Hover) */}
                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-2 py-1 bg-gold-500 text-coffee-950 text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                    {item.category || 'Galeri'}
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
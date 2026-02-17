// components/TeamSection.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { urlForImage } from '@/sanity/lib/image';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: any;
  bio?: string;
}

export default function TeamSection({ members }: { members: TeamMember[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Hitung lebar area geser otomatis
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [members]);

  if (!members || members.length === 0) return null;

  return (
    <section className="py-24 border-t border-white/5 bg-coffee-950/50">
      <div className="container mx-auto px-6 md:px-12 mb-12 text-center">
        <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
          The People Behind
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
          Mahakam Squad
        </h2>
      </div>

      {/* --- DRAGGABLE CAROUSEL --- */}
      <div className="pl-6 md:pl-12 overflow-hidden">
        <motion.div 
          ref={carouselRef} 
          className="cursor-grab active:cursor-grabbing"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            className="flex gap-6 w-max pb-10" // pb-10 buat space shadow
          >
            {members.map((member) => (
              <motion.div 
                key={member._id}
                className="relative w-[280px] h-[400px] rounded-2xl overflow-hidden group border border-white/10 bg-coffee-900 shadow-xl"
              >
                {/* Gambar (Black & White -> Color pas hover) */}
                <div className="h-full w-full relative">
                    <img 
                    src={urlForImage(member.image).url()} 
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                    />
                    {/* Overlay Gradient bawah buat teks */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>

                {/* Info Text */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="border-l-2 border-gold-500 pl-3">
                    <h3 className="text-xl font-bold text-white font-serif leading-tight mb-1">
                        {member.name}
                    </h3>
                    <p className="text-gold-500 text-[10px] font-bold uppercase tracking-widest">
                        {member.role}
                    </p>
                  </div>
                  {/* Bio Singkat (Muncul pas hover) */}
                  {member.bio && (
                      <p className="text-gray-400 text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                          "{member.bio}"
                      </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
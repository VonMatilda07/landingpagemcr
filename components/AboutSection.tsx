// components/AboutSection.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, Leaf, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutSection() {
  const features = [
    {
      icon: TrendingUp,
      title: "Profitable Partner",
      desc: "Skema harga HPP yang dirancang agar margin Coffee Shop Anda tetap sehat dan sustainable."
    },
    {
      icon: CheckCircle2,
      title: "Curated Sourcing",
      desc: "Hanya mengambil Specialty Grade dari region terbaik Indonesia & Import global dengan standar kualitas tertinggi."
    },
    {
      icon: Leaf,
      title: "Cultural Storytelling",
      desc: "Setiap produk memiliki narasi kuat. Contoh: Blend 'Melintang' dinamai dari daerah Kutai tapi menggunakan beans Sumatra yang 'melintasi' pulau."
    },
    {
      icon: Users,
      title: "Full Support",
      desc: "Konsultasi menu, kalibrasi mesin, hingga training dasar barista untuk mitra tetap kami."
    }
  ];

  return (
    <section className="relative py-24 bg-coffee-950 overflow-hidden">
      
      {/* Background Halus */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* KIRI: FOTO TUNGGAL (LEBIH RAPI & BESAR) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              {/* Gambar Utama - Pastikan Resolusi Tinggi */}
              <img 
                src="https://images.unsplash.com/photo-1525088553748-01d6e210e00b?q=80&w=1000&auto=format&fit=crop" 
                alt="Roasting Machine Mahakam" 
                className="w-full h-[500px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Gelap Dikit biar Elegan */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

              {/* Badge Experience (Simpel di Pojok) */}
              <div className="absolute bottom-0 right-0 bg-coffee-900/90 backdrop-blur-md border-t border-l border-white/10 p-6 rounded-tl-2xl">
                 <p className="text-gold-500 font-bold text-4xl font-serif mb-1">5+</p>
                 <p className="text-gray-300 text-xs font-bold uppercase tracking-widest">Tahun<br/>Experience</p>
              </div>
            </div>
          </motion.div>

          {/* KANAN: TEXT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-[2px] bg-gold-500"></div>
               <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase">
                 Why Choose Us
               </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Wajah Nusantara, <br/>
              <span className="text-gold-500">Jantung Kutai.</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Mahakam Roastery menerjemahkan karakter beans dari berbagai daerah ke dalam filosofi tanah Kutai. Kami mengurasi specialty-grade beans dari Gayo, Bajawa, dan region premium lainnya, lalu meraciknya dengan narasi budaya Kutai yang autentik. Seperti Blend Melintang yang 'melintasi' pulau Sumatra, setiap produk kami punya cerita kuat yang meningkatkan nilai <strong>brand dan pengalaman pelanggan Anda</strong>.
            </p>

            {/* Grid Keunggulan (List Rapi ke Bawah) */}
            <div className="space-y-6 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className="mt-1 flex-shrink-0 bg-gold-500/10 p-2 rounded-lg text-gold-500 h-fit">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">{feature.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Link Simple */}
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-white font-bold border-b border-gold-500 pb-1 hover:text-gold-500 transition-colors"
            >
              Baca Perjalanan Kami <ArrowRight size={16} />
            </Link>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
// components/Hero.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Crown, BarChart3, Factory, Truck, Award, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-coffee-950">
      
      {/* 1. BACKGROUND DENGAN ANIMASI FADE & SCALE */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="https://cdn.shopify.com/s/files/1/0644/4243/3786/files/FEMO_-blog_1920_x_1080_10.png?v=1753321927"
          alt="Mahakam Roasting Process"
          className="w-full h-full object-cover object-center"
          // ANIMASI DI SINI:
          initial={{ opacity: 0, scale: 1.1 }} // Mulai: Transparan & Agak Zoom
          animate={{ opacity: 0.7, scale: 1 }} // Selesai: Opacity 0.7 & Ukuran Normal
          transition={{ duration: 2, ease: "easeOut" }} // Durasi 2 detik, gerakannya halus
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-950 via-coffee-950/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-coffee-950 to-transparent z-10" />
      </div>

      {/* 2. CONTENT */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 pt-20 pb-40 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }} // Delay dikit biar background muncul duluan
          className="max-w-4xl"
        >
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Crown size={16} className="text-gold-500" />
            <span className="text-gold-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
              Cultural Heritage • Specialty Coffee
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-8 drop-shadow-lg">
            Cita Rasa Nusantara, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              Berjiwa Kutai Kartanegara.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Kami menyangrai Green Bean Specialty terbaik dari penjuru Nusantara & mancanegara, lalu meraciknya dengan narasi budaya Kutai yang autentik. Perpaduan kualitas beans kelas dunia dengan filosofi lokal yang mendalam menciptakan pengalaman kopi yang tak terlupakan.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center items-center">
            
            <Link 
              href="https://wa.me/6281255671334?text=Halo%20Mahakam,%20tertarik%20partnership%20B2B."
              className="group px-8 py-4 bg-gold-500 hover:bg-gold-600 text-coffee-950 rounded-xl transition-all flex items-center justify-between sm:justify-center gap-4 shadow-[0_0_30px_rgba(217,119,6,0.3)] hover:shadow-[0_0_40px_rgba(217,119,6,0.5)] min-w-[240px]"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-coffee-950/20 rounded-lg">
                  <BarChart3 size={20} />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80">
                    Coffee Shop / B2B
                  </span>
                  <span className="block text-sm font-bold">
                    Gabung Mitra
                  </span>
                </div>
              </div>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform opacity-70" />
            </Link>
            
            <a 
              href="#products" 
              className="group px-8 py-4 bg-black/20 border border-white/10 hover:bg-black/40 hover:border-gold-500/30 text-white rounded-xl transition-all flex items-center justify-between sm:justify-center gap-4 backdrop-blur-sm min-w-[240px]"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/10 rounded-lg group-hover:text-gold-400 transition-colors">
                  <ShoppingBag size={20} />
                </div>
                <div className="text-left leading-tight">
                   <span className="block text-[10px] font-bold uppercase tracking-wider opacity-60 text-gray-300">
                     Home Brewer
                   </span>
                   <span className="block text-sm font-bold group-hover:text-gold-400 transition-colors">
                     Beli Satuan
                   </span>
                </div>
              </div>
            </a>

          </div>

        </motion.div>
      </div>

      {/* 3. TRUST BAR (DENGAN ANIMASI STAGGER) */}
      <div className="absolute bottom-0 left-0 w-full z-30">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="bg-coffee-950/60 backdrop-blur-md">
          <div className="container mx-auto px-6 md:px-12 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 text-center">
              
              <TrustItem index={0} icon={Award} title="Curated Sourcing" desc="Nusantara & Global" />
              <TrustItem index={1} icon={ShieldCheck} title="Konsistensi Supply" desc="Roasting by Data" />
              <TrustItem index={2} icon={Factory} title="Cultural Storytelling" desc="Filosofi Kutai Authentic" />
              <TrustItem index={3} icon={Truck} title="Pengiriman Cepat" desc="Seluruh Indonesia" />

            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

// KOMPONEN ITEM (Dengan Animasi)
function TrustItem({ icon: Icon, title, desc, index }: { icon: any, title: string, desc: string, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }} // Muncul gantian satu-satu
      className="flex flex-col items-center gap-3 group"
    >
      <div className="p-3 rounded-full bg-white/5 text-gold-500 border border-white/5 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-gray-200 font-bold text-xs md:text-sm uppercase tracking-wide group-hover:text-gold-400 transition-colors">
          {title}
        </h4>
        <p className="text-gray-500 text-[10px] md:text-xs">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
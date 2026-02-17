// components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation'; // Tambah ini buat deteksi halaman aktif

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Cek kita lagi di halaman mana

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Katalog', href: '/#products' },
    { name: 'Filosofi', href: '/about' }, 
    { name: 'Kemitraan', href: '/#about' }, 
    { name: 'Galeri', href: '/#gallery' }, 
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-coffee-950/90 backdrop-blur-md border-b border-white/5 py-4 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
             <Image
               src="/images/Logo-05.jpg"
               alt="Mahakam Coffee Roastery Logo"
               width={40}
               height={40}
               className="group-hover:scale-110 transition-transform"
             />
             <div className="leading-tight">
              <span className="block text-white font-serif font-bold text-lg tracking-wide group-hover:text-gold-400 transition-colors">MAHAKAM COFFEE ROASTERY</span>
             </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              // Cek apakah link ini sedang aktif?
              const isActive = pathname === link.href;

              return (
                <Link 
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors uppercase tracking-wider ${
                    isActive 
                      ? 'text-gold-500' // Kalau lagi di halaman itu, jadi Emas
                      : 'text-gray-300 hover:text-gold-500' // Kalau enggak, jadi Abu -> Emas (Hover)
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA BUTTON */}
          <div className="hidden md:block">
            <a 
              href="https://wa.me/6281255671334" 
              target="_blank"
              className="px-5 py-2 bg-white/10 border border-white/20 hover:bg-gold-500 hover:border-gold-500 hover:text-coffee-950 text-white rounded-lg transition-all font-bold text-xs uppercase tracking-wider"
            >
              Partner B2B
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-coffee-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-gold-500"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10 my-4" />
              <a 
                href="https://wa.me/6281255671334"
                className="w-full py-4 bg-gold-500 text-coffee-950 font-bold rounded-xl text-lg block"
              >
                Gabung Mitra B2B
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
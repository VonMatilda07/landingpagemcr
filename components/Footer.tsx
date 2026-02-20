// components/Footer.tsx
import { Instagram, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-coffee-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12 mb-12">
        
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-serif font-bold text-coffee-100 mb-4 tracking-wider">
            MAHAKAM <span className="text-gold-500">COFFEE</span><span> ROASTERY</span>
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Specialty Coffee Roaster berbasis di Tenggarong. 
            Menghadirkan profil roasting terbaik untuk pengalaman seduh yang autentik.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/mahakam.coffeeroastery/" className="text-coffee-700 hover:text-gold-500 transition"><Instagram size={20} /></a>
            <a href="https://wa.me/6281255671334" className="text-coffee-700 hover:text-gold-500 transition"><MessageCircle size={20} /></a>
          </div>
        </div>

        {/* Navigasi Cepat */}
        <div>
          <h4 className="text-coffee-100 font-bold mb-6">Menu</h4>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-gold-500 transition">Beranda</a></li>
            <li><a href="#products" className="hover:text-gold-500 transition">Koleksi Beans</a></li>
            <li><a href="#about" className="hover:text-gold-500 transition">Tentang Kami</a></li>
            <li><a href="#" className="hover:text-gold-500 transition">Kontak</a></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="text-coffee-100 font-bold mb-6">Lokasi & Kontak</h4>
          <div className="flex items-start gap-3 text-gray-500 text-sm mb-4">
            <MapPin size={18} className="mt-1 flex-shrink-0 text-gold-500" />
            <p>Tenggarong, Kutai Kartanegara,<br/>Kalimantan Timur, Indonesia.</p>
          </div>
          <div className="space-y-2 text-gray-500 text-sm">
            <p>WA: +62 821-5745-8222</p>
            <p>Email: mahakamcoffeeroastery@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="border-t border-coffee-900 pt-8 text-center">
        <p className="text-coffee-800 text-xs">
          &copy; 2025 Mahakam Coffee Roastery. Built with precision by Jex
        </p>
      </div>
    </footer>
  );
}
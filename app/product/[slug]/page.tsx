import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";
import { ArrowLeft, Thermometer, Mountain, Leaf, Droplets, Award, Scale } from "lucide-react";
import Link from "next/link";

// 1. Definisikan Tipe Props untuk Next.js 15
interface PageProps {
  params: Promise<{ slug: string }>;
}

// 2. Query Data dengan Parameter Slug yang Benar
async function getProduct(slug: string) {
  return client.fetch(groq`*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    fullDescription, 
    region,
    altitude,
    process,
    roastLevel,
    grade,
    tastingNotes,
    variants,
    image,
    brewingTemp
  }`, { slug }); // <--- Pastikan object { slug } ini ada!
}

export default async function ProductDetail({ params }: PageProps) {
  // 3. WAJIB: Await params dulu (Khusus Next.js 15 ke atas)
  const { slug } = await params; 
  
  // Baru panggil data
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-coffee-950 flex flex-col items-center justify-center text-white gap-4">
        <p className="text-xl font-serif">Produk tidak ditemukan atau URL salah.</p>
        <Link href="/" className="text-gold-500 hover:underline">Kembali ke Home</Link>
      </div>
    );
  }

  return (
    <main className="bg-coffee-950 min-h-screen text-coffee-100 font-sans selection:bg-gold-500 selection:text-coffee-950">
      <Navbar />

      <section className="pt-32 pb-20 px-6 md:px-12 container mx-auto">
        {/* Tombol Balik */}
        <Link href="/#products" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold-500 mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
          <ArrowLeft size={18} /> Kembali ke Katalog
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* --- KIRI: FOTO PRODUK --- */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-32"> 
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-white/5 relative group shadow-2xl">
                {product.image && (
                    <img 
                    src={urlForImage(product.image).url()} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                )}
                <div className="absolute top-6 left-6 px-4 py-2 bg-black/90 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                    <span className="text-gold-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                    {product.roastLevel || 'Medium'} Roast
                    </span>
                </div>
                </div>
            </div>
          </div>

          {/* --- KANAN: DATA LENGKAP --- */}
          <div className="w-full lg:w-1/2">
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tastingNotes?.map((note: string, idx: number) => (
                <span key={idx} className="px-4 py-1.5 bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  {note}
                </span>
              ))}
            </div>

            <div className="prose prose-invert prose-lg text-gray-300 mb-10 border-l-4 border-gold-500 pl-6">
              <p className="italic">"{product.description}"</p>
              {product.fullDescription && <p className="text-sm mt-4 text-gray-400 not-italic">{product.fullDescription}</p>}
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-10">
                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-4">Technical Specs</h4>
                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                    <SpecItem icon={Mountain} label="Altitude" value={product.altitude} />
                    <SpecItem icon={Droplets} label="Process" value={product.process} />
                    <SpecItem icon={Award} label="Grade" value={product.grade || "Specialty Grade"} />
                    <SpecItem icon={Thermometer} label="Brew Temp" value={product.brewingTemp || "90°C - 93°C"} />
                </div>
            </div>

            <div className="space-y-4 mb-10">
                <h4 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Pilihan Kemasan (B2B/Retail)</h4>
                {product.variants?.map((variant: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-black/20 hover:border-gold-500/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <Scale className="text-gray-500" size={20} />
                            <span className="text-white font-bold">{variant.weight}</span>
                        </div>
                        <span className="text-gold-500 font-bold text-lg">
                            Rp {variant.price?.toLocaleString('id-ID')}
                        </span>
                    </div>
                ))}
            </div>

            <a 
              href={`https://wa.me/6281234567890?text=Halo%20Mahakam,%20saya%20mau%20pesan%20beans%20*${product.name}*.%20Boleh%20minta%20info?`}
              target="_blank"
              className="block w-full py-4 bg-gold-500 hover:bg-gold-600 text-coffee-950 font-bold text-center rounded-xl transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] text-lg"
            >
              Pesan Sekarang via WhatsApp
            </a>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function SpecItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2.5 bg-coffee-950 rounded-lg text-gold-500 border border-white/5 shadow-inner">
        <Icon size={20} />
      </div>
      <div>
        <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">{label}</span>
        <span className="block text-white font-bold text-sm">{value || "-"}</span>
      </div>
    </div>
  );
}
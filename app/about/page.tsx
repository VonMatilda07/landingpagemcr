// app/about/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection"; // <--- 1. Import Komponen Tim
import { Target, Heart, TrendingUp } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60; 

// Interface Data About (Founder dll)
interface AboutData {
  mainTitle: string;
  quote: string;
  storyTitle: string;
  storyContent: string;
  philosophyTitle: string;
  philosophyContent: string;
  founderName: string;
  founderRole: string;
  founderImage: any;
  principles: {
    title: string;
    description: string;
  }[];
}

// Interface Data Tim
interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: any;
  bio?: string;
}

async function getPageData() {
  // 2. Ambil data ABOUT dan TEAM sekaligus
  const aboutData = await client.fetch(groq`*[_type == "about"][0] {
    mainTitle,
    quote,
    storyTitle,
    storyContent,
    philosophyTitle,
    philosophyContent,
    founderName,
    founderRole,
    founderImage,
    principles
  }`);

  const teamData = await client.fetch(groq`*[_type == "team"] {
    _id,
    name,
    role,
    image,
    bio
  }`);

  return { aboutData, teamData };
}

export default async function AboutPage() {
  const { aboutData, teamData } = await getPageData();

  if (!aboutData) {
    return (
      <div className="min-h-screen bg-coffee-950 flex items-center justify-center text-white">
        <p>Data halaman About belum diisi di Sanity Studio.</p>
      </div>
    );
  }

  const icons = [Target, Heart, TrendingUp];

  return (
    <main className="bg-coffee-950 min-h-screen text-coffee-100 font-sans selection:bg-gold-500 selection:text-coffee-950">
      <Navbar />
      
      {/* HEADER */}
      <section className="pt-40 pb-20 px-6 md:px-12 container mx-auto text-center">
        <span className="text-gold-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
          The Origin Story
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 max-w-4xl mx-auto leading-tight whitespace-pre-line">
          {aboutData.mainTitle}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto italic font-serif">
          "{aboutData.quote}"
        </p>
      </section>

      {/* STORY & FOUNDER */}
      <section className="pb-24 px-6 md:px-12 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* KOLOM KIRI: TEKS */}
          <div className="w-full lg:w-1/2 prose prose-invert prose-lg text-gray-300">
            <h3 className="text-white font-serif text-2xl mb-4">{aboutData.storyTitle}</h3>
            <p className="whitespace-pre-line leading-relaxed">
              {aboutData.storyContent}
            </p>
            
            <h3 className="text-white font-serif text-2xl mb-4 mt-8">{aboutData.philosophyTitle}</h3>
            <p className="whitespace-pre-line leading-relaxed">
              {aboutData.philosophyContent}
            </p>
          </div>

          {/* KOLOM KANAN: FOUNDER & PRINSIP */}
          <div className="w-full lg:w-1/2 space-y-8">
             {/* Foto Pendiri */}
             <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative h-[400px]">
                {aboutData.founderImage ? (
                  <img 
                    src={urlForImage(aboutData.founderImage).url()} 
                    alt={aboutData.founderName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">No Image</div>
                )}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-white font-bold text-xl">{aboutData.founderName}</p>
                  <p className="text-gold-500 text-xs uppercase tracking-widest">{aboutData.founderRole}</p>
                </div>
             </div>

             {/* Prinsip */}
             <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <h4 className="text-gold-500 font-bold uppercase tracking-widest mb-6 text-sm">Prinsip Kami</h4>
                <ul className="space-y-6">
                  {aboutData.principles && aboutData.principles.map((principle: any, index: number) => {
                    const Icon = icons[index % icons.length];
                    return (
                      <li key={index} className="flex gap-4">
                        <Icon className="text-gold-500 flex-shrink-0" />
                        <div>
                          <strong className="text-white block mb-1">{principle.title}</strong>
                          <span className="text-sm text-gray-400 leading-relaxed block">{principle.description}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION TIM BARU (Di Sini) */}
      <TeamSection members={teamData} />

      {/* FOOTER CTA */}
      <section className="py-20 border-t border-white/10 bg-black/20 text-center">
        <h2 className="text-3xl font-serif font-bold text-white mb-6">Siap Menulis Cerita Bersama?</h2>
        <a 
          href="https://wa.me/6281255671334" 
          target="_blank"
          className="inline-block px-8 py-4 bg-gold-500 hover:bg-gold-600 text-coffee-950 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)]"
        >
          Ngobrol Bareng Owner
        </a>
      </section>

      <Footer />
    </main>
  );
}
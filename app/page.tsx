// app/page.tsx
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar"; 
import GallerySection from "@/components/GallerySection"; 
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

// Interface Product
interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  variants: {
    weight: string;
    price: number;
  }[];
  region: string;
  altitude: string;
  variety: string[];
  grade: string;
  brewingTemp: string;
  brewingMethods: string[];
  description: string;
  fullDescription: string;
  process: string;
  roastLevel: string;
  tastingNotes: string[];
  image: any;
  isAvailable: boolean;
}

// Interface Gallery
interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: any;
  description: string;
}

// Query Data
async function getData() {
  const products = await client.fetch(groq`*[_type == "product"] {
    _id,
    name,
    "slug": slug.current,
    variants,
    region,
    altitude,
    variety,
    grade,
    brewingTemp,
    brewingMethods,
    description,
    fullDescription,
    process,
    roastLevel,
    tastingNotes,
    image,
    isAvailable
  }`);

  const gallery = await client.fetch(groq`*[_type == "gallery"] {
    _id,
    title,
    category,
    image,
    description
  }`);

  return { products, gallery };
}

export default async function Home() {
  const { products, gallery } = await getData();

  return (
    <main className="min-h-screen bg-coffee-950 text-coffee-100 font-sans selection:bg-gold-500 selection:text-coffee-950">
      
      <Navbar />
      <Hero />
      
      <section id="gallery">
        <GallerySection items={gallery} />
      </section>

      <section id="products" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-coffee-900 overflow-hidden">
        <div className="text-center mb-16">
          <span className="text-gold-500 text-sm font-bold tracking-[0.2em] uppercase mb-2 block">Our Collection</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Line-up Andalan <br/> <span className="text-coffee-700 italic text-2xl md:text-4xl">Roasting Profile Terbaik</span>
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {products.length > 0 ? (
            products.map((coffee: SanityProduct, index: number) => (
              
              <div key={coffee._id} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center shrink-0">
                <ProductCard 
                  index={index}
                  product={{
                    id: coffee._id,
                    name: coffee.name,
                    slug: coffee.slug,
                    description: coffee.description,
                    fullDescription: coffee.fullDescription,
                    variants: coffee.variants || [],
                    region: coffee.region || 'Indonesia',
                    altitude: coffee.altitude || 'Highland',
                    variety: coffee.variety || [],
                    grade: coffee.grade || '-',
                    brewingTemp: coffee.brewingTemp || '90°C',
                    brewingMethods: coffee.brewingMethods || [],
                    process: coffee.process,
                    roastLevel: coffee.roastLevel as any,
                    tastingNotes: coffee.tastingNotes || [],
                    image: coffee.image ? urlForImage(coffee.image).url() : '/images/placeholder.jpg',
                    isAvailable: coffee.isAvailable
                  }} 
                />
              </div>

            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4 w-full">
              Belum ada produk. Silakan input data di <a href="/studio" className="text-gold-500 underline">Studio Admin</a>.
            </p>
          )}
        </div>
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <Footer />
    </main>
  );
}
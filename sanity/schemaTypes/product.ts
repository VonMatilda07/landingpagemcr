// sanity/schemaTypes/product.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Katalog Kopi',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Produk',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    // --- BARU: SLUG (URL UNIK) ---
    // Wajib ada buat halaman detail produk
    defineField({
      name: 'slug',
      title: 'Slug (URL Unik)',
      type: 'slug',
      options: {
        source: 'name', // Otomatis generate dari nama produk
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    // -----------------------------
    
    // --- VARIAN HARGA ---
    defineField({
      name: 'variants',
      title: 'Varian Kemasan & Harga',
      description: 'Masukkan opsi kemasan dan harganya di sini.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'weight', type: 'string', title: 'Berat (ex: 200gr)' },
            { name: 'price', type: 'number', title: 'Harga (ex: 85000)' }
          ],
          preview: {
            select: {
              title: 'weight',
              subtitle: 'price'
            }
          }
        }
      ]
    }),

    // --- INFO DAERAH & TANAM ---
    defineField({
      name: 'region',
      title: 'Region / Asal Daerah',
      type: 'string',
    }),
    defineField({
      name: 'altitude',
      title: 'Altitude / Ketinggian (mdpl)',
      description: 'Contoh: 1200 - 1500 masl',
      type: 'string',
    }),
    defineField({
      name: 'variety',
      title: 'Varietas Bean',
      type: 'array',
      of: [{type: 'string'}],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'grade',
      title: 'Grade Bean',
      type: 'string', 
      initialValue: 'Specialty Grade',
    }),

    // --- DESKRIPSI ---
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat (Teaser)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Cerita Lengkap (Untuk Halaman Detail)',
      type: 'text', 
      rows: 6,
    }),

    // --- TEKNIS ---
    defineField({
      name: 'process',
      title: 'Proses Pasca Panen',
      type: 'string',
      options: {
        list: [
          {title: 'Full Washed', value: 'Full Washed'},
          {title: 'Natural', value: 'Natural'},
          {title: 'Honey', value: 'Honey'},
          {title: 'Anaerobic', value: 'Anaerobic'},
          {title: 'Wine', value: 'Wine'},
          {title: 'Mixed', value: 'Mixed'},
        ],
      },
    }),
    defineField({
      name: 'roastLevel',
      title: 'Profil Roasting',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'Light'},
          {title: 'Medium', value: 'Medium'},
          {title: 'Medium-Dark', value: 'Medium-Dark'},
          {title: 'Dark', value: 'Dark'},
        ],
      },
    }),
    defineField({
      name: 'brewingTemp',
      title: 'Rekomendasi Suhu (°C)',
      type: 'string',
    }),
    defineField({
      name: 'brewingMethods',
      title: 'Metode Seduh',
      type: 'array',
      of: [{type: 'string'}],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'tastingNotes',
      title: 'Tasting Notes',
      type: 'array',
      of: [{type: 'string'}],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'image',
      title: 'Foto Produk',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'isAvailable',
      title: 'Tampilkan di Web?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
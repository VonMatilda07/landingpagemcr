// sanity/schemaTypes/about.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'Halaman Tentang Kami',
  type: 'document',
  fields: [
    // --- HEADER ---
    defineField({
      name: 'mainTitle',
      title: 'Judul Besar (Header)',
      description: 'Contoh: Dari Tepian Mahakam...',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Quote/Kutipan Pendek',
      description: 'Kalimat puitis di bawah judul',
      type: 'text',
      rows: 2,
    }),

    // --- STORY ---
    defineField({
      name: 'storyTitle',
      title: 'Judul Cerita (Bagian 1)',
      initialValue: 'Awal Mula',
      type: 'string',
    }),
    defineField({
      name: 'storyContent',
      title: 'Isi Cerita (Awal Mula)',
      type: 'text',
      rows: 5,
    }),
    
    defineField({
      name: 'philosophyTitle',
      title: 'Judul Cerita (Bagian 2)',
      initialValue: 'Filosofi Nama',
      type: 'string',
    }),
    defineField({
      name: 'philosophyContent',
      title: 'Isi Cerita (Filosofi)',
      type: 'text',
      rows: 5,
    }),

    // --- FOUNDER ---
    defineField({
      name: 'founderImage',
      title: 'Foto Founder',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'founderName',
      title: 'Nama Founder',
      type: 'string',
    }),
    defineField({
      name: 'founderRole',
      title: 'Jabatan Founder',
      initialValue: 'Head Roaster & Founder',
      type: 'string',
    }),

    // --- PRINSIP (VALUE) ---
    defineField({
      name: 'principles',
      title: 'Prinsip / Nilai Kami (Maks 3)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Judul Prinsip'},
            {name: 'description', type: 'text', title: 'Penjelasan', rows: 2}
          ]
        }
      ]
    }),
  ],
})
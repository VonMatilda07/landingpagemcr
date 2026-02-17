// sanity/schemaTypes/gallery.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Galeri Foto (Slider)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Foto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori (Label Kecil)',
      description: 'Contoh: Production, Cupping, Origin',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Upload Foto',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat (Muncul pas di-hover)',
      type: 'text',
      rows: 2,
    }),
  ],
})
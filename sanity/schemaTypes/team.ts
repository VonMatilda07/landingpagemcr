// sanity/schemaTypes/team.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'team',
  title: 'Tim Mahakam (Staff)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Jabatan / Posisi',
      description: 'Contoh: Senior Barista, Head of QC, Marketing',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto Profil',
      type: 'image',
      options: {
        hotspot: true, // Biar bisa crop titik tengah wajah
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio Singkat (Opsional)',
      description: 'Quote atau deskripsi pendek',
      type: 'text',
      rows: 2,
    }),
  ],
})
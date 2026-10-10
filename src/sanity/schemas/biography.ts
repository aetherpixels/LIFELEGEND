import { defineField, defineType } from 'sanity';

export const biographyType = defineType({
  name: 'biography',
  title: 'Biography',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Portrait',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'era',
      title: 'Era (e.g., 1856 - 1943)',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Pioneers', 'Leaders', 'Innovators', 'Artists', 'Scientists'],
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'A 1-2 sentence hook for the preview card.',
    }),
    defineField({
      name: 'content',
      title: 'Biography Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'quotes',
      title: 'Famous Quotes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});

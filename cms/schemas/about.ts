export default {
  name: 'about',
  title: 'About Page',
  type: 'document',
   groups: [
    {
      name: 'bio',
      title: 'Bio',
    },
    {
      name: 'philosophy',
      title: 'Philosophy',
    },
    {
      name: 'inspiration',
      title: 'Inspiration',
    }
  ],
  fields: [
    {
      name: 'bioimage',
      title: 'Bio Image',
      type: 'image',
      group: 'bio'
    },
    {
      name: 'biocontent',
      title: 'Bio Content',
      type: 'array',
      of: [{type: 'block'}],
      group: 'bio',
      validation: Rule => Rule.required()
    },
    {
      name: 'philosophyimage',
      title: 'Philosophy Image',
      type: 'image',
      group: 'philosophy'
    },
    {
      name: 'philosophycontent',
      title: 'Philosophy Content',
      type: 'array',
      of: [{type: 'block'}],
      group: 'philosophy'
    },
    {
      name: 'inspirationimage',
      title: 'Inspiration Image',
      type: 'image',
      group: 'inspiration'
    },
    {
      name: 'inspirationcontent',
      title: 'Inspiration Content',
      type: 'array',
      of: [{type: 'block'}],
      group: 'inspiration'
    },
  ]
}
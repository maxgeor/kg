export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      description: "The end of this news item's unique link (ex: kghandcrafted/news/this-is-the-slug)",
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 200,
        slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
      }
    },
    {
      name: 'image',
      title: 'Image',
      description: "Images will show up as 4:3 (wide)",
      type: 'image'
    },
    {
      title: 'Content', 
      name: 'content',
      type: 'array', 
      of: [{type: 'block'}],
      validation: Rule => Rule.required()
    }
  ]
}
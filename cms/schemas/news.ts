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
      name: 'image',
      title: 'Image',
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
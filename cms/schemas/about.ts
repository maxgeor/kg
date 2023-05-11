export default {
  name: 'about',
  title: 'About Page Sections',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: "ex: Bio, Philosophy",
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      description: "ex: I'm a knife maker from the mountains of North Carolina...",
      type: 'array',
      of: [{type: 'block'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      description: "Use a square image (you can crop after uploading)",
      type: 'image',
    },
  ]
}
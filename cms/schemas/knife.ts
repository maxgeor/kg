export default {
  name: 'knife',
  title: 'Knife',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'wrap',
      title: 'Wrap',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'sheath',
      title: 'Sheath',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'isFeatured',
      title: 'Featured?',
      type: 'boolean',
    },
    {
      name: 'isSpecialProject',
      title: 'Special Project?',
      type: 'boolean',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      validation: Rule => Rule.required()
    },
    {
      name: 'gallaryImages',
      title: 'Gallary Images',
      type: 'array',
      of: [{ type: 'image' }]
    }
  ]
}
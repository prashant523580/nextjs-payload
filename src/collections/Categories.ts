import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: false,
    },{
      name:"image",
      type:"upload",
      relationTo:"media",
      required: false
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories', // Self-referencing relationship
      required: false, // Allow null for parent categories,
      // maxDepth:2,
      // hasMany: true
    },
    // ...slugField()
    
  ],
  
  hooks: {
    afterRead: [
      async ({ doc, req, query }) => {
        // Find all child categories for this document
        const children = await req.payload.find({
          collection: 'categories',
          where: { parent: { equals: doc.id } },
          depth: 1,
        });

        doc.children = children.docs; // Attach the children to the parent
        return doc;
      },
    ],
  },
}

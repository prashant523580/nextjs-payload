import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { CollectionConfig } from "payload";

export const Package : CollectionConfig = {
    slug: 'packages',
    access: {
      create: authenticated,
      delete: authenticated,
      read: anyone,
      update: authenticated,
    },
    // admin: {
    //   useAsTitle: 'title',
    // },
    fields: [
      {
        name: 'title',
        type: 'select',
        options:["Basic Package","Standard Package","Premium Package"],
        required: true,
      },
      {
        name: 'description',
        type: 'textarea',
      },
      {
        name: 'price',
        type: 'number',
        required: true,
      },
      {
        name: 'features',
        type: 'array',
        fields: [{ name: 'feature', type: 'text' }],
      },
      {
        name: 'category',
        type: 'relationship',
        relationTo: 'categories',
        required: true,
      },
    ],
  };
  
;
  
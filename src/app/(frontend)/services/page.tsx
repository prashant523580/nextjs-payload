
import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { getCategoryWithChild } from '@/utilities/categories'
// import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600
async function page() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    // draft: true,
    depth: 2,

    limit: 12,
    overrideAccess: false,
    where: {
      parent: {
        exists: false
      }
    }

  })
  const categoryWithChild = getCategoryWithChild(categories.docs)
  // console.log(categoryWithChild )
  console.log(categories.docs)
  return (
    <div className="container mx-auto py-8 lg:py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-12 transition-transform duration-500 transform hover:scale-105">
        Our Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          categories.docs.map((cate, ind) => (

            <Link href={`/services/${cate.id}`} key={ind} className="service-card bg-white rounded-lg shadow-lg p-6 text-center">
              <div className=" mb-4 transition-transform duration-300 transform hover:scale-110">
                {/* 🌐 {JSON.stringify(cate?.parent?.valueOf().id)} */}
              </div>
              <h3 className="text-2xl font-semibold mb-2 transition-colors duration-300 hover:text-blue-500">
                {cate.title}
              </h3>
              <div className="">

              {
                // cate.children.map((child,indNum) =>(
                //   <div className="" key={indNum}>
                //     {child.title}
                //   </div>
                // ))
              }
              </div>
              {/* <p className="text-gray-600">{cate.description}</p> */}
            </Link>
          ))
        }

      </div>

    </div>
  )
}



// const Categories = ({ categories }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {categories.map((category) => (
//         <div key={category.id} className="p-4 border rounded shadow hover:shadow-lg">
//           <h2 className="text-xl font-bold">{category.title}</h2>
//           {/* <p className="text-gray-600">{category.description}</p> */}
//         </div>
//       ))}
//     </div>
//   );
// };


export default page
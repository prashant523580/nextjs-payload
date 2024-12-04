import { getPayload } from 'payload';
import configPromise from '@payload-config'

import React from 'react'
import Link from 'next/link';
// import { PayloadRedirects } from '@/components/PayloadRedirects';
type Args = {
  params: Promise<{
    slug?: string
  }>
}
interface ParamsType {
  params: Promise<{
    id?: string
  }>

}
async function page({ params }: ParamsType) {
  const { id } = await params;
  const payload = await getPayload({ config: configPromise })

  const category = await payload.find({
    collection: "categories",
    where: {
      id: {
        equals: id

      },

    },
  })
  // if (!category) return <PayloadRedirects url={"/"} />

  const packages = await payload.find({
    collection: "packages",
    where: {
      category: {
        exists: true,
        equals: id
      },

    },
    sort: "createdAt"
    // sort: ["priority", "-createdAt"]

  })
  // console.log(childCategory)

  return (
    <div className=''>

      {/* Page #{JSON.stringify(childCategory.docs)} */}
   

      <div>
        <div className="font-[sans-serif] bg-gray-100 px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center">
              <h2 className="text-gray-800 text-3xl font-bold mb-4">Pricing Plans</h2>
              <p className="text-sm text-gray-800">Change your plant according your needs</p>
            </div>

            {/* <div className="flex mx-auto mt-12 bg-white rounded-full w-max">
              <button className="text-white font-semibold tracking-wide w-full text-sm bg-orange-500 py-2.5 px-5 rounded-full">
                Monthly</button>
              <button
                className="text-gray-800 font-semibold tracking-wide w-full text-sm py-2.5 px-4 rounded-full">
                Yearly</button>
            </div> */}

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-8 max-md:max-w-sm max-md:mx-auto">
              {
                packages.docs.map((pack : any,ind) => (

              <div key={ind} className="bg-white hover:outline outline-orange-500 rounded-md relative overflow-hidden transition-all">
                <div className="p-6 pb-20">
                  <div className="text-left">
                    <h4 className="text-gray-800 text-xl mb-4 font-semibold">{pack.title}</h4>
                    <h3 className="text-gray-800 text-4xl font-semibold">Rs.{pack.price}</h3>
                    <p className="text-gray-600 text-sm mt-4">{pack.description}</p>
                  </div>

                  <div className="mt-8">
                    <ul className="space-y-4">
                      {
                        pack.features.map((feature,ind) => (
                      <li key={ind} className="text-gray-600 flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-orange-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                          <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                        </svg>
                            {feature.feature}
                          </li>

                        ))
                      }
                  
                    </ul>
                  </div>
                </div>
               <Link href={`/pages/contact?pkg=${pack.title}&category=${category.docs[0].title}`} className="w-full absolute bottom-0 px-6 py-3 text-sm font-semibold tracking-wide text-white bg-orange-500">Get started today</Link>
              </div>
                ))
              }

              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// const Packages = ({ packages }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {packages.map((pkg) => (
//         <div key={pkg.id} className="p-4 border rounded shadow hover:shadow-lg">
//           <h3 className="text-lg font-semibold">{pkg.name}</h3>
//           <p className="text-gray-500">{pkg.description}</p>
//           <div className="mt-2">
//             <ul className="list-disc list-inside">
//               {pkg.features.map((feature, index) => (
//                 <li key={index} className="text-sm">{feature}</li>
//               ))}
//             </ul>
//           </div>
//           <p className="mt-4 text-lg font-bold text-green-600">${pkg.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };




export default page
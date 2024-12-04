import { Languages, Music, PencilRuler, SquareCode, SwatchBook, Video } from 'lucide-react'
import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

async function Category() {
    const payload = await getPayload({ config: configPromise })

    const categories = await payload.find({
      collection: 'categories',
      // draft: true,
      depth: 2,
     
      limit: 12,
      overrideAccess: false,
    where:{
      parent:{
        exists:  false
      }
    }
      
    })
    const category = [
        {
            title: "Graphichs & Design",
            icon: <SwatchBook size={30} />
        },
        {
            title: "Digital Marketing",
            icon: <PencilRuler size={30} />
        },
        {
            title: "Writing & Translation",
            icon: <Languages size={30} />
        },
        {
            title: "Video & Animation",
            icon: <Video size={30} />
        },
        {
            title: "Programming & Tech",
            icon: <SquareCode size={30} />
        },
        {
            title: "Music & Audio",
            icon: <Music size={30} />
        }
    ]

    return (
        <div className="bg-white p-4 font-sans">
            <div className="max-w-5xl max-lg:max-w-3xl max-md:max-w-md mx-auto">
                {/* <h2 className="text-3xl font-extrabold text-gray-800">LATEST BLOGS</h2> */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-8 justify-center items-center">
                    {
                        categories.docs.map((cate, ind) => (

                            <Link href={`/services/${cate.id}`} key={ind} className="group border shadow hover:shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:bg-gradient-to-t from-white via-gray-200 to-white transition-all cursor-pointer rounded-md overflow-hidden flex justify-center items-center flex-col group text-center h-40 md:h-60 ">
                                <div className="relative overflow-hidden w-full  flex justify-center items-center text-[#007bff] ">
                                    {/* {cate.icon} */}
                                    
                                    {/* <div className="px-4 py-2.5 text-white text-sm tracking-wider bg-pink-500 absolute bottom-0 right-0">August 16, 2023</div> */}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl group-hover:text-black font-bold text-gray-800">{cate.title}</h3>
                                    {/* <button type="button" className="px-4 py-2 mt-6 rounded-md text-white text-sm tracking-wider border-none outline-none bg-pink-500 hover:bg-pink-600">Read More</button> */}
                                </div>
                            </Link>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Category
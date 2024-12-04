"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HorizontalScroll from './HorizontalScroll';

function PopulerSection() {
  const  scrollXRef = React.useRef<null | HTMLDivElement>(null);

  const populers = [
    {
      title: "Web Development",
      image: "/images/web-development.avif"
    },
    {
      title: "Logo Design",
      image: "/images/graphic.png"
    },
    {
      title: "SEO",
      image: "/images/seo.png"
    },
    // {
    //   title: "Architecture & Interior Design",
    //   image: "/images/interior-design.jpg"
    // },
    {
      title: "Social Media Marketing",
      image: "/images/social-media-marketing.jpg"
    },
    // {
    //   title: "Voice Over",
    //   image: "/images/voice-over.avif"
    // },
    {
      title: "Product Photography",
      image: "/images/graphic.png"
    },
    {
      title: "Ecommerce Marketing",
      image: "/images/graphic.png"
    },
    {
      title: "Video Editing",
      image: "/images/graphic.png"
    }
  ]
  return (
    <div className="bg-white font-sans">
      <div className="max-w-6xl mx-auto p-4">
        <div className=" py-2 lg:py-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 ">Populer Services</h2>
        </div>
        <HorizontalScroll
        
          className='overflow-x-scroll  whitespace-nowrap space-x-3 no-scrollbar p-2 lg:p-4'
        //    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-lg:max-w-3xl max-md:max-w-md mx-auto"
        >
          {
            populers.map((popular, ind) => (
              <Link key={ind} href="#" className="group relative inline-block  w-56  items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
              {/* <img src={popular.image} loading="lazy" alt="Photo by Fakurian Design" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" /> */}
              <Image width={100} height={100} title={popular.title} src={popular.image} alt={popular.title} className="mx-auto object-cover rounded-md" />
              {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div> */}
      
              <div className="relative flex justify-center items-center pt-2">
              <h3 style={{
                textWrap:"wrap"
              }} className=" font-bold   text-gray-800 lext-center line-clamp-1">{popular.title}</h3>
                {/* <span className="text-gray-800">Home</span> */}
                {/* <span className=" text-lg font-semibold text-white lg:text-xl">{popular.title}</span> */}
              </div>
            </Link>
              // <div key={ind} className="bg-white cursor-pointer rounded-lg   shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative group w-48   inline-block ">
              //   <Image width={200} height={200} title={popular.title} src={popular.image} alt={popular.title} className="w-full object-cover rounded-md" />
              //   <div className="p-4  bottom-0 left-0 right-0  opacity-90">
              //     {/* <span className="text-sm block text-gray-800 mb-2">10 FEB 2023 | BY JOHN DOE</span> */}
              //     <h3 className=" font-bold  text-gray-800 line-clamp-1">{popular.title}</h3>
              //     {/* <div className="h-0 overflow-hidden group-hover:h-16 group-hover:mt-4 transition-all duration-300">
              //       <p className="text-gray-800 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
              //     </div> */}
              //   </div>
              // </div>
            ))
          }
        </HorizontalScroll>
      </div>
    </div>
  )
}

export default PopulerSection
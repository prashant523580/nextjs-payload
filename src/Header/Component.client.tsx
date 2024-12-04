'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Menu, X } from 'lucide-react'
import ActiveLink from './Nav/ActiveLink'
interface ILinks {
  label: string,
  path: string,
  icon?: null | unknown,
  accessKey?: string,
  children?: ILinks[]
}
interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])
  const [open, setOpen] = React.useState<boolean>(false);
  const links: ILinks[] = [
    {
      label: "Home",
      path: "/",
      accessKey: "h"
    },
    {
      label: "Services",
      path: "/services",
      accessKey: "s"
    },
    {
      label: "About",
      path: "/pages/about",
      accessKey: "a"
    },
    {
      label: "Contact",
      path: "/pages/contact",
      accessKey: "c"
    },
  ]
  return (
    <header className="container sticky top-0 shadow-md bg-white font-[sans-serif] tracking-wide  z-50   " {...(theme ? { 'data-theme': theme } : {})}>
      <section
        className='flex items-center flex-wrap lg:justify-center gap-4 py-3 sm:px-10 px-4 border-gray-200 border-b min-h-[75px]'>

        <div className='left-10 absolute z-40 bg-gray-100 flex px-4 py-3 rounded '>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="20px"
            className="cursor-pointer fill-gray-400 mr-6 rotate-90 inline-block">
            <path
              d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
          </svg>
          <input type='text' placeholder='Search...' className="outline-none bg-transparent w-full text-sm" />
        </div>

        <Link href="javascript:void(0)" className="shrink-0 max-lg:hidden">
        <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>

        <div className="lg:absolute lg:right-10 flex items-center justify-between ml-auto space-x-8">
          <IconWithBadge icon="heart" count={1} />
          <IconWithBadge icon="cart" count={4} />
          {/* <IconWithBadge icon="user" /> */}

          <div className="inline-block cursor-pointer border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"
              className="hover:fill-[#007bff]">
              <circle cx="10" cy="7" r="6" data-original="#000000" />
              <path
                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                data-original="#000000" />
            </svg>
          </div>
        </div>
      </section>
      <div className="py-6 border-b border-border flex justify-between md:justify-center">
        <Link href="/" className='lg:hidden block'>
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <div className='flex flex-wrap justify-center   relative'>

          <div id="collapseMenu"
            // className={`max-lg:hidden ${open? "lg:!block" : "lg:!block"} max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50`}
            className={`lg:flex items-center lg:space-x-10 fixed lg:static ${open ? "translate-x-0 " : "-translate-x-full"
              } bg-white bg-transparent lg:bg-transparent w-full lg:w-auto p-4 lg:p-0 top-0 left-0 min-h-screen lg:min-h-0 z-40 transition-all lg:translate-x-0`}
          >
            <button id="toggleClose" onClick={() => setOpen(!open)} className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3'>
              <X />
            </button>
            <HeaderNav onClick={() => setOpen(false)} header={header} />

          </div>

          <div id="toggleOpen" className='flex ml-auto lg:hidden'>
            <button
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>
      {/* <div className="py-8 border-b border-border flex justify-between">
      
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <HeaderNav header={header} />
      </div> */}
    </header>
  )
}

const IconWithBadge = ({
  icon,
  count,
}: {
  icon: "heart" | "cart" | "user"; // Explicitly define the allowed keys
  count?: number;
}) => {
  const icons = {
    heart: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20px"
        className="cursor-pointer fill-[#333] hover:fill-[#007bff] inline-block" viewBox="0 0 64 64">
        <path
          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
          data-original="#000000" />
      </svg>
    ),
    cart: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
        className="cursor-pointer fill-[#333] hover:fill-[#007bff] inline-block" viewBox="0 0 512 512">
        <path
          d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
          data-original="#000000"></path>
      </svg>
    ),
    user: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className='inline-block'

      >
        <circle cx="10" cy="7" r="6" />
        <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5z" />
      </svg>
    ),
  };

  return (
    <div className="relative cursor-pointer">
      {icons[icon]}
      {count && (
        <span className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 text-xs text-white">
          {count}
        </span>
      )}
    </div>
  );
};

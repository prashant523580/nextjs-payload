'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ header: HeaderType , onClick?: () => void }> = ({ header ,onClick }) => {
  const navItems = header?.navItems || []

  return (
    <ul className="lg:flex  lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
      {navItems.map(({ link }, i) => {
        return<li key={i}><CMSLink onClick={onClick} key={i} {...link} appearance="link" /></li> 
      })}
      {/* <Link href="/search">
      
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </ul>
  )
}

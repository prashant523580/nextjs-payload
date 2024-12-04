
"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IActivelinks {
    children?: React.ReactNode,
    href: string,
    label: string,
    className?: string,
    onClick?: () => void,
    accessKey?: string | undefined 
}
function ActiveLink({ children, accessKey,href, label, className, onClick }: IActivelinks) {
    const pathname = usePathname();

    // const handleClick = (e: any) => {
    //     e.preventDefault()
    //     //   router.push(href)
    // }
    // console.log(pathname === href)
    return (
        <Link  accessKey={accessKey} role='link'   href={href} onClick={onClick} aria-label={label} className={`${pathname === href ? " text-[#007bff] " : " text-gray-600 "} md:my-0   hover:text-[#007bff]  font-semibold text-[15px] block' `}>
            {/* {label} */}
            {children}
        </Link>
    )
}
export default ActiveLink
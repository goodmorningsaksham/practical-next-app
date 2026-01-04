"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const navLink = (path : string) => {
        const isActive = pathname === path;

        return `relative font-medium text-2xl cursor-pointer transition-colors duration-300
         ${isActive ? "text-yellow-400" : "text-white hover:text-gray-400"}
         group `
    }

    const underline = (path : string) => {

        const isActive = pathname === path;

        return `absolute h-[2px] w-full bg-yellow-400 left-0 bottom-1 origin-center scale-x-0 transform transition-transform
                ${isActive ? "scale-x-100" : "group-hover:scale-x-100"}  
        `
    }

    const routes = ['/','/about','/contact'];

    return(
        <nav className="w-full bg-black text-white flex justify-between items-center px-10 py-6">
            <Link href="/" className="font-medium text-2xl cursor-pointer">Logo</Link>
            <div className="flex gap-10">
                {routes.map((path) => (
                    <Link key={path} href={path} className={navLink(path)}>
                        {path === '/' ? 'HOME' : path.replace("/","").toUpperCase()}
                        <span className={underline(path)}/>
                    </Link>
                ))}               
            </div>
            <Link href="/login" className="font-medium text-2xl cursor-pointer">Login</Link>
        </nav>
    )
}
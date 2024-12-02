'use client'
import { MouseEvent, useState } from "react";
import { useMotionValueEvent, useScroll} from "framer-motion";
import type { NavLinks } from "./types";
import Link from "next/link";

const navLinks : NavLinks[] = [
    { url : "/", title : "Home", target: '' },
    { url : "/", title : "About", target: 'aboutSection' },
    { url : "/", title : "Projects", target: 'workSection' },
    { url : "/", title : "CV", target: 'profileSection' }
]

export default function NavigationComponent() {
    const { scrollY } = useScroll();
    const [navActive, setNavActive] = useState<boolean>(false);

    useMotionValueEvent(scrollY, "change", (current) => {
            setNavActive(current > 2 ? true : false);
    })

    const handleNavClick = (event : MouseEvent, target : string) : void => {
        event.preventDefault();
        const targetSection: HTMLElement | null = document.getElementById(target);
        window.scrollTo({
            top: targetSection!.offsetTop - 150,
            behavior: 'smooth'
        });
    }

    return (
        <div className={`mainNav fixed top-0 inset-x-0 z-40 p-10 transition-all ${navActive ? 'backdrop-blur-md py-5' : null}`}>
            <div className="flex items-center justify-between">
                <div className="mainLogo transition-all duration-500 hover:scale-120">
                    <p className="block"><a href="/" className="font-black text-white text-xl uppercase">Tyron Hayman</a></p>
                    <p className="text-md text-white/50 font-normal block flex items-center">
                        Turning Code Into Pixels
                    </p>
                </div>
                <div className="mainNavIcons hidden md:block">
                    <ul className="flex items-center gap-5">
                    {navLinks.map((item : NavLinks, index : number) => {
                        const linkClass = `text-white rounded-full text-lg px-5 py-2`;
                        return(
                            <li key={`navItem${index}`}><Link href={item.url} className={linkClass} onClick={(event) => handleNavClick(event, item.target)}>{item.title}</Link></li>
                        )
                    })}
                    <li><Link href="mailto:mr.tyronhayman@gmail.com" className="transition duration-500 text-black rounded-full text-lg px-5 py-2 bg-white hover:bg-black hover:text-white">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
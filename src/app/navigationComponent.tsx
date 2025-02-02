'use client'
import { MouseEvent, useState, useContext } from "react";
import { useMotionValueEvent, useScroll} from "framer-motion";
import type { NavLinks } from "./types";
import Link from "next/link";
import PageDataContext from "@/lib/getPageData"

const navLinks : NavLinks[] = [
    { url : "/", title : "About", target: 'aboutSection' },
    { url : "/", title : "Projects", target: 'workSection' },
]

export default function NavigationComponent() {
    const { scrollY } = useScroll();
    const [navActive, setNavActive] = useState<boolean>(false);
    const pageData = useContext(PageDataContext);

    useMotionValueEvent(scrollY, "change", (current) => {
            setNavActive(current > 2 ? true : false);
    })

    const handleHover = () => {
        pageData.setCursorState("links")
    }

    const handleHoverLeave = () => {
        pageData.setCursorState("")
    }

    const handleHoverContact = () => {
        pageData.setCursorState("email")
    }

    const handleHoverLeaveContact = () => {
        pageData.setCursorState("")
    }


    const handleNavClick = (event : MouseEvent, target : string) : void => {
        event.preventDefault();
        const targetSection: HTMLElement | null = document.getElementById(target);
        window.scrollTo({
            top: targetSection!.offsetTop - 150,
            behavior: 'smooth'
        });
    }

    return (
        <div className={`mainNav absolute md:fixed top-0 inset-x-0 z-40 p-4 xl:p-10 transition-all backdrop-blur-md`}>
            <div className="flex items-center justify-between">
                <div className="mainLogo transition-all duration-500 hover:scale-120 w-1/3">
                    <p className="text-lg text-white font-bold uppercase block flex items-center">
                        Frontend Developer
                    </p>
                </div>
                <div className="md:w-1/3 text-center">
                    <a href="" className="text-4xl text-white cormorant uppercase font-bold">T.</a>
                </div>
                <div className="mainNavIcons w-1/3 hidden md:block">
                    <ul className="flex items-center gap-5 justify-end">
                    {navLinks.map((item : NavLinks, index : number) => {
                        const linkClass = `text-white font-bold rounded-full text-lg px-5 py-2`;
                        return(
                            <li key={`navItem${index}`}><Link href={item.url} className={linkClass} onClick={(event) => handleNavClick(event, item.target)} onMouseOver={handleHover} onMouseLeave={handleHoverLeave}>{item.title}</Link></li>
                        )
                    })}
                    {pageData.pageData ?
                        <li><Link href={`mailto:${pageData.pageData.pages.nodes[0].homepage.footerEmail}`} className="transition font-bold duration-500 text-white rounded-full text-lg px-5 py-2 bg-black hover:bg-white hover:text-black" onMouseOver={handleHoverContact} onMouseLeave={handleHoverLeaveContact}>Contact</Link></li>
                    : null}
                    </ul>
                </div>
            </div>
        </div>
    );
}
'use client'
import {IconDefinition, IconProp} from "@fortawesome/fontawesome-svg-core";
import { MouseEvent, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faDribbble } from '@fortawesome/free-brands-svg-icons';
import {easeOut, motion, useMotionValueEvent, useScroll} from "framer-motion";
import type { SocialLinks, SocialIcons, NavLinks } from "./types";
import Link from "next/link";

const socials : SocialLinks[] = [
    { url : "https://linkedin.com/in/tyronhayman", icon : faLinkedin },
    { url : "https://github.com/tyron-hayman", icon : faGithub },
    { url : "https://dribbble.com/tyhayman", icon : faDribbble }
];

const navLinks : NavLinks[] = [
    { url : "/", title : "Home", target: '' },
    { url : "/", title : "About", target: 'aboutSection' },
    { url : "/", title : "Projects", target: 'workSection' },
    { url : "/", title : "CV", target: 'profileSection' }
]

export default function NavigationComponent() {
    const { scrollY } = useScroll()
    const [scrollDirection, setScrollDirection] = useState("down")
    const [navActive, setNavActive] = useState<boolean>(false);

    useMotionValueEvent(scrollY, "change", (current) => {
        setNavActive(current > 2 ? true : false)
    })

    const handleNavClick = (event : MouseEvent, target : string) : void => {
        event.preventDefault();
        let targetSection: any = document.getElementById(target);
        window.scrollTo({
            top: targetSection?.offsetTop - 150,
            behavior: 'smooth'
        });
        console.log(targetSection)
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
                <div className="mainNavIcons">
                    <ul className="flex items-center gap-5">
                    {navLinks.map((item : NavLinks, index : number) => {
                        let linkClass = `text-white rounded-full text-lg px-5 py-2`;
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

const SocialIcons = ({ url, icon, delay } : SocialIcons )  => {
    return(
        <motion.li
            initial={{ y: "-50px", opacity : 0 }}
            animate={{ y: "0px", opacity: 1 }}
            transition={{ duration: 0.5, ease : easeOut, delay: 0.25 * delay }}
            className="text-white text-2xl hover:text-indigo-500"><a href={url} target="_blank"
        ><FontAwesomeIcon icon={icon} /></a></motion.li>
    )
}
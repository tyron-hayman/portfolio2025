'use client'
import {IconDefinition, IconProp} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faDribbble } from '@fortawesome/free-brands-svg-icons';
import {easeOut, motion} from "framer-motion";
import type { SocialLinks, SocialIcons, NavLinks } from "./types";
import Link from "next/link";

const socials : SocialLinks[] = [
    { url : "https://linkedin.com/in/tyronhayman", icon : faLinkedin },
    { url : "https://github.com/tyron-hayman", icon : faGithub },
    { url : "https://dribbble.com/tyhayman", icon : faDribbble }
];

const navLinks : NavLinks[] = [
    { url : "/", title : "Home" },
    { url : "/", title : "About" },
    { url : "/", title : "Projects" }
]

export default function NavigationComponent() {
    return (
        <div className="mainNav absolute top-0 inset-x-0 z-40 p-10">
            <div className="flex items-center justify-between">
                <div className="mainLogo">
                    <p className="block"><a href="/" className="font-black text-white text-xl uppercase">Tyron Hayman</a></p>
                    <p className="text-md text-white/50 font-normal block flex items-center">
                        Turning Code Into Pixels
                    </p>
                </div>
                <div className="mainNavIcons">
                    <ul className="flex items-center gap-5">
                    {navLinks.map((item : NavLinks, index : number) => {
                        const linkClass = `text-white rounded-full border-white border border-solid text-lg px-5 py-2`;
                        return(
                            <li><Link href={item.url} className={linkClass}>{item.title}</Link></li>
                        )
                    })}
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
'use client'
import {IconDefinition, IconProp} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faDribbble } from '@fortawesome/free-brands-svg-icons';
import {easeOut, motion} from "framer-motion";
import Image from 'next/image';

const socials : { url : string, icon : IconDefinition }[] = [
    { url : "https://linkedin.com/in/tyronhayman", icon : faLinkedin },
    { url : "https://github.com/tyron-hayman", icon : faGithub },
    { url : "https://dribbble.com/tyhayman", icon : faDribbble }
];

export default function NavigationComponent() {
    return (
        <div className="mainNav absolute top-0 inset-x-0 z-40 p-10">
            <div className="flex items-center justify-between">
                <div className="mainLogo flex items-center justify-center">
                    <Image
                    src="/assets/logo.png"
                    width={150}
                    height={75}
                    alt="A Dear"
                    className='block mx-auto mb-5'
                    style={{
                        width : "150px",
                        height: "auto"
                    }}
                    />
                </div>
                <div className="mainNavIcons">
                    <ul className="flex items-center gap-5">
                    {socials.map((item : { url : string, icon : IconDefinition }, index : number) => {
                        return(
                            <SocialIcons url={item.url} icon={item.icon} key={item.url} delay={index} />
                        )
                    })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

const SocialIcons = ({ url, icon, delay } : { url : string, icon : IconProp, delay : number })  => {
    return(
        <motion.li
            initial={{ y: "-50px", opacity : 0 }}
            animate={{ y: "0px", opacity: 1 }}
            transition={{ duration: 0.5, ease : easeOut, delay: 0.25 * delay }}
            className="text-white text-2xl hover:text-indigo-500"><a href={url} target="_blank"
        ><FontAwesomeIcon icon={icon} /></a></motion.li>
    )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import { useState } from 'react';

export default function StickyFooter() {
    const [date, setDate] = useState<Date>(new Date());

    return(
    <div className='relative w-full flex items-center justify-center py-20'>
        <div className='container mx-5 md:mx-0 rounded-3xl bg-zinc-950 backdrop-blur-md p-10 flex items-center justify-between flex-wrap'>
        <div className='w-full md:w-1/2'><h3 className='text-6xl text-white font-normal'>Get In Touch</h3></div>
        <div className='py-10'>
            <a href='mailto:mr.tyronhayman@gmail.com' className='rounded-3xl bg-white text-black text-4xl md:text-6xl px-5 py-2'>
                Let's Talk <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>
        </div>
        <div className='w-full border-white/10 border-t border-solid py-5 mt-5 text-center'>
            <p className='text-white text-sm md:text-xs font-normal'>Crafted with <FontAwesomeIcon icon={faHeart} /> using NextJS, ThreeJS, Framer Motion in {date.getFullYear()}.</p>
        </div>
        </div>
    </div>
    )
}
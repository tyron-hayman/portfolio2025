import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import { useState } from 'react';

export default function StickyFooter() {
    const [date, setDate] = useState<Date>(new Date());

    return(
    <div 
        className='relative h-[600px] bg-black'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
        <div className='relative h-[calc(100vh+600px)] -top-[100vh]'>
            <div className='h-[600px] sticky top-[calc(100vh-600px)] flex justify-center'>
                <div className="container py-10 flex flex-wrap justify-center items-center">
                    <div className="w-full text-center">
                        <p className="text-white font-light leading-7xl text-4xl mb-16">Have an idea you want to bring to life or have a career oppertunity?</p>
                        <a href="mailto:mr.tyronhayman@gmail.com" className="rounded-full text-white text-4xl px-28 py-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                            Get In Touch
                        </a>
                    </div>
                    <div className='w-full text-center pt-5 border-t-white/10 border border-solid'>
                        <p className='text-white/50 text-sm leading-tight'>crafted with <FontAwesomeIcon icon={faHeart} /> using Tailwind, NextJs, Threejs and Framer Motion in {date.getFullYear()}.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
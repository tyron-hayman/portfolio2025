'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'

// Define the array of slides with numbers
const slides = [
    { src: 'axis.png' },
    { src: 'bmw.svg' },
    { src: 'disney.svg' },
    { src: 'hungerford.svg' },
    { src: 'mcdonalds.svg' },
    { src: 'nike.svg' },
    { src: 'onni.png' },
];

const Slider = () => {
    // Duplicate the slides array to ensure seamless looping
    const duplicatedSlides = [...slides, ...slides];

    return (
        <div className="relative w-full overflow-hidden mt-[100px] mb-[200px]">
            <div className='container mx-auto mb-10'>
                <p className='text-white text-xl font-normal px-5 md:px-0'>
                    I've been lucky to work on projects for some large companies
                </p>
            </div>
            {/* Wrapping div for seamless looping */}
            <motion.div
                className="flex gap-4"
                animate={{
                    x: ['-100%', '0%'],
                    transition: {
                        ease: 'linear',
                        duration: 40,
                        repeat: Infinity,
                    }
                }}
            >
                {/* Render duplicated slides */}
                {duplicatedSlides.map((slide, index) => {
                    let slideWidth = 100 / slides.length;
                    if ( window.innerWidth < 900 ) {
                        slideWidth = 200 / slides.length;
                    }
                    return(<div key={index} className="flex-shrink-0" style={{ width: `${slideWidth}%` }}>
                        <div className="flex flex-col items-center justify-center h-full bg-black/60 backdrop-blur-lg rounded-3xl p-4">
                        <Image
                            src={`/logos/${slide.src}`}
                            alt="Company Logo"
                            width={70}
                            height={30}
                            className='md:w-[40%] md:h-[auto] w-[70%]'
                        />
                        </div>
                    </div>)
                    })}
            </motion.div>
        </div>
    );
};

export default Slider;
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
                <p className='text-white text-xl font-normal'>
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
                {duplicatedSlides.map((slide, index) => (
                    <div key={index} className="flex-shrink-0" style={{ width: `${100 / slides.length}%` }}>
                        <div className="flex flex-col items-center justify-center h-full text-6xl bg-black/60 backdrop-blur-lg rounded-3xl p-4">
                        <Image
                            src={`/logos/${slide.src}`}
                            alt="Company Logo"
                            width={70}
                            height={30}
                            style={{
                                width : '40%',
                                height : 'auto'
                            }}
                        />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Slider;
'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faHandSparkles, faCode } from '@fortawesome/free-solid-svg-icons';
import AnimatedIcon from './AnimatedIcon';
import Section from './Section';

const skillSet : Array<{title : string; tech : Array<string>}> = [
    { title : "tech", tech : ["HTML", "CSS/SCSS", "Javascript", "PHP"]},
    { title : "Frameworks", tech : ["ReactJS", "ThreeJS ( Junior )", "NEXTJS", "jQuery"]},
    { title : "Workflow", tech : ["GIT", "Docker", "NPM"]},
    { title : "CMS", tech : ["Wordpress", "Sanity"]}
]

const Sphere = dynamic(() => import('@/components/Sphere'), {
    ssr: false,
});

export default function Landing() {

    return (
        <div className={`landing_wrapper relative`}>
            <div className='relative h-screen w-full flex justify-center items-center'>
                <div className='absolute inset-x-0 inset-y-0 z-0'>
                    <Sphere />
                </div>
                <div className='container text-center relative z-2 pointer-events-none'>
                    <h2 className='text-2xl md:text-lg font-black text-white uppercase'>
                        Hi, 
                        <motion.span className='inline-block mx-2 text-3xl' animate={{
                            rotate: ['0deg', '45deg', '0deg'],
                            transition: {
                                ease: 'easeInOut',
                                duration: 2,
                                repeat: Infinity,
                            }
                        }}><FontAwesomeIcon icon={faHandSparkles} /></motion.span>
                        I am a 
                    </h2>
                    <h1 className='text-[13vw] md:text-[9vw] font-light italic text-white uppercase cormorant'>FRONT END DEVELOPER</h1>
                    <p className='md:px-0 px-8 text-2xl font-light text-white'>...passionate about user experience and <FontAwesomeIcon icon={faCode} /> code.</p>
                </div>
                <div className='absolute left-[48%] bottom-24 md:bottom-5 z-3'>
                    <div className='relative rounded-full w-[25px] h-[37px] border-white border border-solid'>
                        <motion.div className='absolute rounded-full inset-x-2 top-2 h-[7px] bg-white'
                        animate={{
                            y: ['10px', '0px', '10px'],
                            transition: {
                                ease: 'easeInOut',
                                duration: 2,
                                repeat: Infinity,
                            }
                        }}
                        />
                    </div>
                </div>
            </div>
            <Section sectionClass="aboutSection">
            <div className='container mx-auto mt-[300px] relative z-2 px-5 md:px-0'>
                <h3 className='text-white text-3xl font-light italic tracking-tight mb-[50px] uppercase cormorant'><AnimatedIcon icon={faAsterisk} /> About</h3>
                <p className='text-white/90 font-light !leading-relaxed text-4xl md:text-5xl'>
                    Hello! My name is Tyron, a frontend developer living in Vancouver, BC, with a passion for code, user experience and simplicity. I am currently available for 
                    freelance or full time work!
                </p>
            </div>
            </Section>
            <Section>
            <div className='container mx-auto mt-[150px] relative z-2 px-5 md:px-0'>
                <h3 className='text-white text-3xl font-light italic tracking-tight mb-[50px] uppercase cormorant'><AnimatedIcon icon={faAsterisk} /> My Skills</h3>
                <div className='flex items-start gap-[20px] flex-wrap md:flex-nowrap'>
                    {skillSet.map((skill : {title : string; tech : Array<string>}, index : number) => {
                        return(
                            <div key={`skill${index}`} className='flex flex-wrap w-full md:w-1/4 border-white/50 border border-solid rounded-xl p-5 min-h-[280px]'>
                                <div className='w-full'>
                                {skill.tech.map((stack : string, index_stack : number) => {
                                    return(
                                        <p key={`stack${index_stack}`} className='text-white font-normal text-xl'>{stack}</p>
                                    )
                                })}
                                </div>
                                <h4 className='text-white uppercase font-black text-xl self-end'>{skill.title}</h4>
                            </div>
                        )
                    })}
                </div>
            </div>
            </Section>
        </div>
    );
}
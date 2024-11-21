import React from 'react';
import { motion } from 'framer-motion';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import AnimatedIcon from './AnimatedIcon';
import Section from './Section';

const skillSet : any[] = [
    { title : "tech", tech : ["HTML", "CSS/SCSS", "Javascript", "PHP"]},
    { title : "Frameworks", tech : ["ReactJS", "React Native ( Junior )", "NEXTJS", "VueJS", "jQuery"]},
    { title : "Workflow", tech : ["GIT", "Docker", "NodeJS"]},
    { title : "CMS", tech : ["Wordpress", "Sanity", "Prismic"]}
]

export default function Landing({ children } : { children : any }) {

    let heading1: string = "TYRON HAYMAN";
    let heading2: string = "FRONT END DEVELOPER";
    let subheading: string = "...with a passion for user experience.";

    return (
        <div className={`landing_wrapper relative`}>
            <div className='fixed inset-x-0 inset-y-0 z-0 h-screen'>
                {children}
            </div>
            <div className='relative h-screen w-full flex justify-center'>
                <div className='container self-end pb-10 overflow-hidden'>
                    <h2 className='text-[2vw] font-normal text-pink-600 uppercase'>Hi, I'm Tyron, a</h2>
                    <h1 className='text-[10vw] font-black text-white uppercase'>FRONT END DEVELOPER</h1>
                    <p className='text-5xl font-nomral text-white'>...passionate about user experience.</p>
                </div>
            </div>
            <Section>
            <div className='container mx-auto mt-[300px] relative z-2'>
                <h3 className='text-white text-3xl font-black tracking-tight mb-[50px] uppercase'><AnimatedIcon icon={faAsterisk} /> About</h3>
                <p className='text-white/90 font-light leading-relaxed text-5xl'>
                    Hello! My name is Tyron, a frontend developer living in Vancouver, BC, with a passion for code, user experience and simplicity. I am currently available for 
                    freelance or full time work!
                </p>
            </div>
            </Section>
            <Section>
            <div className='container mx-auto mt-[150px] relative z-2'>
                <h3 className='text-white text-3xl font-black tracking-tight mb-[50px] uppercase'><AnimatedIcon icon={faAsterisk} /> My Skills</h3>
                <div className='flex items-start gap-[20px]'>
                    {skillSet.map((skill : { title : string, tech : any[] }, index : number) => {
                        return(
                            <div key={`skill${index}`} className='flex flex-wrap w-1/4 border-4 border-solid border-indigo-500 rounded-3xl p-5 min-h-[280px] backdrop-blur-sm'>
                                <div className='w-full'>
                                {skill.tech.map((stack : any[], index_stack : number) => {
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
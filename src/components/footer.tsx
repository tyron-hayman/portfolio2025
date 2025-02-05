import React, { useContext, useEffect, useState} from 'react';
import PageDataContext from "@/lib/getPageData";


export default function Footer() {
    const date = new Date();
    const time = date.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles" })
    const pageData = useContext(PageDataContext);
    const [currtime, setCurrtime] = useState<any>(time)

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            const time = date.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles" })
            setCurrtime(time);
        }, 1000)
    }, []);

    return (
        <div className="relative px-5 md:px-0">
        {pageData.pageData ? (
            <>
           <div className='container mx-auto mt-20 md:mt-60 md:grid'>
                <h2 className='text-[18vw] md:text-[17vw] text-white font-black w-full mb-20'>
                    {pageData.pageData.pages.nodes[0].homepage.footerTitle}
                </h2>
                <p className='text-xl md:text-2xl leading-relaxed text-white w-full lg:w-2/3 justify-self-end'>
                    {pageData.pageData.pages.nodes[0].homepage.footerContent}
                </p>
           </div>
           <div className='container mx-auto py-32 md:flex justify-between items-center'>
                <div>
                    <p className='text-md lg:text-lg text-white font-normal mb-5 md:mb-0'>Built with passion in {date.getFullYear()}</p>
                </div>
                <div className='md:flex gap-4'>
                    <p className='text-md lg:text-lg text-white/50 font-normal mb-5 md:mb-0'>
                        Local Time:
                        <span className='text-white block'>{currtime}</span>
                    </p>
                    <p className='text-md lg:text-lg text-white/50 font-normal mb-5 md:mb-0'>
                        Located:
                        <span className='text-white block'>Vancouver, BC, Canada</span>
                    </p>
                    <p className='text-md lg:text-lg text-white/50 font-normal'>
                        Email:
                        <span className='text-white block'>{pageData.pageData.pages.nodes[0].homepage.footerEmail}</span>
                    </p>
                </div>
           </div>
           </>
        ) : null}
        </div>
    );
}
'use client'
import React, { useRef, useEffect, useState } from 'react';
import NavigationComponent from "@/app/navigationComponent";
import Landing from '@/components/landing';
import Work from "@/components/work";
import ProfileCV from '@/components/Profile';
import Slider from '@/components/slider';
import StickyFooter from '@/components/StickyFooter';
import dynamic from 'next/dynamic';
import { motion, animate } from 'framer-motion';

const Earth = dynamic(() => import('@/components/earth'), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingNum, setLoadingNum] = useState<number>(0);
  const [loadingText, setLoadingText] = useState<string>('Just tidying things up!');

  useEffect(() => {
    animate(0, 100, {
      duration: 2,
      onUpdate: (latest) => {
        setLoadingNum(Math.round(latest));
        if ( latest == 100 ) {
          setLoadingText('Done!');
          setTimeout(() => {
            setIsLoading(false);
          }, 500)
        }
      }
    });
  }, []);

  return (
        <>
        <Earth />
        <div className="site_wrapper">
            <motion.div className="siteLoader fixed z-[999] inset-x-0 inset-y-0 flex items-center justify-center overflow-hidden"
              style={{
                height: isLoading ? '100%' : '0%',
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
              }}
            >
                  <div className='loader w-[100px] text-center'>
                      <p className='relative text-white text-6xl md:text-4xl font-black opacity-70 mb-5'>
                      {loadingNum}%
                      </p>
                      <p className='block cormorant text-2xl md:text-xl font-thin italic text-white'>{loadingText}</p>
                  </div>
            </motion.div>
            <NavigationComponent />
            <Landing />
            <Work />
            <Slider />
            <ProfileCV />
            <StickyFooter />
        </div>
        </>
  );
}
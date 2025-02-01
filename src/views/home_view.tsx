'use client'
import React, { useEffect, useState } from 'react';
import NavigationComponent from "@/app/navigationComponent";
import Landing from '@/components/landing';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/footer';
import dynamic from 'next/dynamic';
import { motion, animate } from 'framer-motion';
import checkWebGL from '@/utils/checkWebGlSupport';
import Loader from '@/components/loading';

const Earth = dynamic(() => import('@/components/earth'), {
  ssr: false,
});

export default function Home() {
  const supportsWebGL = checkWebGL();

  return (
        <>
        { supportsWebGL ? <Earth /> : null }
        <div className="site_wrapper w-full mx-auto md:mx-0">
            <Loader />
            <NavigationComponent />
            <Landing />
            <Projects />
            <About />
            <Testimonials />
            <Footer />
        </div>
        </>
  );
}
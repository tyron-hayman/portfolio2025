'use client'
import React, { Suspense } from 'react';
import NavigationComponent from "@/app/navigationComponent";
import Landing from '@/components/landing';
import Work from "@/components/work";
import Slider from '@/components/slider';
import Footer from "@/components/footer";
import dynamic from 'next/dynamic';

const Earth = dynamic(() => import('@/components/earth'), {
  ssr: false
});


export default function Home() {
  
  return (
        <div className="site_wrapper">
          <NavigationComponent />
            <Landing>
              <Earth />
            </Landing>
          <Work />
          <Slider />
          <Footer />
        </div>
  );
}
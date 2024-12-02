'use client';
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis';
import type { Props } from '@/app/types';

export default function SmoothScroll({children} : Props) {
    useEffect( () => {
        window.scrollTo(0,0);
        const lenis = new Lenis()
        function raf(time : number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        } 
        requestAnimationFrame(raf)
    }, [])
    return children

}
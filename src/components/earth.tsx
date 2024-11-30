'use client';
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useMemo } from 'react'
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Scene = dynamic(() => import('@/components/Blob'), {
    ssr: false,
  });

export default function Index() {
    const wrapper = useRef<any>(null);
    return (
        <div className='fixed inset-x-0 inset-y-0 z-0 h-screen blur-lg'>
        {Scene ? 
        <motion.div className='w-full h-screen' initial={{ opacity : 0 }} animate={{ opacity : 1 }} transition={{ duration : 1 }}>
            <Scene />
        </motion.div>
        : null}
        </div>
    )

}
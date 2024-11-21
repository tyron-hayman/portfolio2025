'use client';
import { Canvas, useLoader } from '@react-three/fiber'
import React, { useRef, Suspense } from 'react'
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Scene = dynamic(() => import('@/components/model'), {
    ssr: false,
  });

export default function Index() {
    const wrapper = useRef<any>(null);
    return (
        <>
        {Scene ? 
        <motion.div className='w-full h-screen' initial={{ opacity : 0 }} animate={{ opacity : 1 }} transition={{ duration : 1 }}>
            <Canvas shadows="basic" eventPrefix="client" camera={{ position: [0, 0, 1], fov: 50 }}>
                    <Scene />
            </Canvas>
        </motion.div>
        : null}
        </>
    )

}
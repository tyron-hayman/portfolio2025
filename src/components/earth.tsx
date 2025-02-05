'use client';
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic';
import Loader from './loading';

const Scene = dynamic(() => import('@/components/Blob'), {
    ssr: false,
    loading: () => <ModelLoading />
  });

export default function Index() {
    return (
        <div className='fixed inset-x-0 inset-y-0 z-0 h-screen'>
        {Scene ? 
        <div className='w-full h-screen'>
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </div>
        : null}
        </div>
    )
}

const ModelLoading = () => {
    return(
        <div className='absolute inset-y-0 inset-x-0 z-[1] flex items-center justify-center'>
            <p className='text-7xl text-white/20 font-bold'>Loading Scene</p>
        </div>
    )
}
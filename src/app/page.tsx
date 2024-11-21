'use client'
import React, { Suspense } from 'react';
import Loader from '@/components/loading';
import dynamic from 'next/dynamic';
import SmoothScroll from "@/components/smoothScroll";
import StickCursor from '@/components/stick_cursor';
import store from "@/app/store"
import { Provider } from 'react-redux'

const Home = dynamic(() => import('@/views/home_view'), {
  ssr: false,
  loading: () => <Loader />
});

export default function LandingPage() {
  return (
    <Provider store={store}>
      <SmoothScroll>
        <StickCursor />
            <Home />
      </SmoothScroll>
    </Provider>
  );
}

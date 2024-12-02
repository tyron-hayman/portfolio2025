'use client'
import React from 'react';
import SmoothScroll from "@/components/smoothScroll";
import StickCursor from '@/components/stick_cursor';
import Home from '@/views/home_view';
import store from "@/app/store"
import { Provider } from 'react-redux'

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

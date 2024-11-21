import React, { useState } from 'react';
import { motion } from 'framer-motion';


export default function Footer() {
    const [date, setDate] = useState<any>(new Date());

    return (
        <div className={`fixed -right-16 bottom-24 z-[3] -rotate-90`}>
            <p className='text-white text-sm font-normal uppercase'>[{date.getFullYear()} tyronhayman.me]</p>
        </div>
    );
}
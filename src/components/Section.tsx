import Image from 'next/image';
import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

type Props = {
    children: string | JSX.Element | JSX.Element[] | '() => JSX.Element'
  }

export default function Section({ children } : Props) {
    const section = useRef(null)
    const isInView = useInView(section, { once: true, amount: 0.05 })

  return (
      <motion.div
        ref={section}
        className="w-full"
        style={{
            transform: isInView ? "none" : "translateY(200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
      >
        {children}
      </motion.div>
  );
}
import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion';

export default function useMouse() {
  const mouseVal = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const mouseMove = (e : MouseEvent) => {
    const { clientX, clientY } = e;
    mouseVal.x.set(clientX);
    mouseVal.y.set(clientY);
  }

  useEffect( () => {
    window.addEventListener("mousemove", mouseMove)
    return () => window.removeEventListener("mousemove", mouseMove)
  }, [])

  return mouseVal;
}
import { useEffect, useState } from 'react'

export default function checkWebGL() {
  const [hasSupport, setHasSupport] = useState<boolean>(true);

  const checkwebGL = () => {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) {
        setHasSupport(false)
    } else {
        setHasSupport(true)
    }
  }

  useEffect( () => {
    checkwebGL();
  }, [])

  return hasSupport;
}
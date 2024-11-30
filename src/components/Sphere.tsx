'use client'
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect} from "react";
import { MathUtils } from "three";
import { SphereShaderMaterial } from "@/utils/Shader";
import { motion } from "framer-motion-3d"
import { CameraControls } from '@react-three/drei'
import { useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";


const Blob = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>(null);
  const hover = useRef<any>(false);
  const { scrollYProgress } = useScroll({
    offset : ['start start', 'end end']
  })
  const sphereY = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.7, 2]);
  const mouse = {
      x: useMotionValue(0),
      y: useMotionValue(0)
  }

  const smoothOptions = {damping: 70, stiffness: 300, mass: 20}
  const smoothMouse = {
      x: useSpring(mouse.x, smoothOptions),
      y: useSpring(mouse.y, smoothOptions)
  }

  const manageMouseMove = ( e : any ) => {
      const { clientX, clientY } = e;
      mouse.x.set(clientX / 1000);
      mouse.y.set(clientY / 1000);
  }

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = 0.3 * clock.getElapsedTime();
    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 1.0 : 0.6,
      0.02
    );
  });

  useEffect( () => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
    window.removeEventListener("mousemove", manageMouseMove)
    }
  }, [])

  return (
    <motion.mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={scale}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
      receiveShadow={true}
      castShadow={true}
      position-y={sphereY}
      rotation-y={smoothMouse.x}
      rotation-x={smoothMouse.y}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={SphereShaderMaterial.fragmentShader}
        vertexShader={SphereShaderMaterial.vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </motion.mesh>
  );
};

const Scene = () => {
  return (
    <Canvas shadows="basic"  camera={{ position: [0.0, 0.0, 8.0] }}>
      <Blob />
      <ambientLight intensity={2} />
    </Canvas>
  );
};

export default Scene;

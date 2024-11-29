import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import { MathUtils } from "three";
import { SphereShaderMaterial } from "@/utils/Shader";
import { motion } from "framer-motion-3d"
import { Edges } from '@react-three/drei'


const Blob = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>(null);
  const hover = useRef<any>(false);

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
    mesh.current.material.uniforms.u_time.value = 0.1 * clock.getElapsedTime();
    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 1.0 : 0.6,
      0.02
    );
  });

  return (
    <motion.mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1.7}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
      receiveShadow={true}
      castShadow={true}
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
        <fog attach="fog" args={['black', 0, 2]} />
      <Blob />
      <ambientLight intensity={2} />
      <Edges color="white" />
    </Canvas>
  );
};

export default Scene;

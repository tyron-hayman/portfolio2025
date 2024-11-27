import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three';
import { useGLTF, SoftShadows, Float, BakeShadows } from "@react-three/drei";
import { useThree, useFrame } from '@react-three/fiber';
import { useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { GLTF } from 'three-stdlib';
import { EffectComposer, Bloom, DepthOfField, ToneMapping } from '@react-three/postprocessing'
import { Sparkles } from '@react-three/drei';


type GLTFResult = GLTF & {
  nodes: {
    Torus: THREE.Mesh
    ['Obj3d66-9001373-2-128']: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
    ['材质.028']: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
        screenX: useMotionValue(0),
        screenY: useMotionValue(0)
    }
    const { viewport } = useThree();
    const { nodes, materials } = useGLTF('/assets/bust02.glb') as GLTFResult;
    const bustRef = useRef<any>(null);
    const group = useRef<any>(null)
    const light = useRef<any>(null)

    const { scrollYProgress } = useScroll({
        offset: ['start start', 'end end']
    })

    const manageMouseMove = (e : any ) => {
        const { clientX, clientY } = e;
        mouse.x.set(clientX * 0.0001);
        mouse.y.set(clientY / 100000);
        mouse.screenX.set((clientX / viewport.width ) * 2 - 1 );
        mouse.screenY.set((clientY / viewport.height ) * 2 - 1);
      }
    
    const smoothMoveX = useSpring(mouse.x, {
        damping: 10
    });
    
    const smoothMoveY = useSpring(mouse.y, {
        damping: 10
    });

    const scale = useTransform(scrollYProgress, [0, 2], [7, 10]);
    const positionX = useTransform(scrollYProgress, [0, 100], [-1, 30]);
    const rotationY = useTransform(scrollYProgress, [0, 15], [0, -15]);
    
    useEffect( () => {
      window.addEventListener("mousemove", manageMouseMove);
      return () => {
        window.removeEventListener("mousemove", manageMouseMove)
      }
    }, []);

    return (
      <>  
            <fog attach="fog" args={['#000000', 0.7, 1.15]} />
            <pointLight position={[-0.5,0,0]} intensity={0.3} color="#ffffff" />
            <Sparkles count={50} scale={[1, 1, 1]} size={0.1} speed={0.25} />
            <motion.group ref={group} scale={1.7} position={[0,-0.75,0]} rotation-y={rotationY} dispose={null}>
            <SoftShadows samples={4} />
            <Float
              speed={4} // Animation speed, defaults to 1
              rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
              floatIntensity={0.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
              floatingRange={[-0.005, -0.02]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
            <motion.mesh
              castShadow
              receiveShadow
              geometry={nodes.Torus.geometry}
              material={materials.Material}
              position={[0, 0.594, -0.064]}
              rotation={[2.756, 0, 0]}
              scale={0.152}
              rotation-y={smoothMoveX}
            />
            <motion.spotLight angle={0.7} penumbra={0.5} castShadow intensity={20} shadow-mapSize={1014} position-z={-0.3} />
            </Float>
            <motion.mesh
              castShadow
              receiveShadow
              geometry={nodes['Obj3d66-9001373-2-128'].geometry}
              material={materials['材质.028']}
              ref={bustRef}
              rotation-y={smoothMoveX}
            >
              <meshPhysicalMaterial
                polygonOffset
                polygonOffsetFactor={0}
                roughness={0.8}
                clearcoat={0.1}
                metalness={0.1}
                toneMapped={false}
                color="#666666"
              />
            </motion.mesh>
            <BakeShadows />
            </motion.group>
        </>
    )

}
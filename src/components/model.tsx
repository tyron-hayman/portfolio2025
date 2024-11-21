import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three';
import { useGLTF, SoftShadows, Float } from "@react-three/drei";
import { useThree, useFrame } from '@react-three/fiber';
import { useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { GLTF } from 'three-stdlib';

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
    }, [])

    useFrame(({ clock }) => {
      bustRef.current.position.x = 0;
    })

    return (
      <>  
            <fog attach="fog" args={['#000000', 0, 2.5]} />
            <pointLight position={[-0.5,0,0]} intensity={50} color="#6d28d9" />
            <motion.group ref={group} scale={1.25} position={[0.4,-0.5,0]} rotation-y={rotationY} dispose={null}>
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
            <motion.spotLight ref={light} angle={0.8} penumbra={0.5} castShadow intensity={30} shadow-mapSize={1014} position-z={-0.3} />
            </Float>
            <motion.mesh
              castShadow
              receiveShadow
              geometry={nodes['Obj3d66-9001373-2-128'].geometry}
              material={materials['材质.028']}
              ref={bustRef}
              rotation-y={smoothMoveX}
            >
              <meshLambertMaterial color="#222222" fog={true} />
            </motion.mesh>
            </motion.group>
        </>
    )

}
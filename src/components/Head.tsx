"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stage } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { useTransform } from "framer-motion";

type GLTFResult = GLTF & {
  nodes: {
    connector: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial;
  };
};
export default function Head({ progress }: { progress: any }) {
  const canvas = useRef<any>();
  const ref = useRef();
  const rotate = useTransform(progress, [0, 1], [0, 10]);

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 35 }}>
      <Suspense fallback={null}>
        false
        <Model scrollprogress={rotate} />
        false
      </Suspense>
    </Canvas>
  );
}

const Model = ({ scrollprogress }: { scrollprogress: any }) => {
  const group = useRef<any>();
  let rotatex = 0;
  const { nodes, materials } = useGLTF(
    "/assets/ctransformed.glb"
  ) as GLTFResult;
  scrollprogress.on("change", (latest : any) => {
    rotatex = latest
  })

  useFrame((_, delta) => {
    group.current.rotation.x = rotatex
    group.current.rotation.y = rotatex
  })

  return (
    <>
      <Environment preset="studio" environmentIntensity={1} />
      <group ref={group} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.connector.geometry}
          material={materials.base}
          scale={10}
          position={[0, 0, 0]}
          rotation={[45, 45, 0]}
        ><meshStandardMaterial color="#4c1d95" metalness={0.2} roughness={0.9} map={materials.base.map}  /></mesh>
      </group>
    </>
  );
};

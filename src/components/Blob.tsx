import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useCallback } from "react";
import { Color, Vector2 } from "three";
import { ShaderMaterial } from 'three';
import useDimension from "@/utils/useDimensions";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useGLTF } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { useScroll } from "framer-motion";


type GLTFResult = GLTF & {
  nodes: {
    connector: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial;
  };
};

const MovingPlane = () => {
  const mesh = useRef<any>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const dimentions = useDimension();

  const updateMousePosition = useCallback((e : any) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

  const { nodes, materials } = useGLTF(
      "/assets/ctransformed.glb"
    ) as GLTFResult;

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
      u_colorA: { value: new Color("#4c0519") },
      u_colorB: { value: new Color("#7c3aed") },
      u_colorC: { value: new Color("#be123c") },
    }), []
  );

  const shaderMaterial = new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        precision mediump float;

        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec2 u_mouse;
        varying vec2 vUv;

        // Smooth minimum function for blending blobs
        float smin(float a, float b, float k) {
            float res = exp(-k * a) + exp(-k * b);
            return -log(res) / k;
        }

        // Function to create a moving blob
        float blob(vec2 uv, vec2 pos, float size) {
            return length(uv - pos) - size;
        }

        void main() {
            vec2 uv = (gl_FragCoord.xy - 0.4 * u_resolution.xy) / u_resolution.y;

            // Define blob positions with time-based movement
            vec2 p1 = vec2(cos(u_time * 0.2) * 0.4, sin(u_time * 0.3) * 0.7);
            vec2 p2 = vec2(sin(u_time * 0.6) * 0.2 + 0.2, cos(u_time * 0.6) * 1.2);
            vec2 p3 = vec2(cos(u_time * 0.4) * 0.5 - 0.3, cos(u_time * 0.3) * 0.4);
            vec2 p4 = vec2(sin(u_time * 0.4) * 0.6, sin(u_time * 0.5) * 0.4 - 0.5);

            // Define blob sizes
            float size = 0.1;
            float size2 = 0.15;
            float size3 = 0.1;
            float size4 = 0.15;

            // Compute distance fields
            float d1 = blob(uv, p1, size);
            float d2 = blob(uv, p2, size2);
            float d3 = blob(uv, p3, size3);
            float d4 = blob(uv, p4, size4);

            // Smoothly merge blobs using smooth minimum function
            float d = smin(smin(d1, d2, 5.0), smin(d3, d4, 10.0), 6.0);

            // Convert distance field to soft alpha
            float alpha = smoothstep(0.75, 0.05, d);

            // Blue-gray color
            vec3 color = mix(vec3(0.21568627450980393, 0.18823529411764706, 0.6392156862745098), vec3(0.058823529411764705, 0.09019607843137255, 0.16470588235294117), alpha);

            gl_FragColor = vec4(color, alpha);
        }
    `,
    transparent: true // Allows blending
});

  useFrame((state) => {
    const { clock } = state;
    if ( mesh.current ) {
      mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
      mesh.current.material.uniforms.u_mouse.value = new Vector2(
        mousePosition.current.x,
        mousePosition.current.y
      );
    }
  });

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  return (
    <>
    <group position={[0, 0, -1]}>
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[5, 2, 50, 50]} />
      <shaderMaterial
        fragmentShader={shaderMaterial.fragmentShader}
        vertexShader={shaderMaterial.vertexShader}
        uniforms={uniforms}
        depthWrite={false}
        wireframe={true}
      />
    </mesh>
    </group>
    </>
  );
};

const HeadModel = () => {
  const group = useRef<any>();
  let rotatex = 0;
  const { nodes, materials } = useGLTF(
    "/assets/ctransformed.glb"
  ) as GLTFResult;
  const { scrollYProgress } = useScroll()

  useFrame((state) => {
    const { clock } = state;
    if ( group.current ) {
      group.current.rotation.z = clock.getElapsedTime() / 5;
      group.current.rotation.y = clock.getElapsedTime() / 5;
      group.current.position.y = scrollYProgress.get() * 1.5
    }
  });

  return (
    <>
      <Environment preset="studio" environmentIntensity={1} />
      <group ref={group} dispose={null} position={[0, 0, 3.5]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.connector.geometry}
          material={materials.base}
          scale={1.2}
          position={[0, 0, 0]}
          rotation={[45, 45, 0]}
        ><meshStandardMaterial color="#4c1d95" metalness={0.2} roughness={0.9} map={materials.base.map}  /></mesh>
      </group>
    </>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 17.5, near: 0.1, far: 100 }} gl={{ antialias: false }} shadows dpr={[1, 2]} style={{ background : '#0f172a'}}>
        <MovingPlane />
        <HeadModel />
    </Canvas>
  );
};

export default Scene;


import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useCallback } from "react";
import { Color, Vector2 } from "three";
import CustomShaderMaterial from "@/utils/Shader";

const MovingPlane = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e : any) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_colorA: { value: new Color("#4c0519") },
      u_colorB: { value: new Color("#7c3aed") },
      u_colorC: { value: new Color("#be123c") },
    }), []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime() / 3;
    mesh.current.material.uniforms.u_mouse.value = new Vector2(
        mousePosition.current.x,
        mousePosition.current.y
      );
  });

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  return (
    <group>
    <mesh ref={mesh} position={[0, 0, -1]} rotation={[-Math.PI / 2, 0, 0]} scale={4}>
      <planeGeometry args={[1, 1, 100, 100]} />
      <shaderMaterial
        fragmentShader={CustomShaderMaterial.fragmentShader}
        vertexShader={CustomShaderMaterial.vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [1.0, 1.0, 1.0], fov: 30 }} shadows dpr={[1, 2]}>
        <MovingPlane />
    </Canvas>
  );
};


export default Scene;

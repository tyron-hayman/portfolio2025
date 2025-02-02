import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useCallback } from "react";
import { Color, Vector2 } from "three";
import { ShaderMaterial } from 'three';
import useDimension from "@/utils/useDimensions";

const MovingPlane = () => {
  const mesh = useRef<any>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const dimentions = useDimension();

  const updateMousePosition = useCallback((e : any) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

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
            vec2 p3 = vec2(cos(u_time * 0.4) * 0.3 - 0.3, cos(u_time * 0.3) * 0.4);
            vec2 p4 = vec2(sin(u_time * 0.4) * 0.6, sin(u_time * 0.5) * 0.4 - 0.9);

            // Define blob sizes
            float size = 0.4;
            float size2 = 0.2;
            float size3 = 0.3;
            float size4 = 0.1;

            // Compute distance fields
            float d1 = blob(uv, p1, size);
            float d2 = blob(uv, p2, size2);
            float d3 = blob(uv, p3, size3);
            float d4 = blob(uv, p4, size4);

            // Smoothly merge blobs using smooth minimum function
            float d = smin(smin(d1, d2, 10.0), smin(d3, d4, 10.0), 10.0);

            // Convert distance field to soft alpha
            float alpha = smoothstep(0.1, 0.0, d);

            // Blue-gray color
            vec3 color = mix(vec3(0.058823529411764705, 0.09019607843137255, 0.16470588235294117), vec3(0.058823529411764705, 0.09019607843137255, 0.16470588235294117), alpha);

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
    <group>
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={10}>
      <planeGeometry args={[2, 2, 100, 100]} />
      <shaderMaterial
        fragmentShader={shaderMaterial.fragmentShader}
        vertexShader={shaderMaterial.vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0,0,0] }} shadows dpr={[1, 2]} style={{ background : '#0f172a'}}>
        <MovingPlane />
    </Canvas>
  );
};

export default Scene;


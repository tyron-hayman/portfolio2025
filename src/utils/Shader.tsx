import { ShaderMaterial } from 'three';

const CustomShaderMaterial = new ShaderMaterial({
vertexShader: `
uniform float u_time;
uniform vec2 u_mouse;

varying float vZ;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  modelPosition.y += cos(modelPosition.x * 5.0 + u_time * 3.0) * 0.2;
  modelPosition.y += sin(modelPosition.z * 2.0 + u_time * 2.0) * 0.2;
  
  vZ = modelPosition.y;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}

`,
  fragmentShader: `
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_colorC;
varying float vZ;
uniform vec2 u_mouse;


void main() {
  vec3 color = mix(u_colorA, u_colorB, vZ * (u_mouse.y * 0.0005) + 0.5);
  vec3 color2 = mix(u_colorB, u_colorC, vZ * (u_mouse.x * 0.0005) + 0.5);
  vec3 color3 = mix(color, color2, vZ * 3.0 + 0.5);

  gl_FragColor = vec4(color3, 1.0);
}

    `,
});

export default CustomShaderMaterial;
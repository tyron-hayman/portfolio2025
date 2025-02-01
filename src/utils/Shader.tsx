import { ShaderMaterial } from 'three';

const CustomShaderMaterial = new ShaderMaterial({
  fragmentShader: `

  #ifdef GL_ES
precision mediump float;
#endif

uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform vec3 u_colorC;
varying float vZ;
uniform vec2 u_mouse;

uniform vec2 u_resolution;
uniform float u_time;

// Function to compute the distance to a moving circle
float blob(vec2 p, vec2 center, float radius) {
    return length(p - center) - radius;
}

// Smooth min function to merge blobs
float smoothMin(float a, float b, float k) {
    float res = exp(-k * a) + exp(-k * b);
    return -log(res) / k;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.y;
    
    // Animate blob positions
    vec2 pos1 = vec2(sin(u_time) * 0.4, cos(u_time) * 0.4);
    vec2 pos2 = vec2(cos(u_time * 1.2) * 0.5, sin(u_time * 1.3) * 0.5);
    
    // Compute signed distance fields
    float d1 = blob(uv, pos1, 0.3);
    float d2 = blob(uv, pos2, 0.3);
    
    // Merge blobs using smooth min
    float sdf = smoothMin(d1, d2, 10.0);
    
    // Convert SDF to color
    vec3 color = mix(vec3(1.0, 0.2, 0.5), vec3(0.2, 0.5, 1.0), smoothstep(-0.1, 0.1, sdf));
    
    // Soft edges
    float alpha = smoothstep(0.2, 0.0, sdf);
    
    gl_FragColor = vec4(color, alpha);
}
    `,
});

export default CustomShaderMaterial;

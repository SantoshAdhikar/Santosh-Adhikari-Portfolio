// src/components/BlueShaderBackground.tsx
// @ts-nocheck
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Light mode  : Blue stucco shader with slow, visible dot drift (transparent canvas)
 * Dark mode   : Calm space starfield (opaque deep navy)
 */
export default function BlueShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => {
    const rebuild = () => {
      cleanupRef.current?.();
      mount();
    };

    // Rebuild when theme class toggles (light/dark)
    const obs = new MutationObserver(rebuild);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    mount();
    return () => {
      obs.disconnect();
      cleanupRef.current?.();
      rendererRef.current?.dispose();
    };
  }, []);

  function mount() {
    const isDark = document.documentElement.classList.contains("dark");

    // ---------- shared canvas/renderer bootstrap ----------
    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvasRef.current = canvas;
      Object.assign(canvas.style, {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        display: "block",
        zIndex: "0",           // behind your content
        pointerEvents: "none", // never block clicks
      });
      document.body.appendChild(canvas);

      // handle lost contexts (avoids staying black)
      canvas.addEventListener("webglcontextlost", (e) => e.preventDefault(), false);
    }

    // IMPORTANT: alpha:true so light mode can be transparent
    let renderer = rendererRef.current;
    if (!renderer) {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      rendererRef.current = renderer;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    let onResize: any;
    let raf = 0;

    if (!isDark) {
      // ---------------- LIGHT MODE: Stucco + slow dot drift (transparent) ----------------
      // TWEAKS
      const SPEED_BG = 0.18;   // background horizontal drift (lower = slower)
      const DOT_SPEED = 0.000004; // dot drift speed (lower = slower)
      const ROUGHNESS = 0.10;  // bump fineness
      const SPECK_SIZE = 2.6;  // larger, human-visible dots
      const SPECK_DENSITY = 0.90;

      // transparent in light mode
      renderer.setClearColor(0x000000, 0);
      renderer.setClearAlpha(0);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const fragmentShader = `
        precision highp float;
        uniform vec2  u_res;
        uniform float u_time;
        uniform float u_bgSpeed;
        uniform float u_dotSpeed;
        uniform float u_rough;
        uniform float u_speckSize;
        uniform float u_speckDensity;
        uniform vec3  u_c1;
        uniform vec3  u_c2;

        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
        float noise(vec2 x){
          vec2 i=floor(x), f=fract(x);
          float a=hash(i);
          float b=hash(i+vec2(1.,0.));
          float c=hash(i+vec2(0.,1.));
          float d=hash(i+vec2(1.,1.));
          vec2 u=f*f*(3.-2.*f);
          return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
        }
        float fbm(vec2 p){
          float v=0., a=.5;
          for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.; a*=.5; }
          return v;
        }

        void main(){
          vec2 uv = gl_FragCoord.xy / u_res.xy;
          uv.x *= u_res.x / u_res.y;

          // One motion: horizontal drift of base coords
          float t = u_time * u_bgSpeed;
          vec2 base = uv * (2.5 + u_rough*0.25) + vec2(t, 0.0);

          // Stucco bumps
          float h = fbm(base);
          vec2 e = vec2(1.0/u_res.y, 0.0);
          float hx = h - fbm(base + e);
          float hy = h - fbm(base + vec2(0.0, e.x));
          vec3 n = normalize(vec3(hx, hy, 1.0/(0.15 + 0.025*u_rough)));
          vec3 lightDir = normalize(vec3(-0.6, -0.8, 0.9));
          float diff = clamp(dot(n, lightDir), 0.0, 1.0);

          vec3 baseCol = mix(u_c1, u_c2, smoothstep(0.2, 0.8, h));
          vec3 col = baseCol * (0.55 + 0.45*diff);

          // Visible dots with slow independent drift
          vec2 gUV = gl_FragCoord.xy * (0.4 / u_speckSize);
          vec2 motion = vec2(u_time * u_dotSpeed, u_time * (u_dotSpeed*0.7));
          float r1 = hash(gUV + motion);
          float r2 = hash(gUV + vec2(1.3, 2.1) + motion*1.2);
          float speck = max(step(u_speckDensity, r1), step(u_speckDensity, r2));
          col += speck * 0.28;

          gl_FragColor = vec4(col, 1.0);
        }
      `;
      const vertexShader = `void main(){ gl_Position = vec4(position, 1.0); }`;

      const uniforms = {
        u_res:          { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_time:         { value: 0 },
        u_bgSpeed:      { value: SPEED_BG },
        u_dotSpeed:     { value: DOT_SPEED },
        u_rough:        { value: ROUGHNESS },
        u_speckSize:    { value: SPECK_SIZE },
        u_speckDensity: { value: SPECK_DENSITY },
        u_c1:           { value: new THREE.Color("#0d5eff").convertSRGBToLinear() },
        u_c2:           { value: new THREE.Color("#0d7edb").convertSRGBToLinear() },
      };

      const mat = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
      scene.add(quad);

      const clock = new THREE.Clock();
      const loop = () => {
        uniforms.u_time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      loop();

      onResize = () => {
        uniforms.u_res.value.set(window.innerWidth, window.innerHeight);
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      cleanupRef.current = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        quad.geometry.dispose();
        mat.dispose();
        renderer.clear();
      };

    } else {
      // ---------------- DARK MODE: Calm starfield (opaque deep navy) ----------------
      const STAR_DRIFT_SPEED = 0.05;

      renderer.setClearColor(0x070b1d, 1); // opaque navy

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
      camera.position.z = 300;

      const N = 1500;
      const pos = new Float32Array(N * 3);
      const col = new Float32Array(N * 3);
      const c = new THREE.Color();

      for (let i = 0; i < N; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 1200;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 800;
        pos[i * 3 + 2] = -Math.random() * 1400;

        if (Math.random() < 0.07) c.set("#ffcc66"); // a few gold specks
        else c.setHSL(0.60 + Math.random()*0.05, 0.6, 0.55 + Math.random()*0.15);

        col[i * 3 + 0] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const stars = new THREE.Points(geo, mat);
      scene.add(stars);

      const clock = new THREE.Clock();
      const loop = () => {
        const t = clock.getElapsedTime() * STAR_DRIFT_SPEED;
        stars.rotation.y = t * 0.6;  // one gentle motion
        stars.rotation.x = t * 0.25;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      loop();

      onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      cleanupRef.current = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        geo.dispose();
        mat.dispose();
        renderer.clear();
      };
    }
  }

  return null;
}

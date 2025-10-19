// @ts-nocheck
import { useEffect, useRef } from "react";
import * as THREE from "three";

const NAVY     = 0x0a0f25;
const ELECTRIC = 0x1e90ff;
const GOLD     = 0xffcc66;

export default function BlueShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => {
    const html = document.documentElement;

    const rebuild = () => {
      cleanupRef.current?.();
      mountScene();
    };

    const obs = new MutationObserver(rebuild);
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });

    mountScene();

    return () => {
      obs.disconnect();
      cleanupRef.current?.();
      rendererRef.current?.dispose();
    };
  }, []);

  function mountScene() {
    const isDark = document.documentElement.classList.contains("dark");

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
        zIndex: "0",
      });
      document.body.appendChild(canvas);
    }

    let renderer = rendererRef.current;
    if (!renderer) {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      rendererRef.current = renderer;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    let tick: number;
    let onResize: any;

    if (isDark) {
      // DARK MODE – cyber grid (now slower)
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      camera.position.set(0, 5, 16);

      renderer.setClearColor(NAVY, 1);
      scene.fog = new THREE.FogExp2(NAVY, 0.06);

      const grid = new THREE.GridHelper(100, 80, ELECTRIC, ELECTRIC);
      (grid.material as THREE.Material).transparent = true;
      grid.position.y = -2.2;
      grid.rotation.x = Math.PI / 8;
      scene.add(grid);

      const planes: THREE.LineSegments[] = [];
      const planeMat = new THREE.LineBasicMaterial({
        color: 0x0ab9ff,
        transparent: true,
        opacity: 0.18,
      });
      for (let i = 0; i < 3; i++) {
        const g = new THREE.PlaneGeometry(40, 20, 40, 20);
        const w = new THREE.WireframeGeometry(g);
        const m = new THREE.LineSegments(w, planeMat.clone());
        m.position.z = -8 - i * 6;
        m.rotation.x = -Math.PI / 12;
        scene.add(m);
        planes.push(m);
      }

      const group = new THREE.Group();
      const geo = new THREE.BufferGeometry();
      const N = 600;
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 40;
        pos[i * 3 + 1] = (Math.random() - 0.3) * 18;
        pos[i * 3 + 2] = -Math.random() * 40;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const goldMat = new THREE.PointsMaterial({
        size: 0.06,
        color: GOLD,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
      const blueMat = new THREE.PointsMaterial({
        size: 0.05,
        color: ELECTRIC,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
      const goldPts = new THREE.Points(geo, goldMat);
      const bluePts = new THREE.Points(geo.clone(), blueMat);
      bluePts.position.z = -2;
      group.add(goldPts, bluePts);
      scene.add(group);

      const beamsMat = new THREE.MeshBasicMaterial({
        color: ELECTRIC,
        transparent: true,
        opacity: 0.06,
      });
      for (let i = 0; i < 4; i++) {
        const beam = new THREE.Mesh(new THREE.PlaneGeometry(2, 20), beamsMat.clone());
        beam.position.set(-4 + i * 2.5, 0, -10 - i * 3);
        beam.rotation.y = (i - 1.5) * 0.15;
        scene.add(beam);
      }

      const clock = new THREE.Clock();
      const animate = () => {
        const t = clock.getElapsedTime() * 0.25; // <-- slower speed (was 0.8)
        (grid.material as THREE.Material).opacity = 0.20 + Math.sin(t * 1.0) * 0.03;
        planes.forEach((p, i) => {
          p.position.z = -8 - i * 6 + Math.sin(t * 0.4 + i) * 0.5;
          (p.material as THREE.Material).opacity = 0.10 + 0.05 * Math.sin(t * 0.5 + i);
        });
        group.rotation.y = t * 0.08;
        camera.position.y = 5 + Math.sin(t * 0.2) * 0.3;

        renderer.render(scene, camera);
        tick = requestAnimationFrame(animate);
      };
      animate();

      onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      cleanupRef.current = () => {
        cancelAnimationFrame(tick);
        window.removeEventListener("resize", onResize);
        scene.traverse((obj) => {
          if ((obj as any).geometry) (obj as any).geometry.dispose?.();
          if ((obj as any).material) {
            const m = (obj as any).material;
            Array.isArray(m) ? m.forEach((mm: any) => mm.dispose?.()) : m.dispose?.();
          }
        });
        renderer.clear();
      };
    } else {
      // LIGHT MODE – very slow and smooth dots
      const scene2 = new THREE.Scene();
      const camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const GRAIN_SCALE     = 0.28;
      const SPECK_THRESHOLD = 0.975;
      const SPECK_INTENSITY = 0.18;

      const fragmentShader = `
        uniform float u_time;
        uniform vec2  u_res;

        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float noise(vec2 x){
          vec2 i = floor(x), f = fract(x);
          float a = hash(i), b = hash(i+vec2(1,0)), c = hash(i+vec2(0,1)), d = hash(i+vec2(1,1));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
        }

        void main(){
          vec2 st = gl_FragCoord.xy / u_res;
          st.x *= u_res.x / u_res.y;

          float n = noise(st*4.0 + u_time*0.9); // <-- super slow
          vec3 dark  = vec3(0.05, 0.35, 1.0);
          vec3 light = vec3(0.05, 0.54, 0.86);
          vec3 col = mix(dark, light, smoothstep(0.2, 0.8, n));

          vec2 gUV = gl_FragCoord.xy * ${GRAIN_SCALE.toFixed(2)};
          float r1 = hash(gUV + u_time*0.000010);  // <-- slower
          float r2 = hash(gUV + vec2(1.3, 2.1) + u_time*0.8);
          float r3 = hash(gUV + vec2(-2.7, -0.9) + u_time*0.12);
          float speck = max(max(step(${SPECK_THRESHOLD}, r1), step(${SPECK_THRESHOLD}, r2)), step(${SPECK_THRESHOLD}, r3));

          col += speck * ${SPECK_INTENSITY};

          gl_FragColor = vec4(col, 1.0);
        }
      `;
      const vertexShader = `void main(){ gl_Position = vec4(position,1.0); }`;

      const uniforms = {
        u_time: { value: 0 },
        u_res:  { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      };

      const mat  = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
      scene2.add(quad);

      const clock = new THREE.Clock();
      const animate = () => {
        uniforms.u_time.value = clock.getElapsedTime();
        uniforms.u_res.value.set(window.innerWidth, window.innerHeight);
        renderer.render(scene2, camera2);
        tick = requestAnimationFrame(animate);
      };
      animate();

      onResize = () => {
        uniforms.u_res.value.set(window.innerWidth, window.innerHeight);
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      cleanupRef.current = () => {
        cancelAnimationFrame(tick);
        window.removeEventListener("resize", onResize);
        quad.geometry.dispose();
        mat.dispose();
        renderer.clear();
      };
    }
  }

  return null;
}

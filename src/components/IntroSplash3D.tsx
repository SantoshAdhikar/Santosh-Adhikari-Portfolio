import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { show: boolean; onDone: () => void; durationMs?: number; name?: string };

export default function IntroSplash3D({ show, onDone, durationMs = 2700, name = "SANTOSH ADHIKARI" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!show) return;
    const container = containerRef.current;
    if (!container) return;

    let renderer: { dispose: () => void } | undefined;
    let geometry: { dispose: () => void } | undefined;
    let material: { dispose: () => void } | undefined;
    let animationFrame = 0;
    let cleanupGraphics = () => {};

    try {
      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      Object.assign(canvas.style, { position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" });
      container.appendChild(canvas);
      const instance = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer = instance;
      instance.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      instance.setClearColor(0x000000, 0);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 300;
      const particlesGeometry = new THREE.BufferGeometry();
      geometry = particlesGeometry;
      const positions = new Float32Array(550 * 3);
      const colors = new Float32Array(550 * 3);
      const c = new THREE.Color();
      for (let i = 0; i < 550; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 900;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 900;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 900;
        c.setHSL(0.58 + Math.random() * 0.13, 0.65, 0.55 + Math.random() * 0.25);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      material = new THREE.PointsMaterial({ size: 2, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      const currentRenderer = instance;
      const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        currentRenderer.setSize(window.innerWidth, window.innerHeight);
      };
      resize();
      const onMove = (event: MouseEvent) => {
        if (!titleRef.current) return;
        const x = (event.clientX / window.innerWidth - 0.5) * 8;
        const y = (event.clientY / window.innerHeight - 0.5) * -8;
        titleRef.current.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
      };
      const animate = () => {
        points.rotation.y += 0.00045;
        points.rotation.x += 0.0002;
        currentRenderer.render(scene, camera);
        animationFrame = requestAnimationFrame(animate);
      };
      animate();
      window.addEventListener("resize", resize);
      window.addEventListener("mousemove", onMove);
      cleanupGraphics = () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMove);
      };
    } catch {
      // CSS gradient and text remain available when WebGL is unsupported.
    }

    const timer = window.setTimeout(onDone, durationMs);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
      cleanupGraphics();
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
      const canvas = container.querySelector("canvas");
      canvas?.remove();
    };
  }, [show, onDone, durationMs]);

  if (!show) return null;
  return (
    <div ref={containerRef} role="status" aria-label="Portfolio introduction" className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#04091a] via-[#0a2041] to-[#030711]">
      <div className="pointer-events-none relative z-10 flex w-full flex-col items-center px-4 text-center">
        <h1 ref={titleRef} className="intro-name-container" aria-label={name}>
          {Array.from(name).map((ch, i) => ch === " " ? <span key={i} className="intro-space" aria-hidden="true">&nbsp;</span> : <span key={i} className="intro-letter intro-reveal" aria-hidden="true" style={{ animationDelay: `${i * 55}ms,0ms,0ms` }}>{ch}</span>)}
        </h1>
        <p className="mt-6 text-base font-bold tracking-[0.2em] text-sky-200 sm:text-xl">BACKEND & FULL-STACK DEVELOPER</p>
        <div className="mt-9 h-1 w-60 overflow-hidden rounded-full bg-white/20 sm:w-80"><div className="intro-progress h-full bg-sky-300" style={{ animationDuration: `${durationMs}ms` }} /></div>
      </div>
      <button type="button" onClick={onDone} className="absolute bottom-7 right-6 z-20 rounded-lg border border-white/40 bg-black/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">Skip intro</button>
    </div>
  );
}

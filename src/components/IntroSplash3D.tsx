// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  show: boolean;
  onDone: () => void;
  durationMs?: number;   // default 3000
  name?: string;         // default "SANTOSH ADHIKARI"
};

export default function IntroSplash3D({
  show,
  onDone,
  durationMs = 3000,
  name = "SANTOSH ADHIKARI",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  // progress bar animation (CSS runs it, this is just width reset)
  const [mountedAt] = useState<number>(Date.now());

  useEffect(() => {
    if (!show) return;

    // ====== Three.js setup (star field background) ======
    const canvas = document.createElement("canvas");
    canvasRef.current = canvas;
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      display: "block",
      zIndex: "0",
    });
    wrapRef.current?.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 1);

    // Particles (colored starfield)
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colors: number[] = [];
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 1000;
      const y = (Math.random() - 0.5) * 1000;
      const z = (Math.random() - 0.5) * 1000;
      vertices.push(x, y, z);

      // blueish hues
      color.setHSL(0.6 + Math.random() * 0.1, 0.5, 0.5 + 0.2 * Math.random());
      colors.push(color.r, color.g, color.b);
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // mouse parallax for background + 3D tilt on text
    let halfX = window.innerWidth / 2;
    let halfY = window.innerHeight / 2;
    let bgMouseX = 0;
    let bgMouseY = 0;

    function onMouseMove(e: MouseEvent) {
      bgMouseX = (e.clientX - halfX) * 0.5;
      bgMouseY = (e.clientY - halfY) * 0.5;

      // 3D tilt on the name
      if (nameRef.current) {
        const maxTilt = 5;
        const sens = 0.05;
        const rotateY = -(e.clientX - halfX) * (maxTilt / halfX);
        const rotateX = (e.clientY - halfY) * (maxTilt / halfY);
        const translateX = -(e.clientX - halfX) * sens;
        const translateY = -(e.clientY - halfY) * sens;
        nameRef.current.style.transform = `
          translateX(${translateX}px)
          translateY(${translateY}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `;
      }
    }

    function onResize() {
      halfX = window.innerWidth / 2;
      halfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    let running = true;
    const tick = () => {
      if (!running) return;
      const t = Date.now() * 0.00005;
      // slow drift
      particles.rotation.y = t * 6; // feel stronger rotation
      particles.rotation.x = t * 3;

      // parallax camera
      camera.position.x += (bgMouseX - camera.position.x) * 0.05;
      camera.position.y += (-bgMouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();

    // ====== Rainbow stagger letter reveal ======
    if (nameRef.current) {
      nameRef.current.innerHTML = ""; // clear
      const FULL_NAME = name;
      let totalDelay = 0;
      const DELAY = 60; // ms per letter

      for (let i = 0; i < FULL_NAME.length; i++) {
        const ch = FULL_NAME[i];
        const span = document.createElement("span");
        span.className = ch === " " ? "intro-space" : "intro-letter";
        span.textContent = ch === " " ? "" : ch;
        nameRef.current.appendChild(span);

        if (ch !== " ") {
          setTimeout(() => {
            span.classList.add("intro-reveal");
          }, totalDelay);
          totalDelay += DELAY;
        }
      }

      // Show subtitle slightly after
      const tagline = document.getElementById("intro-tagline");
      setTimeout(() => {
        tagline?.classList.remove("opacity-0");
      }, totalDelay + 300);
    }

    // auto-finish after durationMs
    const timer = setTimeout(() => onDone(), durationMs);

    // click to skip
    const clickToSkip = () => onDone();
    wrapRef.current?.addEventListener("click", clickToSkip);

    return () => {
      running = false;
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      wrapRef.current?.removeEventListener("click", clickToSkip);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      if (canvasRef.current && wrapRef.current) {
        wrapRef.current.removeChild(canvasRef.current);
      }
    };
  }, [show, durationMs, name, onDone]);

  if (!show) return null;

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[101]">
        <h1
          id="name-display"
          ref={nameRef}
          className="intro-name-container mb-4"
          aria-label={name}
        />
        <p
          id="intro-tagline"
          className="text-yellow-400 text-lg sm:text-2xl font-bold tracking-widest mt-6 opacity-0 transition-opacity duration-700"
        >
          DEVELOPER | CREATOR | VISIONARY
        </p>

        {/* progress bar */}
        <div className="mt-12 w-3/4 sm:w-1/3 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            key={mountedAt} /* restart CSS animation if re-mounted */
            className="h-full bg-yellow-400 intro-progress"
            style={{ animationDuration: `${Math.max(0, durationMs) / 1000}s` }}
          />
        </div>
      </div>
    </div>
  );
}

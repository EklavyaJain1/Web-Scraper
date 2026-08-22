import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function CobeGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = 360;
    const height = 360;

    // --- Scene ---
    const scene = new THREE.Scene();

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 3.2);
    camera.lookAt(0, 0, 0);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
    directionalLight.position.set(3, 4, 5);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x6699ff, 0.5);
    fillLight.position.set(-3, 0, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xaaccff, 0.4);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // --- Load GLB model ---
    const loader = new GLTFLoader();
    let earthModel: THREE.Group | null = null;

    loader.load(
      "/earth.glb",
      (gltf) => {
        earthModel = gltf.scene;

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(earthModel);
        const center = box.getCenter(new THREE.Vector3());
        earthModel.position.sub(center);

        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.0 / maxDim;
        earthModel.scale.setScalar(scale);

        // Tilt the globe slightly for a nicer angle
        earthModel.rotation.x = 0.2;

        scene.add(earthModel);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
      }
    );

    // --- Animation loop ---
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (earthModel) {
        earthModel.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center"
      style={{ minHeight: 320 }}
    />
  );
}

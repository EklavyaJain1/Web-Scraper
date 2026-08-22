import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let currentPhi = 0;
    
    if (!canvasRef.current) return;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 640,
      height: 640,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.94, 0.95, 0.97],
      markerColor: [0.0, 0.4, 1.0],
      glowColor: [1.0, 1.0, 1.0],
      markers: [
        { location: [37.7595, -122.4367], size: 0.08 },
        { location: [51.5072, 0.1276], size: 0.07 },
        { location: [20.5937, 78.9629], size: 0.09 },
        { location: [35.6762, 139.6503], size: 0.07 },
        { location: [51.1657, 10.4515], size: 0.07 },
        { location: [40.7128, -74.0060], size: 0.1 }, // NY
        { location: [-33.8688, 151.2093], size: 0.08 }, // Sydney
        { location: [1.3521, 103.8198], size: 0.08 }, // Singapore
        { location: [-23.5505, -46.6333], size: 0.09 }, // Sao Paulo
        { location: [48.8566, 2.3522], size: 0.07 }, // Paris
        { location: [55.7558, 37.6173], size: 0.07 }, // Moscow
        { location: [28.6139, 77.2090], size: 0.08 }, // New Delhi
        { location: [-1.2921, 36.8219], size: 0.07 }, // Nairobi
        { location: [30.0444, 31.2357], size: 0.07 }, // Cairo
      ],
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          currentPhi += 0.005;
        }
        state.phi = currentPhi + pointerInteractionMovement.current;
      },
    } as any);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] flex items-center justify-center opacity-90">
      <canvas
        ref={canvasRef}
        style={{ width: 320, height: 320, maxWidth: "100%", aspectRatio: 1, cursor: "grab" }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.01;
          }
        }}
      />
    </div>
  );
}

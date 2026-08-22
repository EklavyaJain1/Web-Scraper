import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    
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
        { location: [51.1657, 10.4515], size: 0.07 }
      ],
      onRender: (state: { phi: number }) => {
        state.phi = phi;
        phi += 0.005;
      },
    } as any);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] flex items-center justify-center pointer-events-none opacity-90">
      <canvas
        ref={canvasRef}
        style={{ width: 320, height: 320, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}

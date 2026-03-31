import React, { useEffect, useRef } from 'react';

interface DottedWaveProps {
  mouseX: any;
  mouseY: any;
  scrollY: any;
  opacity?: number;
  className?: string;
}

export const DottedWave: React.FC<DottedWaveProps> = ({ mouseX, mouseY, scrollY, opacity = 1, className = "fixed inset-0 pointer-events-none z-[-1]" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const dotSpacing = 28;
      const dotRadius = 0.8;
      const waveAmplitude = 12;
      const waveFrequency = 0.003;
      
      // Get current values from motion values
      const currentScrollY = scrollY.get();
      const currentMouseX = mouseX.get();
      const currentMouseY = mouseY.get();

      // Mouse parallax offsets
      const mouseOffsetX = (currentMouseX - window.innerWidth / 2) * 0.02;
      const mouseOffsetY = (currentMouseY - window.innerHeight / 2) * 0.02;
      
      // Scroll parallax
      const scrollOffset = currentScrollY * -0.05;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';

      // Draw dots with wave effect
      for (let x = -dotSpacing; x < canvas.width + dotSpacing; x += dotSpacing) {
        for (let y = -dotSpacing; y < canvas.height + dotSpacing; y += dotSpacing) {
          // Wave calculation
          // We use both X and Y in the sine function to create a diagonal wave effect
          // and scrollY to animate it.
          const phase = (x * waveFrequency) + (y * waveFrequency) + (currentScrollY * 0.005);
          const waveX = Math.sin(phase) * waveAmplitude;
          const waveY = Math.cos(phase) * waveAmplitude;
          
          const finalX = x + mouseOffsetX + waveX;
          const finalY = y + mouseOffsetY + scrollOffset + waveY;

          ctx.beginPath();
          ctx.arc(finalX, finalY, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, scrollY]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity }}
    />
  );
};

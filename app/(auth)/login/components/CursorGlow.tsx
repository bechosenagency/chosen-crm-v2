'use client';

import React, { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<{ x: number; y: number; life: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Add to trail
      trailRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        life: 1,
      });

      // Limit trail length
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw trail
      trailRef.current = trailRef.current.filter((point) => {
        point.life -= 0.02;

        if (point.life > 0) {
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, 30
          );
          gradient.addColorStop(0, `rgba(201, 169, 97, ${point.life * 0.2})`);
          gradient.addColorStop(1, 'rgba(201, 169, 97, 0)');

          ctx.beginPath();
          ctx.arc(point.x, point.y, 30, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          return true;
        }
        return false;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// Particle-Animation-v2: Subtle floating particles for premium feel
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface ParticleAnimationProps {
  className?: string;
  particleCount?: number;
  color?: string;
}

export function ParticleAnimation({ 
  className = "", 
  particleCount = 30,
  color = "#0066FF" 
}: ParticleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const initializeParticles = useCallback((canvas: HTMLCanvasElement) => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        life: Math.random() * 300 + 100,
        maxLife: Math.random() * 300 + 100
      });
    }
    
    particlesRef.current = particles;
  }, [particleCount]);

  const updateParticles = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Mouse interaction - subtle attraction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 10000;
        particle.vx += dx * force;
        particle.vy += dy * force;
      }
      
      // Apply slight drag
      particle.vx *= 0.995;
      particle.vy *= 0.995;
      
      // Boundary wrapping
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      // Update life
      particle.life -= 1;
      if (particle.life <= 0) {
        // Respawn particle
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
        particle.vx = (Math.random() - 0.5) * 0.3;
        particle.vy = (Math.random() - 0.5) * 0.3;
        particle.life = particle.maxLife;
      }
      
      // Calculate dynamic opacity based on life
      const lifeRatio = particle.life / particle.maxLife;
      const dynamicOpacity = particle.opacity * lifeRatio;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${Math.floor(dynamicOpacity * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
      
      // Draw connections to nearby particles
      particlesRef.current.slice(index + 1).forEach(otherParticle => {
        const dx = otherParticle.x - particle.x;
        const dy = otherParticle.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 80) {
          const opacity = (1 - distance / 80) * 0.1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initializeParticles(canvas);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      updateParticles(canvas, ctx);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initializeParticles, updateParticles]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        background: "transparent",
        willChange: "transform" // Optimize for animations
      }}
    />
  );
}
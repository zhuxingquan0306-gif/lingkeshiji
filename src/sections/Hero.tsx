import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star, Zap } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Starfield animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      opacity: number;
      speed: number;
    }> = [];

    // Create stars
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 2000,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = '#0a0f1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Mouse parallax effect
      const parallaxX = (mousePos.x - centerX) * 0.02;
      const parallaxY = (mousePos.y - centerY) * 0.02;

      stars.forEach((star) => {
        // Move star closer (warp effect)
        star.z -= star.speed * 2;

        // Reset star when it passes camera
        if (star.z <= 0) {
          star.z = 2000;
          star.x = Math.random() * canvas.width - centerX;
          star.y = Math.random() * canvas.height - centerY;
        }

        // Project 3D position to 2D
        const scale = 1000 / (star.z + 1);
        const x = centerX + (star.x + parallaxX) * scale * 0.001;
        const y = centerY + (star.y + parallaxY) * scale * 0.001;

        // Calculate opacity based on distance
        const distanceOpacity = Math.min(1, (2000 - star.z) / 500);
        const finalOpacity = star.opacity * distanceOpacity;

        // Draw star with glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 3);
        gradient.addColorStop(0, `rgba(201, 168, 124, ${finalOpacity})`);
        gradient.addColorStop(0.5, `rgba(0, 212, 170, ${finalOpacity * 0.5})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x, y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core star
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Title animation
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { opacity: 0, rotateY: 90, z: -200 },
          { opacity: 1, rotateY: 0, z: 0, duration: 1.2, stagger: 0.1 },
          0.5
        );
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.0
      );

      // Description
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.2
      );

      // Buttons
      tl.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        1.4
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const titleChars = '灵可世集'.split('');

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/50 via-transparent to-[#0a0f1a]/50" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#c9a87c]/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#00d4aa]/10 blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-[#8b5cf6]/10 blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#c9a87c]/30 mb-8 animate-float">
          <Sparkles className="w-4 h-4 text-[#c9a87c]" />
          <span className="text-sm text-white/80">元宇宙本地生活平台</span>
          <span className="w-1 h-1 rounded-full bg-[#00d4aa]" />
          <span className="text-sm text-[#00d4aa]">基于社区积分</span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6 perspective-1000"
          style={{ perspective: '1000px' }}
        >
          {titleChars.map((char, i) => (
            <span
              key={i}
              className="char inline-block text-gold text-glow-gold preserve-3d"
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-4"
        >
          元宇宙本地生活新纪元
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          基于社区积分的去中心化服务平台，连接服务商与消费者
          <br className="hidden sm:block" />
          社区积分 ≥ 500 即可成为服务商
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#c9a87c] to-[#d4b88d] hover:from-[#d4b88d] hover:to-[#e9d5b5] text-[#0a0f1a] px-8 py-6 text-base font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#c9a87c]/30"
          >
            <Star className="w-5 h-5 mr-2" />
            探索服务
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#00d4aa]/50 text-[#00d4aa] hover:bg-[#00d4aa]/10 px-8 py-6 text-base rounded-full transition-all duration-300 hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2" />
            成为服务商
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {[
            { value: '500+', label: '积分门槛', color: '#c9a87c' },
            { value: '1,200+', label: '认证服务商', color: '#00d4aa' },
            { value: '50,000+', label: '活跃用户', color: '#8b5cf6' },
            { value: '98%', label: '好评率', color: '#c9a87c' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-light mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0f1a] to-transparent" />
    </section>
  );
};

export default Hero;

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portal animation
      gsap.fromTo(
        portalRef.current,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 sm:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0d1420] to-[#0a0f1a]" />

      {/* Portal Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          ref={portalRef}
          className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px]"
        >
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#c9a87c]/20 animate-spin-slow" />

          {/* Middle Ring */}
          <div
            className="absolute inset-8 rounded-full border-2 border-[#00d4aa]/30"
            style={{ animation: 'spin 15s linear infinite reverse' }}
          />

          {/* Inner Ring */}
          <div
            className="absolute inset-16 rounded-full border-2 border-[#8b5cf6]/20"
            style={{ animation: 'spin 10s linear infinite' }}
          />

          {/* Glow */}
          <div className="absolute inset-24 rounded-full bg-gradient-to-br from-[#c9a87c]/20 via-[#00d4aa]/10 to-[#8b5cf6]/20 blur-xl" />

          {/* Center Light */}
          <div className="absolute inset-32 rounded-full bg-gradient-to-br from-[#c9a87c]/30 to-[#00d4aa]/30 animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#c9a87c]/30 mb-8">
          <Sparkles className="w-4 h-4 text-[#c9a87c]" />
          <span className="text-sm text-white/80">开启元宇宙商业之旅</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6">
          成为<span className="text-gold">服务商</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          积累社区积分，在灵可世集开设您的店铺
          <br className="hidden sm:block" />
          连接万千用户，开启元宇宙商业新纪元
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#c9a87c] to-[#d4b88d] hover:from-[#d4b88d] hover:to-[#e9d5b5] text-[#0a0f1a] px-8 py-6 text-base font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#c9a87c]/30"
          >
            <Rocket className="w-5 h-5 mr-2" />
            立即加入
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#00d4aa]/50 text-[#00d4aa] hover:bg-[#00d4aa]/10 px-8 py-6 text-base rounded-full transition-all duration-300 hover:scale-105"
          >
            了解积分规则
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#c9a87c]" />
            <span className="text-sm">零门槛入驻</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00d4aa]" />
            <span className="text-sm">积分担保交易</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
            <span className="text-sm">元宇宙展示</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

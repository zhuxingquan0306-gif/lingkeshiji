import { useEffect, useRef, useState } from 'react';
import { ChefHat, Scale, Home, Award, ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
}

const features: Feature[] = [
  {
    id: '1',
    title: '元宇宙餐厅',
    subtitle: '虚拟用餐体验',
    description: '在虚拟空间中预览餐厅环境，沉浸式体验菜品展示，提前感受用餐氛围，让每一次外出就餐都成为期待。',
    icon: ChefHat,
    color: '#00d4aa',
    gradient: 'from-[#00d4aa] to-[#00f5c4]',
  },
  {
    id: '2',
    title: '数字律师',
    subtitle: 'AI法律咨询',
    description: '7x24小时在线AI法律助手，快速解答常见法律问题，智能分析合同条款，让法律服务触手可及。',
    icon: Scale,
    color: '#c9a87c',
    gradient: 'from-[#c9a87c] to-[#e9d5b5]',
  },
  {
    id: '3',
    title: '虚拟民宿',
    subtitle: '3D全景看房',
    description: '360度全景展示房源，足不出户即可身临其境般浏览房间细节，提前规划您的每一次出行住宿。',
    icon: Home,
    color: '#8b5cf6',
    gradient: 'from-[#8b5cf6] to-[#a78bfa]',
  },
  {
    id: '4',
    title: '技能NFT',
    subtitle: '认证技能交易',
    description: '将您的专业技能上链认证，打造可验证的技能履历，让每一次服务都值得信赖，构建个人品牌。',
    icon: Award,
    color: '#c9a87c',
    gradient: 'from-[#c9a87c] to-[#d4b88d]',
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % features.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentFeature = features[currentIndex];
  const Icon = currentFeature.icon;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0d1420] to-[#0a0f1a]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, ${currentFeature.color}15 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#8b5cf6]/20 mb-6">
            <span className="text-sm text-[#8b5cf6]">创新体验</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            特色<span className="text-purple">服务</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            融合元宇宙技术，打造前所未有的本地服务体验
          </p>
        </div>

        {/* Feature Carousel */}
        <div ref={carouselRef} className="relative">
          {/* Main Card */}
          <div className="relative p-8 md:p-12 rounded-3xl glass border border-white/10 overflow-hidden">
            {/* Background Gradient */}
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: `linear-gradient(135deg, ${currentFeature.color}10 0%, transparent 60%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Icon & Title */}
              <div>
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${currentFeature.color}30, ${currentFeature.color}10)`,
                    boxShadow: `0 0 40px ${currentFeature.color}40`,
                  }}
                >
                  <Icon className="w-10 h-10" style={{ color: currentFeature.color }} />
                </div>

                <span
                  className="text-sm font-medium mb-2 block"
                  style={{ color: currentFeature.color }}
                >
                  {currentFeature.subtitle}
                </span>

                <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                  {currentFeature.title}
                </h3>

                <p className="text-white/60 leading-relaxed">
                  {currentFeature.description}
                </p>

                <button
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${currentFeature.color}, ${currentFeature.color}dd)`,
                    color: '#0a0f1a',
                    boxShadow: `0 0 20px ${currentFeature.color}40`,
                  }}
                >
                  立即体验
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right: Visual */}
              <div className="relative h-64 md:h-80">
                {/* Abstract Visual */}
                <div
                  className="absolute inset-0 rounded-2xl transition-all duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${currentFeature.color}20, transparent)`,
                    border: `1px solid ${currentFeature.color}30`,
                  }}
                >
                  {/* Floating Elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-32 h-32 rounded-full animate-pulse"
                      style={{
                        background: `radial-gradient(circle, ${currentFeature.color}40 0%, transparent 70%)`,
                      }}
                    />
                  </div>

                  {/* Orbiting Dots */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: currentFeature.color,
                        boxShadow: `0 0 10px ${currentFeature.color}`,
                        top: `${30 + i * 20}%`,
                        left: `${20 + i * 25}%`,
                        animation: `float ${3 + i}s ease-in-out infinite`,
                      }}
                    />
                  ))}

                  {/* Center Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon
                      className="w-24 h-24 opacity-20"
                      style={{ color: currentFeature.color }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-[#c9a87c]/50 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-[#c9a87c] to-[#00d4aa]'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-[#c9a87c]/50 transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

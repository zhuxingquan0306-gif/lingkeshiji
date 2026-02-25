import { useEffect, useRef, useState } from 'react';
import { Shield, Store, Zap, TrendingUp, Lock, Unlock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Points = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const crystalRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const permissions = [
    {
      icon: <Store className="w-5 h-5" />,
      title: '成为服务商',
      description: '在灵可世集开设店铺，提供商品或服务',
      required: 500,
      unlocked: true,
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: '高级委托权限',
      description: '发起更高金额的委托任务',
      required: 1000,
      unlocked: false,
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: '社区治理权',
      description: '参与社区规则制定与投票',
      required: 2000,
      unlocked: false,
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: '优先推荐',
      description: '在灵可世集获得优先展示',
      required: 3000,
      unlocked: false,
    },
  ];

  // Crystal rotation animation
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setRotation((prev) => (prev + (isHovered ? 2 : 0.3)) % 360);
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Crystal animation
      gsap.fromTo(
        crystalRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: crystalRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Permission cards animation
      const cards = sectionRef.current?.querySelectorAll('.permission-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0f0f0f]">
        {/* Particle effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#c9a87c]/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-[#c9a87c] text-sm font-medium tracking-wider uppercase mb-4">
            Community Points
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#e9e4df] mb-6">
            社区积分
          </h2>
          <p className="text-lg text-[#e9e4df]/60 max-w-2xl mx-auto">
            灵可世界的权限基础，使用灵可币即可获得积分
          </p>
        </div>

        {/* Crystal & Stats */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          {/* Crystal */}
          <div className="flex-1 flex justify-center">
            <div
              ref={crystalRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-64 h-64 cursor-pointer"
            >
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-full bg-[#c9a87c]/20 blur-3xl transition-all duration-500"
                style={{
                  transform: `scale(${isHovered ? 1.3 : 1})`,
                  opacity: isHovered ? 0.4 : 0.2,
                }}
              />

              {/* Crystal shape */}
              <div
                className="relative w-full h-full"
                style={{
                  transform: `rotateY(${rotation}deg) rotateX(${rotation * 0.3}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Main crystal */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-40 h-56 relative"
                    style={{
                      background: 'linear-gradient(135deg, rgba(201, 168, 124, 0.4) 0%, rgba(201, 168, 124, 0.1) 50%, rgba(201, 168, 124, 0.3) 100%)',
                      clipPath: 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(201, 168, 124, 0.3)',
                    }}
                  >
                    {/* Inner glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-28 bg-[#c9a87c]/30 blur-xl" />
                    </div>
                  </div>
                </div>

                {/* Orbiting stats */}
                <div
                  className="absolute inset-0"
                  style={{ animation: 'spin 20s linear infinite' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 px-3 py-1 rounded-full bg-[#c9a87c]/20 border border-[#c9a87c]/30 text-xs text-[#c9a87c]">
                    500积分
                  </div>
                </div>
                <div
                  className="absolute inset-0"
                  style={{ animation: 'spin 15s linear infinite reverse' }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 px-3 py-1 rounded-full bg-[#c9a87c]/20 border border-[#c9a87c]/30 text-xs text-[#c9a87c]">
                    权限解锁
                  </div>
                </div>
              </div>

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-3xl font-light text-[#c9a87c]">500</div>
                  <div className="text-xs text-[#e9e4df]/60">积分门槛</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Info */}
          <div className="flex-1 space-y-6">
            <div className="p-6 rounded-2xl bg-[#1a1a1a]/60 border border-[#c9a87c]/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#c9a87c]/20 flex items-center justify-center text-[#c9a87c]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-[#e9e4df]">积分获取</h3>
              </div>
              <p className="text-sm text-[#e9e4df]/60 leading-relaxed">
                每次使用灵可币都会产生社区积分。发起委托、接受委托、追加币池，
                所有使用灵可币的行为都会积累积分，成为你在灵可世界中的身份象征。
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1a1a]/60 border border-[#c9a87c]/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#c9a87c]/20 flex items-center justify-center text-[#c9a87c]">
                  <Unlock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium text-[#e9e4df]">权限体系</h3>
              </div>
              <p className="text-sm text-[#e9e4df]/60 leading-relaxed">
                积分是灵可世界的权限基础。达到500积分即可在灵可世集成为服务商，
                更高积分将解锁更多高级功能和社区治理权限。
              </p>
            </div>
          </div>
        </div>

        {/* Permission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {permissions.map((perm, index) => (
            <div
              key={index}
              className={`permission-card p-5 rounded-xl border transition-all duration-500 ${
                perm.unlocked
                  ? 'bg-[#c9a87c]/10 border-[#c9a87c]/30'
                  : 'bg-[#1a1a1a]/60 border-[#c9a87c]/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    perm.unlocked ? 'bg-[#c9a87c] text-[#1a1a1a]' : 'bg-[#c9a87c]/20 text-[#c9a87c]/50'
                  }`}
                >
                  {perm.icon}
                </div>
                {perm.unlocked ? (
                  <Unlock className="w-4 h-4 text-[#c9a87c]" />
                ) : (
                  <Lock className="w-4 h-4 text-[#e9e4df]/30" />
                )}
              </div>
              <h4
                className={`text-sm font-medium mb-1 ${
                  perm.unlocked ? 'text-[#e9e4df]' : 'text-[#e9e4df]/50'
                }`}
              >
                {perm.title}
              </h4>
              <p
                className={`text-xs mb-3 ${
                  perm.unlocked ? 'text-[#e9e4df]/60' : 'text-[#e9e4df]/30'
                }`}
              >
                {perm.description}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`h-1 flex-1 rounded-full overflow-hidden ${
                    perm.unlocked ? 'bg-[#c9a87c]/20' : 'bg-[#e9e4df]/10'
                  }`}
                >
                  <div
                    className="h-full rounded-full bg-[#c9a87c] transition-all duration-1000"
                    style={{ width: perm.unlocked ? '100%' : '0%' }}
                  />
                </div>
                <span
                  className={`text-xs ${
                    perm.unlocked ? 'text-[#c9a87c]' : 'text-[#e9e4df]/30'
                  }`}
                >
                  {perm.required}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Points;

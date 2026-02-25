import { useEffect, useRef, useState } from 'react';
import { User, Crown, Store, Check, Lock, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Level {
  id: string;
  name: string;
  points: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  permissions: string[];
  locked: boolean;
}

const levels: Level[] = [
  {
    id: '1',
    name: '普通用户',
    points: 0,
    icon: User,
    color: '#ffffff',
    bgColor: 'rgba(255, 255, 255, 0.1)',
    permissions: ['浏览服务', '下单消费', '发表评价', '收藏店铺'],
    locked: false,
  },
  {
    id: '2',
    name: '高级用户',
    points: 100,
    icon: Crown,
    color: '#00d4aa',
    bgColor: 'rgba(0, 212, 170, 0.15)',
    permissions: ['优先推荐', '专属优惠', '会员活动', '积分加速'],
    locked: false,
  },
  {
    id: '3',
    name: '认证服务商',
    points: 500,
    icon: Store,
    color: '#c9a87c',
    bgColor: 'rgba(201, 168, 124, 0.2)',
    permissions: ['开设店铺', '发布服务', '获得收益', '品牌认证'],
    locked: true,
  },
];

const PointsSystem = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const pyramidRef = useRef<HTMLDivElement>(null);
  const [currentPoints] = useState(320);

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

      // Pyramid animation
      const levels = pyramidRef.current?.querySelectorAll('.level-card');
      levels?.forEach((level, index) => {
        gsap.fromTo(
          level,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pyramidRef.current,
              start: 'top 70%',
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-[#0d1218] to-[#0a0f1a]" />

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a87c]/5 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#c9a87c]/20 mb-6">
            <span className="text-sm text-[#c9a87c]">积分体系</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            积分即<span className="text-gold">权限</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            在灵可世集，社区积分决定你的角色与权限
          </p>
        </div>

        {/* Current Points Display */}
        <div className="mb-12 text-center">
          <div className="inline-flex flex-col items-center p-8 rounded-3xl glass border border-[#c9a87c]/30">
            <span className="text-sm text-white/50 mb-2">我的社区积分</span>
            <div className="flex items-center gap-3">
              <span className="text-5xl font-light text-gold">{currentPoints}</span>
              <span className="text-lg text-white/50">/ 500</span>
            </div>
            <div className="mt-4 w-64 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#c9a87c] to-[#00d4aa] transition-all duration-1000"
                style={{ width: `${(currentPoints / 500) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-[#00d4aa]">
              还需 {500 - currentPoints} 积分即可成为服务商
            </p>
          </div>
        </div>

        {/* Pyramid Levels */}
        <div ref={pyramidRef} className="space-y-4">
          {levels.map((level, index) => {
            const Icon = level.icon;
            const isUnlocked = currentPoints >= level.points;
            const widthClass =
              index === 0 ? 'w-full' : index === 1 ? 'w-5/6 mx-auto' : 'w-4/6 mx-auto';

            return (
              <div
                key={level.id}
                className={`level-card ${widthClass}`}
              >
                <div
                  className={`relative p-6 rounded-2xl border transition-all duration-500 ${
                    isUnlocked
                      ? 'border-[#c9a87c]/50 bg-[#0f1419]'
                      : 'border-white/10 bg-[#0a0f1a]/60'
                  }`}
                  style={{
                    boxShadow: isUnlocked ? `0 0 30px ${level.color}30` : 'none',
                  }}
                >
                  {/* Glow Effect */}
                  {isUnlocked && (
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${level.color}15 0%, transparent 70%)`,
                      }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-6">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: level.bgColor,
                        boxShadow: isUnlocked ? `0 0 20px ${level.color}40` : 'none',
                      }}
                    >
                      {isUnlocked ? (
                        <Icon className="w-8 h-8" style={{ color: level.color }} />
                      ) : (
                        <Lock className="w-8 h-8 text-white/30" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className="text-xl font-medium"
                          style={{ color: isUnlocked ? level.color : 'rgba(255,255,255,0.5)' }}
                        >
                          {level.name}
                        </h3>
                        <span
                          className="px-2 py-0.5 text-xs rounded-full"
                          style={{
                            backgroundColor: isUnlocked ? `${level.color}20` : 'rgba(255,255,255,0.1)',
                            color: isUnlocked ? level.color : 'rgba(255,255,255,0.4)',
                          }}
                        >
                          {level.points} 积分
                        </span>
                      </div>

                      {/* Permissions */}
                      <div className="flex flex-wrap gap-2">
                        {level.permissions.map((perm, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5"
                          >
                            {isUnlocked && (
                              <Check className="w-3 h-3 text-[#00d4aa]" />
                            )}
                            <span
                              className="text-sm"
                              style={{
                                color: isUnlocked ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
                              }}
                            >
                              {perm}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex-shrink-0">
                      {isUnlocked ? (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4aa]/20 text-[#00d4aa]">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">已解锁</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/40">
                          <Lock className="w-4 h-4" />
                          <span className="text-sm">未解锁</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c9a87c] to-[#d4b88d] text-[#0a0f1a] font-medium hover:shadow-lg hover:shadow-[#c9a87c]/30 transition-all duration-300">
            了解积分获取方式
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PointsSystem;

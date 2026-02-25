import { useEffect, useRef, useState } from 'react';
import { Mail, HandCoins, Wallet, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  index: number;
  isActive: boolean;
  onHover: () => void;
}

const MechanismCard = ({ icon, title, description, details, index, isActive, onHover }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onMouseEnter={onHover}
      className={`relative group cursor-pointer transition-all duration-700 ease-out ${
        isActive ? 'flex-[2]' : 'flex-1'
      }`}
      style={{
        transform: isActive ? 'translateY(-10px)' : 'translateY(0)',
      }}
    >
      <div
        className={`relative h-full min-h-[400px] rounded-2xl overflow-hidden border transition-all duration-500 ${
          isActive
            ? 'border-[#c9a87c]/50 bg-gradient-to-br from-[#c9a87c]/20 to-[#1a1a1a]'
            : 'border-[#c9a87c]/20 bg-[#1a1a1a]/80'
        }`}
      >
        {/* Glow Effect */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(201, 168, 124, 0.3) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Icon */}
          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
              isActive ? 'bg-[#c9a87c] scale-110' : 'bg-[#c9a87c]/20'
            }`}
          >
            <div className={isActive ? 'text-[#1a1a1a]' : 'text-[#c9a87c]'}>{icon}</div>
          </div>

          {/* Index */}
          <div className="text-[#c9a87c]/40 text-sm font-medium mb-2">0{index + 1}</div>

          {/* Title */}
          <h3 className="text-2xl font-medium text-[#e9e4df] mb-4">{title}</h3>

          {/* Description */}
          <p className="text-[#e9e4df]/60 text-sm leading-relaxed mb-6">{description}</p>

          {/* Details - Only show when active */}
          <div
            className={`flex-1 transition-all duration-500 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <ul className="space-y-3">
              {details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#e9e4df]/70">
                  <ChevronRight className="w-4 h-4 text-[#c9a87c] mt-0.5 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Line */}
          <div
            className={`mt-auto pt-6 border-t transition-colors duration-500 ${
              isActive ? 'border-[#c9a87c]/30' : 'border-[#c9a87c]/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#e9e4df]/40">了解更多</span>
              <ChevronRight
                className={`w-5 h-5 transition-all duration-500 ${
                  isActive ? 'text-[#c9a87c] translate-x-1' : 'text-[#e9e4df]/30'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Mechanism = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const mechanisms = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: '邀请准入',
      description: '功值达到500，获得专属邀请资格，成为灵可社区正式用户。',
      details: [
        '在善行天下记录善行，积累功值',
        '功值达500自动触发邀请机制',
        '获得专属邀请码，激活社区权限',
        '成为正式用户，开启互助之旅',
      ],
    },
    {
      icon: <HandCoins className="w-8 h-8" />,
      title: '委托互助',
      description: '使用灵可币发起委托，社区成员互助完成，实现价值流转。',
      details: [
        '发起委托：设定任务内容与币池金额',
        '接受委托：社区成员选择并接受委托',
        '完成任务：按委托要求执行并提交',
        '确认结算：委托方确认，奖励发放',
      ],
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: '币池奖励',
      description: '委托完成后，接受者获得币池中的灵可币奖励，激励互助行为。',
      details: [
        '币池由发起者设定的灵可币数量决定',
        '无人接受时，其他用户可追加币池',
        '委托完成后，奖励自动转入接受者钱包',
        '使用灵可币同时产生社区积分',
      ],
    },
  ];

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#c9a87c]/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block text-[#c9a87c] text-sm font-medium tracking-wider uppercase mb-4">
            Community Mechanism
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#e9e4df] mb-6">
            社区机制
          </h2>
          <p className="text-lg text-[#e9e4df]/60 max-w-2xl mx-auto">
            三大核心机制构建完整的互助生态，让每一份善意都能流转价值
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-6">
          {mechanisms.map((mechanism, index) => (
            <MechanismCard
              key={index}
              {...mechanism}
              index={index}
              isActive={activeCard === index}
              onHover={() => setActiveCard(index)}
            />
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass border border-[#c9a87c]/20">
            <div className="w-2 h-2 rounded-full bg-[#c9a87c] animate-pulse" />
            <span className="text-sm text-[#e9e4df]/70">
              社区积分是灵可世界的权限基础
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mechanism;

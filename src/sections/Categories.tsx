import { useEffect, useRef, useState } from 'react';
import {
  Utensils,
  Hotel,
  Scale,
  GraduationCap,
  Heart,
  Home,
  Wrench,
  Scissors,
  ArrowRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  count: number;
  color: string;
  subcategories: string[];
}

const categories: Category[] = [
  {
    id: '1',
    name: '餐饮美食',
    icon: Utensils,
    count: 328,
    color: '#00d4aa',
    subcategories: ['中餐', '西餐', '快餐', '甜品'],
  },
  {
    id: '2',
    name: '住宿酒店',
    icon: Hotel,
    count: 156,
    color: '#c9a87c',
    subcategories: ['酒店', '民宿', '青旅', '短租'],
  },
  {
    id: '3',
    name: '法律服务',
    icon: Scale,
    count: 89,
    color: '#8b5cf6',
    subcategories: ['咨询', '诉讼', '合同', '知识产权'],
  },
  {
    id: '4',
    name: '教育培训',
    icon: GraduationCap,
    count: 245,
    color: '#00d4aa',
    subcategories: ['K12', '语言', '技能', '兴趣'],
  },
  {
    id: '5',
    name: '医疗健康',
    icon: Heart,
    count: 178,
    color: '#c9a87c',
    subcategories: ['诊所', '体检', '康复', '心理咨询'],
  },
  {
    id: '6',
    name: '家政服务',
    icon: Home,
    count: 134,
    color: '#8b5cf6',
    subcategories: ['保洁', '保姆', '月嫂', '养老'],
  },
  {
    id: '7',
    name: '数码维修',
    icon: Wrench,
    count: 267,
    color: '#00d4aa',
    subcategories: ['手机', '电脑', '家电', '网络'],
  },
  {
    id: '8',
    name: '美容美发',
    icon: Scissors,
    count: 198,
    color: '#c9a87c',
    subcategories: ['理发', '美容', '美甲', 'SPA'],
  },
];

const Categories = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

      // Cards animation
      const cards = gridRef.current?.querySelectorAll('.category-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: index * 0.08,
            ease: 'back.out(1.7)',
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
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 168, 124, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 168, 124, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00d4aa]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
            <span className="text-sm text-[#00d4aa]">8大服务类别</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            服务分类<span className="text-cyan">星云</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            探索多元化的本地服务，满足您生活的方方面面
          </p>
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="category-card group"
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer h-full ${
                    hoveredId === category.id
                      ? 'border-[#c9a87c]/50 bg-[#0f1419]'
                      : 'border-white/10 bg-[#0a0f1a]/60'
                  }`}
                  style={{
                    boxShadow:
                      hoveredId === category.id
                        ? `0 0 30px ${category.color}30`
                        : 'none',
                  }}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                      hoveredId === category.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${category.color}15 0%, transparent 70%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${category.color}20`,
                        boxShadow: `0 0 20px ${category.color}30`,
                      }}
                    >
                      <Icon
                        className="w-6 h-6 transition-colors"
                        style={{ color: category.color }}
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-medium text-white mb-1 group-hover:text-[#c9a87c] transition-colors">
                      {category.name}
                    </h3>

                    {/* Count */}
                    <p className="text-sm text-white/50 mb-3">
                      {category.count} 家服务商
                    </p>

                    {/* Subcategories */}
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.map((sub, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs rounded"
                          style={{
                            backgroundColor: `${category.color}10`,
                            color: `${category.color}cc`,
                          }}
                        >
                          {sub}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center justify-end">
                      <ArrowRight
                        className={`w-5 h-5 transition-all duration-300 ${
                          hoveredId === category.id
                            ? 'text-[#c9a87c] translate-x-1'
                            : 'text-white/20'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;

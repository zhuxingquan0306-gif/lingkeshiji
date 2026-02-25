import { useEffect, useRef } from 'react';
import { FileText, UserCheck, Trophy, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  const steps = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: '发起委托',
      description: '使用灵可币发起委托，设定任务内容与币池金额。委托可以针对自己、他人或其他事物。',
      features: ['设定委托内容', '确定币池金额', '发布到社区'],
      align: 'left',
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: '接受委托',
      description: '社区成员浏览委托列表，选择并接受自己能够完成的委托任务。',
      features: ['浏览委托列表', '选择合适委托', '执行任务内容'],
      align: 'right',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: '获得奖励',
      description: '委托完成后，接受者获得币池中的全部灵可币奖励，同时产生社区积分。',
      features: ['委托方确认完成', '自动发放奖励', '产生社区积分'],
      align: 'left',
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

      // Line drawing animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        });
      }

      // Step cards animation
      const stepCards = stepsRef.current?.querySelectorAll('.step-card');
      stepCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#1a1a1a] to-[#0f0f0f]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="inline-block text-[#c9a87c] text-sm font-medium tracking-wider uppercase mb-4">
            Delegation Process
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#e9e4df] mb-6">
            委托流程
          </h2>
          <p className="text-lg text-[#e9e4df]/60 max-w-2xl mx-auto">
            简单三步，完成委托互助，实现价值流转
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connecting Line - Desktop */}
          <svg
            className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 hidden lg:block"
            viewBox="0 0 4 800"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M 2 0 L 2 800"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c9a87c" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#c9a87c" stopOpacity="1" />
                <stop offset="100%" stopColor="#c9a87c" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step-card relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  step.align === 'right' ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div
                  className={`flex-1 ${step.align === 'right' ? 'lg:text-right' : 'lg:text-left'}`}
                >
                  <div
                    className={`inline-flex flex-col p-8 rounded-2xl bg-[#1a1a1a]/80 border border-[#c9a87c]/20 backdrop-blur-sm transition-all duration-500 hover:border-[#c9a87c]/40 hover:bg-[#1a1a1a] max-w-lg ${
                      step.align === 'right' ? 'lg:ml-auto' : 'lg:mr-auto'
                    }`}
                  >
                    {/* Step Number & Icon */}
                    <div
                      className={`flex items-center gap-4 mb-4 ${
                        step.align === 'right' ? 'lg:flex-row-reverse' : ''
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#c9a87c]/20 flex items-center justify-center text-[#c9a87c]">
                        {step.icon}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#c9a87c]/40 text-sm font-medium">
                          STEP 0{index + 1}
                        </span>
                        <div className="h-px w-8 bg-[#c9a87c]/30" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-medium text-[#e9e4df] mb-3">{step.title}</h3>

                    {/* Description */}
                    <p className="text-[#e9e4df]/60 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Features */}
                    <div
                      className={`flex flex-wrap gap-2 ${
                        step.align === 'right' ? 'lg:justify-end' : ''
                      }`}
                    >
                      {step.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-[#c9a87c]/10 text-[#c9a87c]/80 border border-[#c9a87c]/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center Node - Desktop */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#c9a87c]/20 animate-ping" />
                    <div className="relative w-12 h-12 rounded-full bg-[#c9a87c] flex items-center justify-center">
                      <span className="text-[#1a1a1a] font-medium">{index + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="flex-1 flex justify-center lg:justify-start">
                  <div
                    className={`w-32 h-32 rounded-2xl bg-gradient-to-br from-[#c9a87c]/20 to-transparent flex items-center justify-center ${
                      step.align === 'right' ? 'lg:mr-auto' : 'lg:ml-auto'
                    }`}
                  >
                    <div className="text-[#c9a87c]/30">{step.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final Arrow */}
          <div className="flex justify-center mt-16">
            <div className="flex items-center gap-4 text-[#c9a87c]/60">
              <span className="text-sm">循环往复</span>
              <ArrowRight className="w-5 h-5" />
              <span className="text-sm">价值永续</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

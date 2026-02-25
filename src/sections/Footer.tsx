import { Github, Twitter, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    ecosystem: [
      { name: '善行天下', href: '#' },
      { name: '灵可币', href: '#' },
      { name: '灵可社区', href: '#' },
      { name: '灵可世集', href: '#' },
    ],
    services: [
      { name: '餐饮美食', href: '#' },
      { name: '住宿酒店', href: '#' },
      { name: '法律服务', href: '#' },
      { name: '教育培训', href: '#' },
    ],
    support: [
      { name: '帮助中心', href: '#' },
      { name: '积分规则', href: '#' },
      { name: '服务商指南', href: '#' },
      { name: '联系我们', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <MessageCircle className="w-5 h-5" />, href: '#', label: 'Discord' },
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
    { icon: <Mail className="w-5 h-5" />, href: '#', label: 'Email' },
  ];

  return (
    <footer className="relative w-full bg-[#050810] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a87c] to-[#00d4aa] flex items-center justify-center">
                <span className="text-[#0a0f1a] font-bold text-xl">世</span>
              </div>
              <div>
                <span className="text-2xl font-light text-white">灵可世集</span>
                <p className="text-xs text-white/40">元宇宙本地生活平台</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-sm">
              基于社区积分的去中心化服务平台，连接服务商与消费者，
              开启元宇宙本地生活新纪元。
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#c9a87c] hover:border-[#c9a87c]/40 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">
              生态系统
            </h4>
            <ul className="space-y-3">
              {footerLinks.ecosystem.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[#c9a87c] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">
              服务分类
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[#c9a87c] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">
              支持
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[#c9a87c] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {currentYear} 灵可世集. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-white/30 hover:text-[#c9a87c] transition-colors duration-300"
            >
              隐私政策
            </a>
            <a
              href="#"
              className="text-xs text-white/30 hover:text-[#c9a87c] transition-colors duration-300"
            >
              服务条款
            </a>
            <a
              href="#"
              className="text-xs text-white/30 hover:text-[#c9a87c] transition-colors duration-300"
            >
              Cookie设置
            </a>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a87c]/30 to-transparent" />
    </footer>
  );
};

export default Footer;

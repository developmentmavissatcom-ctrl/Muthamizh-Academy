import React from 'react';
import { NavTab } from '../types';
import { MuthamizhLogo } from './MuthamizhLogo';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  GraduationCap, 
  ArrowRight,
  Radio
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenAstra?: () => void;
  onOpenApplyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenApplyModal
}) => {
  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 bg-[#060907] border-t border-[#16241f] text-[#8a9690] text-xs py-12 px-4 sm:px-6 lg:px-8 xl:px-12 w-full font-sans">
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-[#16241f]">
          
          {/* Col 1: Brand & Institution Overview */}
          <div className="space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="text-left focus:outline-none group block"
              aria-label="Muthamizh Academy Home"
            >
              <MuthamizhLogo size="md" showSubtext={true} />
            </a>

            <p className="text-[12px] text-[#9bb0a5] leading-relaxed">
              Muthamizh Academy is a premier media & cinema institution operating in direct partnership with <strong className="text-[#f5f7f6]">Mavis Satcom Limited (Jaya TV Network)</strong>, offering immersive satellite broadcast floor training and modern digital production programs.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0b100e] border border-[#16241f] text-[11px] font-mono text-[#00c878]">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#00c878]" />
              <span>Admissions Open • 2026 Batch</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#f5f7f6] uppercase tracking-wider">
              Academy Navigation
            </h4>
            <ul className="space-y-2 text-[12px] text-[#9bb0a5]">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('home');
                  }}
                  className="hover:text-[#00c878] transition-colors text-left block"
                >
                  Home Studio
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('courses');
                  }}
                  className="hover:text-[#00c878] transition-colors text-left block"
                >
                  Academic Programs & Syllabus
                </a>
              </li>
              <li>
                <a
                  href="/campus"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('campus');
                  }}
                  className="hover:text-[#00c878] transition-colors text-left block"
                >
                  Campus Life & Studio Floors
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('gallery');
                  }}
                  className="hover:text-[#00c878] transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Studio & Campus Gallery</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#00c878]/15 text-[#00c878] rounded">New</span>
                </a>
              </li>
              <li>
                <a
                  href="/faculty"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('faculty');
                  }}
                  className="hover:text-[#00c878] transition-colors text-left block"
                >
                  Faculty & Jaya TV Mentors
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about');
                  }}
                  className="hover:text-[#00c878] transition-colors text-left block"
                >
                  About Muthamizh Academy
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Curricula & Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#f5f7f6] uppercase tracking-wider">
              Featured Programs
            </h4>
            <ul className="space-y-2 text-[12px] text-[#9bb0a5]">
              <li>
                <a
                  href="/courses"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('courses');
                  }}
                  className="hover:text-[#e6ad54] transition-colors text-left line-clamp-1 block"
                >
                  Broadcast Cinematography & Multi-Cam Rigs
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('courses');
                  }}
                  className="hover:text-[#e6ad54] transition-colors text-left line-clamp-1 block"
                >
                  Television Direction & PCR Control
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('courses');
                  }}
                  className="hover:text-sky-400 transition-colors text-left line-clamp-1 block"
                >
                  AI-Assisted Software Dev & Agentic Eng (Online)
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('courses');
                  }}
                  className="hover:text-sky-400 transition-colors text-left line-clamp-1 block"
                >
                  Enterprise IT Support & Cisco Cloud (Online)
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('courses');
                  }}
                  className="hover:text-sky-400 transition-colors text-left line-clamp-1 block"
                >
                  Media Law, Ethics & Copyright (Online)
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('courses');
                  }}
                  className="hover:text-[#e6ad54] transition-colors text-left line-clamp-1 block"
                >
                  Sound Engineering & Multi-Track Mixing
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact & Admissions Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#f5f7f6] uppercase tracking-wider">
              Campus & Admissions Desk
            </h4>
            
            <div className="space-y-2.5 text-[12px] text-[#9bb0a5]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00c878] shrink-0 mt-0.5" />
                <span>Kalaimagal Nagar, Ekkattuthangal, Chennai, Tamil Nadu - 600032</span>
              </div>

              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#00c878] shrink-0" />
                <div className="font-mono text-[#f5f7f6] text-[11px]">
                  <a href="tel:+919840183192" className="hover:text-[#00c878] transition-colors">
                    +91 9840183192
                  </a>
                  <span className="mx-1 text-[#8a9690]">/</span>
                  <a href="tel:+917092348721" className="hover:text-[#00c878] transition-colors">
                    +91 7092348721
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00c878] shrink-0" />
                <a 
                  href="mailto:admissions@muthamizhacademy.com" 
                  className="hover:text-[#f5f7f6] transition-colors font-mono text-[11px]"
                >
                  admissions@muthamizhacademy.com
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[11px] text-[#8a9690] font-mono">
                <Clock className="w-3.5 h-3.5 text-[#e6ad54] shrink-0" />
                <span>Mon – Sat: 9:00 AM – 6:00 PM IST</span>
              </div>
            </div>

            {onOpenApplyModal && (
              <div className="pt-2">
                <button
                  onClick={onOpenApplyModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-all font-mono"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Apply for 2026 Batch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Subtle Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8a9690]">
          <div>
            © 2026 Muthamizh Academy Private Limited & Mavis Satcom Limited (Jaya TV Network). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/courses"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('courses');
              }}
              className="hover:text-[#f5f7f6] transition-colors"
            >
              Curricula
            </a>
            <span>•</span>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className="hover:text-[#f5f7f6] transition-colors"
            >
              About
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};


import React from 'react';
import { NavTab } from '../types';
import { 
  Tv, 
  Cpu, 
  Film, 
  Radio, 
  Code, 
  Network, 
  CheckCircle2, 
  ArrowRight, 
  Layers,
  GraduationCap,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface AcademyPositioningSectionProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenApplyModal: (courseTitle?: string) => void;
}

export const AcademyPositioningSection: React.FC<AcademyPositioningSectionProps> = ({
  onNavigateTab,
  onOpenApplyModal
}) => {
  return (
    <section 
      id="academy-positioning" 
      className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 w-full bg-[#050706] border-t border-[#16241f] text-[#f5f7f6]"
    >
      <div className="w-full max-w-[1920px] mx-auto space-y-12">
        
        {/* Core Introductory Statement */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121a17] border border-[#00c878]/30 text-[#00c878] text-xs font-mono font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#00c878]" />
            <span>Chennai, Tamil Nadu • Practical Industry Training</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f5f7f6] tracking-tight font-sans">
            Media &amp; IT Education in Chennai
          </h2>

          <p className="text-base sm:text-lg text-[#9bb0a5] leading-relaxed">
            Muthamizh Academy is a Chennai-based education academy offering practical learning in media, television, digital media and IT.
          </p>

          <p className="text-xs sm:text-sm text-[#8a9690] leading-relaxed">
            Partnered with Mavis Satcom Limited (Jaya TV Network), our curriculum combines hands-on broadcast floor production with high-demand software engineering, practical computer networking &amp; IT support, and software quality testing disciplines designed for immediate career readiness.
          </p>
        </div>

        {/* Dual Pillar Comparison Grid: Media vs IT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Pillar 1: Media & Digital Media Education */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0b100e] to-[#070b09] border border-[#16241f] hover:border-[#00c878]/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#00c878] px-3 py-1 rounded-full bg-[#00c878]/10 border border-[#00c878]/20 font-bold">
                  Satellite Studio Floors
                </span>
                <span className="text-xs font-mono text-[#8a9690]">
                  Jaya TV Floor 1 &amp; 2
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#f5f7f6] font-sans flex items-center gap-3">
                  <Tv className="w-6 h-6 text-[#00c878]" />
                  <span>Media &amp; Digital Media Education</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#8a9690] leading-relaxed">
                  Immersive television, film, and digital broadcasting education conducted inside active satellite television studios in Chennai. Students gain practical experience operating industry-standard broadcast cameras, live vision mixers, newsroom teleprompters, and audio mastering suites.
                </p>
              </div>

              {/* Supported Media Subjects */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold text-[#e6ad54] uppercase tracking-wider">
                  Supported Media Subjects &amp; Practical Areas:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#d1dcd6]">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#121a17] border border-[#16241f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />
                    <span>Television &amp; Live Anchoring</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#121a17] border border-[#16241f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />
                    <span>Broadcasting &amp; PCR Suite</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#121a17] border border-[#16241f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />
                    <span>Digital Media &amp; Journalism</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#121a17] border border-[#16241f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />
                    <span>Media Production Operations</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#121a17] border border-[#16241f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />
                    <span>Cinematography &amp; Camera Rigs</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#121a17] border border-[#16241f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />
                    <span>Television Direction &amp; PTC</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#121a17] border border-[#16241f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />
                    <span>Sound &amp; Audio Mixing</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#121a17] border border-[#16241f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />
                    <span>Media Technology &amp; OB Van</span>
                  </div>
                </div>
              </div>

              {/* Active Confirmed Program */}
              <div className="p-3.5 rounded-2xl bg-[#121a17]/80 border border-[#00c878]/30 space-y-1.5">
                <span className="text-[10px] font-mono text-[#00c878] uppercase font-bold tracking-wider">
                  Featured Program
                </span>
                <div className="text-xs font-bold text-[#f5f7f6]">
                  Television News Reading, Anchoring &amp; Digital Journalism
                </div>
                <div className="text-[11px] text-[#8a9690]">
                  Flexible 2-Week Fast-Track, 4-Week Professional Diploma, and Weekend tracks with live studio teleprompter practice.
                </div>
              </div>
            </div>

            {/* Pillar 1 Footer Links */}
            <div className="pt-6 mt-6 border-t border-[#16241f] flex flex-wrap items-center justify-between gap-3">
              <a
                href="/courses"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTab('courses');
                }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00c878] hover:text-[#00e087] transition-colors"
              >
                <span>Explore Media &amp; Television Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="/campus"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTab('campus');
                }}
                className="text-xs text-[#8a9690] hover:text-[#f5f7f6] transition-colors"
              >
                Studio Floor Infrastructure
              </a>
            </div>
          </div>

          {/* Pillar 2: IT & Digital Technology Education */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0b100e] to-[#070b09] border border-[#16241f] hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 px-3 py-1 rounded-full bg-sky-950/40 border border-sky-800/40 font-bold">
                  Software &amp; Network Engineering
                </span>
                <span className="text-xs font-mono text-[#8a9690]">
                  Online &amp; Hardware Labs
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#f5f7f6] font-sans flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-sky-400" />
                  <span>IT &amp; Digital Technology Education</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#8a9690] leading-relaxed">
                  Rigorous, industry-oriented IT and software education in Chennai. Curricula focus on confirmed, production-grade computer science domains with modern development tools, real hardware routing, and comprehensive software testing methodologies.
                </p>
              </div>

              {/* Confirmed Active IT Courses */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                  Confirmed Active IT Curricula &amp; Training:
                </h4>
                
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-[#121a17] border border-[#16241f] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#f5f7f6]">
                        AI-Assisted Software Development &amp; Full Stack
                      </span>
                      <span className="text-[10px] font-mono text-sky-400 px-2 py-0.5 rounded bg-sky-950/50">Online Labs</span>
                    </div>
                    <p className="text-[11px] text-[#8a9690] leading-relaxed">
                      Full Stack web development (React, Next.js, TypeScript, PostgreSQL), AI coding tools (Cursor, Claude Code, Copilot), autonomous agents, MCP (Model Context Protocol), and RAG pipelines.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#121a17] border border-[#16241f] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#f5f7f6]">
                        Practical Computer Networking &amp; IT Support Engineering
                      </span>
                      <span className="text-[10px] font-mono text-[#00c878] px-2 py-0.5 rounded bg-[#00c878]/15">Hybrid Lab</span>
                    </div>
                    <p className="text-[11px] text-[#8a9690] leading-relaxed">
                      Comprehensive practical networking training for your future in networking and IT support work. Master switching, VLANs, IP subnetting, dynamic routing, enterprise firewalls, and 10 days of hands-on training with real-time firewalls, enterprise routers, managed switches, and cabling at the Jaya TV office in Chennai.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#121a17] border border-[#16241f] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#f5f7f6]">
                        Manual Software Testing &amp; QA
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-950/50">Live Online</span>
                    </div>
                    <p className="text-[11px] text-[#8a9690] leading-relaxed">
                      Software Testing Life Cycle (STLC), web application testing, test case design, defect management with Jira, regression testing, and real-time project quality assurance.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#121a17] border border-[#16241f] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#f5f7f6]">
                        TallyPrime + GST Crash Course (Practical Accounts &amp; GST)
                      </span>
                      <span className="text-[10px] font-mono text-[#e6ad54] px-2 py-0.5 rounded bg-[#e6ad54]/15">8 Days (16 Hrs)</span>
                    </div>
                    <p className="text-[11px] text-[#8a9690] leading-relaxed">
                      100% practical, confidence-building training in accounting golden rules, financial statements, TallyPrime voucher and inventory workflows, bank reconciliation, and practical GST registration &amp; return filing (GSTR-1 &amp; GSTR-3B).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2 Footer Links */}
            <div className="pt-6 mt-6 border-t border-[#16241f] flex flex-wrap items-center justify-between gap-3">
              <a
                href="/courses"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTab('courses');
                }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors"
              >
                <span>Explore IT &amp; Software Training</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => onOpenApplyModal('IT & Software Courses')}
                className="text-xs text-[#00c878] hover:text-[#00e087] transition-colors font-mono font-bold"
              >
                Apply for IT Training
              </button>
            </div>
          </div>

        </div>

        {/* Crawlable Internal Navigation Bar */}
        <div className="p-5 rounded-2xl bg-[#0b100e] border border-[#16241f] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#8a9690] font-mono">
            <span className="text-[#f5f7f6] font-bold">Quick Academy Directory:</span> Browse all institutional departments &amp; portals
          </div>

          <nav className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono">
            <a
              href="/courses"
              onClick={(e) => {
                e.preventDefault();
                onNavigateTab('courses');
              }}
              className="text-[#9bb0a5] hover:text-[#00c878] transition-colors"
            >
              Explore Media &amp; IT Courses
            </a>
            <span className="text-[#16241f]">|</span>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigateTab('about');
              }}
              className="text-[#9bb0a5] hover:text-[#00c878] transition-colors"
            >
              About Muthamizh Academy
            </a>
            <span className="text-[#16241f]">|</span>
            <a
              href="/campus"
              onClick={(e) => {
                e.preventDefault();
                onNavigateTab('campus');
              }}
              className="text-[#9bb0a5] hover:text-[#00c878] transition-colors"
            >
              Studio Floors &amp; Campus
            </a>
            <span className="text-[#16241f]">|</span>
            <a
              href="/faculty"
              onClick={(e) => {
                e.preventDefault();
                onNavigateTab('faculty');
              }}
              className="text-[#9bb0a5] hover:text-[#00c878] transition-colors"
            >
              Faculty &amp; Mentors
            </a>
            <span className="text-[#16241f]">|</span>
            <a
              href="/gallery"
              onClick={(e) => {
                e.preventDefault();
                onNavigateTab('gallery');
              }}
              className="text-[#9bb0a5] hover:text-[#00c878] transition-colors"
            >
              Campus Gallery
            </a>
            <span className="text-[#16241f]">|</span>
            <a
              href="/admissions"
              onClick={(e) => {
                e.preventDefault();
                onOpenApplyModal();
              }}
              className="text-[#00c878] font-bold hover:underline transition-colors"
            >
              Admissions 2026
            </a>
            <span className="text-[#16241f]">|</span>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact-desk');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }
              }}
              className="text-[#e6ad54] hover:underline transition-colors"
            >
              Contact Campus Desk
            </a>
          </nav>
        </div>

      </div>
    </section>
  );
};

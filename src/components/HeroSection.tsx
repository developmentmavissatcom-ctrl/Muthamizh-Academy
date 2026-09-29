import React from 'react';
import { Radio, GraduationCap, ArrowRight, Bot, Shield, CheckCircle2, Tv, Award, Users } from 'lucide-react';

interface HeroSectionProps {
  onOpenAstra: () => void;
  onExploreCourses: () => void;
  onOpenApplyModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAstra,
  onExploreCourses,
  onOpenApplyModal
}) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20 w-full overflow-hidden">
      <div className="relative z-10 w-full max-w-[1920px] mx-auto text-center space-y-8">
        
        {/* Partnership & Admissions Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-2xl animate-fade-in">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Educational Initiative of Mavis Satcom Ltd • Jaya TV Network Partner</span>
          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold border border-amber-500/40">
            Admissions 2026 Open
          </span>
        </div>

        {/* Hero Main Headline */}
        <div className="max-w-5xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-md">
            MUTHAMIZH ACADEMY
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif text-amber-300 font-medium tracking-wide">
            Media & Broadcasting Institute
          </p>
          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed drop-shadow">
            Train inside active, live satellite television broadcast floors. Master multi-cam cinematography, news anchoring, direction, and post-production with Jaya TV senior editors and directors.
          </p>
        </div>

        {/* Hero CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenApplyModal}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base transition-all shadow-xl shadow-emerald-950/80 hover:shadow-emerald-600/30 hover:scale-[1.02] flex items-center gap-2.5 group border border-emerald-400/30"
          >
            <GraduationCap className="w-5 h-5 text-amber-300" />
            <span>Apply for Admissions 2026</span>
            <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreCourses}
            className="px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-100 border border-slate-700/80 hover:border-emerald-500/50 font-bold text-sm sm:text-base transition-all backdrop-blur-md shadow-xl flex items-center gap-2"
          >
            <span>Explore PG Programs</span>
          </button>

          <button
            onClick={onOpenAstra}
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 text-amber-300 border border-amber-500/40 hover:border-amber-400 font-bold text-sm sm:text-base transition-all backdrop-blur-md shadow-xl flex items-center gap-2 group"
          >
            <Bot className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Ask Astra AI Counselor</span>
          </button>
        </div>

        {/* Key Academy Highlights Banner */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left">
            <div className="text-emerald-400 font-black text-2xl sm:text-3xl">100%</div>
            <div className="text-slate-300 font-semibold text-xs sm:text-sm mt-0.5">Jaya TV Studio Internship</div>
            <div className="text-slate-400 text-[11px] mt-1">Guaranteed live production floor training</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left">
            <div className="text-amber-400 font-black text-2xl sm:text-3xl">10,000+</div>
            <div className="text-slate-300 font-semibold text-xs sm:text-sm mt-0.5">Sq.Ft Studio Complex</div>
            <div className="text-slate-400 text-[11px] mt-1">Multi-cam floor & PCR vision consoles</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left">
            <div className="text-emerald-400 font-black text-2xl sm:text-3xl">12+</div>
            <div className="text-slate-300 font-semibold text-xs sm:text-sm mt-0.5">Specialized PG Diplomas</div>
            <div className="text-slate-400 text-[11px] mt-1">Cinematography, Direction & News</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left">
            <div className="text-rose-400 font-black text-2xl sm:text-3xl">2026</div>
            <div className="text-slate-300 font-semibold text-xs sm:text-sm mt-0.5">Inaugural Batch</div>
            <div className="text-slate-400 text-[11px] mt-1">Direct industry mentor placement</div>
          </div>
        </div>

      </div>
    </section>
  );
};

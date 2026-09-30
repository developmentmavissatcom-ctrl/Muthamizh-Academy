import React from 'react';
import { 
  Radio, 
  GraduationCap, 
  ArrowRight, 
  Bot, 
  Layers
} from 'lucide-react';
import { InteractiveStudioDeck } from './InteractiveStudioDeck';

interface BroadcastHeroProps {
  onOpenAstra: () => void;
  onExploreCourses: () => void;
  onOpenApplyModal: () => void;
  onOpenDiscovery?: () => void;
}

export const BroadcastHero: React.FC<BroadcastHeroProps> = ({
  onOpenAstra,
  onExploreCourses,
  onOpenApplyModal
}) => {
  return (
    <section className="relative min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 lg:py-16 w-full overflow-hidden">
      {/* Studio Telemetry Grid Lines */}
      <div className="absolute inset-0 telemetry-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1560px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
          
          {/* ================= LEFT SIDE: Content Column ================= */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-8">
            
            {/* Live On-Air Pill */}
            <div className="inline-flex flex-wrap items-center gap-3 p-1.5 pr-4 rounded-full bg-[#0b100e]/95 border border-[#16241f] shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00c878]/15 border border-[#00c878]/30 text-[#00c878] text-xs font-mono font-bold tracking-wide">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#00c878]" />
                <span>LIVE ON-AIR</span>
              </div>
              <span className="text-xs text-[#8a9690] font-mono hidden sm:inline">
                Mavis Satcom Ltd • Jaya TV Network Floor
              </span>
              <span className="bg-[#e6ad54]/20 text-[#e6ad54] px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border border-[#e6ad54]/40">
                BATCH 2026
              </span>
            </div>

            {/* Master Headline */}
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#00c878] uppercase mb-2">
                Muthamizh Academy
              </h1>
              <h2 className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-[#f5f7f6] tracking-tight leading-[1.1] font-sans">
                THE NEXT ERA OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c878] via-[#e6ad54] to-[#f5f7f6]">
                  BROADCAST & FILM
                </span>
              </h2>

              <p className="text-base sm:text-xl xl:text-2xl font-serif text-[#e6ad54] font-medium tracking-wide">
                Muthamizh Academy • Professional Television & Cinema Academy
              </p>

              <p className="text-[#8a9690] text-xs sm:text-base leading-relaxed">
                Step inside 10,000+ sq.ft of active satellite television production floors. Direct hands-on training with Advanced Camera Setup, multi-cam vision mixers, newsroom teleprompters, and Jaya TV senior showrunners.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1 w-full sm:w-auto">
              <button
                onClick={onOpenApplyModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-extrabold text-sm sm:text-base transition-all shadow-[0_10px_30px_rgba(0,200,120,0.3)] hover:shadow-[0_15px_40px_rgba(0,200,120,0.5)] hover:scale-[1.02] flex items-center justify-center gap-3 border border-[#00c878]/60 group font-mono"
              >
                <GraduationCap className="w-5 h-5 text-[#050706]" />
                <span>Apply for Admissions 2026</span>
                <ArrowRight className="w-4 h-4 text-[#050706] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#0b100e]/90 hover:bg-[#121a17] text-[#f5f7f6] border border-[#16241f] hover:border-[#00c878]/50 font-bold text-sm sm:text-base transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#00c878]" />
                <span>Explore Programs</span>
              </button>

              <button
                onClick={onOpenAstra}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#e6ad54]/10 to-[#00c878]/10 hover:from-[#e6ad54]/20 hover:to-[#00c878]/20 text-[#e6ad54] border border-[#e6ad54]/40 hover:border-[#e6ad54] font-bold text-sm sm:text-base transition-all backdrop-blur-md flex items-center justify-center gap-2 group"
              >
                <Bot className="w-5 h-5 text-[#e6ad54] group-hover:rotate-12 transition-transform" />
                <span>Astra AI Concierge</span>
              </button>
            </div>

            {/* Telemetry Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-[#16241f] w-full max-w-2xl">
              <div className="p-3 rounded-xl bg-[#0b100e]/80 border border-[#16241f] text-left">
                <div className="text-[#00c878] font-mono font-black text-xl">100%</div>
                <div className="text-[#f5f7f6] text-[11px] font-semibold">Jaya TV Floor</div>
                <div className="text-[#8a9690] text-[10px] font-mono">Live rotation</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0b100e]/80 border border-[#16241f] text-left">
                <div className="text-[#e6ad54] font-mono font-black text-xl">10k+</div>
                <div className="text-[#f5f7f6] text-[11px] font-semibold">Sq.Ft Studio</div>
                <div className="text-[#8a9690] text-[10px] font-mono">Acoustic stage</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0b100e]/80 border border-[#16241f] text-left">
                <div className="text-[#00c878] font-mono font-black text-xl">11</div>
                <div className="text-[#f5f7f6] text-[11px] font-semibold">Programs</div>
                <div className="text-[#8a9690] text-[10px] font-mono">Cinema & AI</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0b100e]/80 border border-[#16241f] text-left">
                <div className="text-[#ef4444] font-mono font-black text-xl">2026</div>
                <div className="text-[#f5f7f6] text-[11px] font-semibold">New Cohort</div>
                <div className="text-[#8a9690] text-[10px] font-mono">Seats open</div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT SIDE: Interactive Broadcast Studio Deck Console ================= */}
          <div className="lg:col-span-6 xl:col-span-5 relative w-full flex flex-col items-center justify-center">
            <InteractiveStudioDeck 
              onOpenApplyModal={onOpenApplyModal}
              onExploreCourses={onExploreCourses}
              onOpenAstra={onOpenAstra}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

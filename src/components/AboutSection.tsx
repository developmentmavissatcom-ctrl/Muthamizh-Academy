import React from 'react';
import { Tv, Film, Award, CheckCircle2, Shield, Users, Radio, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 w-full bg-[#050706] text-[#f5f7f6] border-t border-[#16241f]">
      <div className="w-full max-w-[1920px] mx-auto space-y-14">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121a17] border border-[#00c878]/30 text-[#00c878] text-xs font-mono font-semibold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-[#00c878] animate-pulse" />
            <span>Mavis Satcom Limited Initiative • Jaya TV Partner</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f5f7f6] tracking-tight font-sans">
            About Muthamizh Academy
          </h2>
          <p className="text-[#8a9690] text-sm sm:text-base leading-relaxed">
            Bridging media academia and real-world broadcast television. Formed in official partnership with Jaya TV Network to train the inaugural batch of future filmmakers, cinematographers, and news anchors.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Text Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#f5f7f6] flex items-center gap-2.5">
              <span className="w-2 h-7 bg-[#00c878] rounded-full"></span>
              Broadcasting Excellence Powered by Jaya TV Studios
            </h3>

            <p className="text-[#8a9690] text-sm leading-relaxed">
              Muthamizh Academy was founded to redefine media education in South India. Unlike conventional film institutes that rely on outdated theoretical lectures, our students train inside active, live broadcasting environments.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl bg-[#0b100e] border border-[#16241f] shadow-lg">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00c878]/15 border border-[#00c878]/30 flex items-center justify-center text-[#00c878] shrink-0 font-mono font-bold text-xs sm:text-sm">
                  01
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#f5f7f6]">Live Satellite Studio Floor Access</h4>
                  <p className="text-xs text-[#8a9690] mt-1 leading-relaxed">
                    Operate multi-camera setups, teleprompters, digital switcher consoles, and professional studio floor lighting under real prime-time conditions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl bg-[#0b100e] border border-[#16241f] shadow-lg">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#e6ad54]/15 border border-[#e6ad54]/30 flex items-center justify-center text-[#e6ad54] shrink-0 font-mono font-bold text-xs sm:text-sm">
                  02
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#f5f7f6]">Mavis Satcom Newsroom Exposure</h4>
                  <p className="text-xs text-[#8a9690] mt-1 leading-relaxed">
                    Learn live news anchoring, teleprompter reading, outdoor broadcast (OB Van) reporting, and investigative journalism with Jaya TV senior editors.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-2xl bg-[#0b100e] border border-[#16241f] shadow-lg">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00c878]/15 border border-[#00c878]/30 flex items-center justify-center text-[#00c878] shrink-0 font-mono font-bold text-xs sm:text-sm">
                  03
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#f5f7f6]">Direct Industry Mentorship & Placements</h4>
                  <p className="text-xs text-[#8a9690] mt-1 leading-relaxed">
                    Every PG Diploma candidate in the 2026 inaugural batch completes an intensive studio internship with placement support across Jaya TV Network and partner satellite channels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="relative rounded-3xl overflow-hidden border border-[#16241f] shadow-2xl group bg-[#0b100e]">
            <img
              src="/src/assets/images/academy_campus_building_1785852759706.jpg"
              alt="Muthamizh Academy Campus"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-[#050706]/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0b100e]/95 border border-[#16241f] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#e6ad54] uppercase tracking-wider">Chennai Campus Complex</div>
                  <div className="text-sm font-extrabold text-[#f5f7f6]">Muthamizh Academy & Jaya TV Complex</div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-[#00c878] text-[#050706] text-xs font-mono font-bold shadow">
                  10,000+ Sq.Ft
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

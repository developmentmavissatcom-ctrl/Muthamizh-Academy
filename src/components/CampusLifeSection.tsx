import React from 'react';
import { Camera, Tv, Mic, Monitor, Film, Layers } from 'lucide-react';

export const CampusLifeSection: React.FC = () => {
  const facilities = [
    {
      title: 'Jaya TV Multi-Cam Studio Floor',
      desc: 'State-of-the-art studio floor with motorized light grids, teleprompter pedestals, and live chroma key setup.',
      icon: Tv,
      badge: 'Broadcast Studio'
    },
    {
      title: 'PCR & Vision Mixing Console',
      desc: 'Live program control room equipped with Blackmagic & Sony vision mixers, multi-viewer audio monitors.',
      icon: Monitor,
      badge: 'Control Room'
    },
    {
      title: 'Digital Post-Production Suites',
      desc: 'High-end editing workstations loaded with Avid Media Composer, DaVinci Resolve, and Premiere Pro.',
      icon: Film,
      badge: 'Editing Suite'
    },
    {
      title: 'Pro Audio & Sound Mixing Lab',
      desc: 'Acoustically isolated sound recording booth with Pro Tools HD, Neumann mics, and surround sound mixing.',
      icon: Mic,
      badge: 'Sound Lab'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 w-full bg-[#050706] border-t border-[#16241f]">
      <div className="w-full max-w-[1920px] mx-auto space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121a17] border border-[#e6ad54]/30 text-[#e6ad54] text-xs font-mono font-semibold uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" />
            <span>World Class Studio Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f5f7f6] tracking-tight font-sans">
            Campus Floors & Broadcast Suites
          </h2>
          <p className="text-[#8a9690] text-sm">
            Experience what it feels like to work inside an active satellite television network from day one of your course.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-[#0b100e] border border-[#16241f] hover:border-[#00c878]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#121a17] border border-[#16241f] flex items-center justify-center text-[#00c878] mb-4 group-hover:scale-110 group-hover:border-[#00c878]/40 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#e6ad54] bg-[#050706] px-2.5 py-1 rounded-lg border border-[#16241f]">
                    {fac.badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#f5f7f6] mt-3 group-hover:text-[#00c878] transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-[#8a9690] mt-2 leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Gallery Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4">
          <div className="relative h-56 sm:h-72 lg:h-80 rounded-3xl overflow-hidden border border-[#16241f] group shadow-xl bg-[#0b100e]">
            <img
              src="/src/assets/images/hero_broadcast_studio_1785852745647.jpg"
              alt="Jaya TV Studio Floor"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-[#050706]/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-xs text-[#00c878] font-mono font-bold uppercase">Live Broadcast Newsroom</span>
              <h4 className="text-base font-bold text-[#f5f7f6]">Jaya TV News Floor & Teleprompter Rig</h4>
            </div>
          </div>

          <div className="relative h-56 sm:h-72 lg:h-80 rounded-3xl overflow-hidden border border-[#16241f] group shadow-xl bg-[#0b100e]">
            <img
              src="/camera_setup.png"
              alt="Cinema Camera Setup"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-[#050706]/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-xs text-[#e6ad54] font-mono font-bold uppercase">Cinematography Gear Store</span>
              <h4 className="text-base font-bold text-[#f5f7f6]">Advanced Camera Setup</h4>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

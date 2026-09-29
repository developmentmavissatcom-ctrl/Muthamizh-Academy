import React, { useState } from 'react';
import { 
  Radio, 
  Tv, 
  Camera, 
  Mic, 
  Server, 
  GraduationCap, 
  ArrowRight,
  CheckCircle2,
  Award,
  Users,
  Film
} from 'lucide-react';

interface InteractiveStudioDeckProps {
  onOpenApplyModal: () => void;
  onExploreCourses: () => void;
  onOpenAstra?: () => void;
}

interface AcademyPillar {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  highlights: string[];
  stats: { value: string; label: string };
}

const ACADEMY_PILLARS: AcademyPillar[] = [
  {
    id: 'broadcast',
    tabLabel: 'Broadcast & Cinema',
    badge: 'Flagship Studio Floor',
    title: 'Television Direction & Multi-Cam Cinematography',
    subtitle: '10,000+ Sq.Ft Active Production Stage',
    image: '/camera_setup.png',
    description: 'Direct hands-on training on active satellite television sets, Jimmy Jibs, vision mixing PCR suites, and teleprompter news studios.',
    highlights: [
      'Multi-camera telecast production on real studio floors',
      'Direct internship rotation with Jaya TV channel teams',
      'Professional camera rigs, studio lighting & teleprompters'
    ],
    stats: { value: '10,000+', label: 'Sq.Ft Acoustic Stage' }
  },
  {
    id: 'sound',
    tabLabel: 'Audio Engineering',
    badge: 'Acoustic Sound Stage',
    title: 'Dolby Atmos & Multi-Track Sound Engineering',
    subtitle: 'High-End Foley & Music Recording Suite',
    image: '/light.jpg',
    description: 'Master professional audio mixing consoles, cinematic foley art, voice dubbing, loudness standards, and multi-track spatial sound mastering.',
    highlights: [
      '32-Channel professional mixing consoles & DSP processing',
      'Studio voice dubbing for broadcast news & serials',
      'Neumann microphones & Genelec acoustic monitoring'
    ],
    stats: { value: '32-CH', label: 'Pro Mixing Console' }
  },
  {
    id: 'tech',
    tabLabel: 'AI & Network Lab',
    badge: 'Modern Technology',
    title: 'AI Media Engineering & Cisco Infrastructure',
    subtitle: 'Broadcast Server Rooms & Enterprise Testing',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    description: 'Learn modern generative AI newsroom automation, Cisco CCNA enterprise network engineering, and professional manual software QA testing.',
    highlights: [
      'AI prompt engineering & broadcast workflow automation',
      'Hands-on Cisco routing, switching & server rack labs',
      'Real-world software QA test case design & Jira management'
    ],
    stats: { value: '100%', label: 'Hands-On Labs' }
  }
];

export const InteractiveStudioDeck: React.FC<InteractiveStudioDeckProps> = ({
  onOpenApplyModal,
  onExploreCourses
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentPillar = ACADEMY_PILLARS[activeTab];

  return (
    <div className="relative w-full max-w-[560px]">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#00c878]/15 via-[#e6ad54]/10 to-transparent blur-2xl pointer-events-none" />

      {/* Main Showcase Container */}
      <div className="relative z-10 w-full rounded-3xl bg-[#0b100e]/95 border border-[#16241f] shadow-2xl p-4 sm:p-5 backdrop-blur-xl space-y-4">
        
        {/* Top Discipline Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#050706] border border-[#16241f]">
          {ACADEMY_PILLARS.map((pillar, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/50 shadow-md font-bold'
                    : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0a0f0d]'
                }`}
              >
                {pillar.id === 'broadcast' && <Film className="w-3.5 h-3.5" />}
                {pillar.id === 'sound' && <Mic className="w-3.5 h-3.5" />}
                {pillar.id === 'tech' && <Server className="w-3.5 h-3.5" />}
                <span className="truncate">{pillar.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Visual Card */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#16241f] group shadow-inner">
          <img
            src={currentPillar.image}
            alt={currentPillar.title}
            className="w-full h-full object-cover transition-all duration-700 filter brightness-90 group-hover:scale-105"
          />

          {/* Clean Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050706] via-[#050706]/40 to-transparent pointer-events-none" />

          {/* Top Floating Badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050706]/85 backdrop-blur-md border border-[#00c878]/40 text-[#00c878] text-[11px] font-mono font-bold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#00c878] animate-pulse" />
              {currentPillar.badge}
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#050706]/85 backdrop-blur-md border border-[#16241f] text-[11px] font-mono text-[#e6ad54] font-semibold">
              Mavis Satcom / Jaya TV
            </span>
          </div>

          {/* Bottom Card Title & Subtitle */}
          <div className="absolute bottom-3 left-3 right-3 pointer-events-none space-y-1">
            <h3 className="text-base sm:text-lg font-extrabold text-[#f5f7f6] leading-tight drop-shadow">
              {currentPillar.title}
            </h3>
            <p className="text-xs text-[#00c878] font-mono font-semibold">
              {currentPillar.subtitle}
            </p>
          </div>
        </div>

        {/* Key Highlights List */}
        <div className="space-y-2 pt-1">
          {currentPillar.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-2.5 text-xs text-[#d1dbd5]">
              <CheckCircle2 className="w-4 h-4 text-[#00c878] shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        {/* Bottom Action Strip */}
        <div className="pt-2 border-t border-[#16241f] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#8a9690] w-full sm:w-auto">
            <Users className="w-4 h-4 text-[#e6ad54]" />
            <span>2026 Batch Admissions Open</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onOpenApplyModal}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00c878] to-[#008c54] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-mono font-bold text-xs shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-[#050706]" />
              <span>Book Studio Pass</span>
            </button>

            <button
              onClick={onExploreCourses}
              className="px-3.5 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#1a2521] border border-[#16241f] hover:border-[#00c878]/40 text-[#f5f7f6] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              title="Explore all Muthamizh Academy Academic Programs"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00c878]" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

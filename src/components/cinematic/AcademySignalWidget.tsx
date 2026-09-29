import React, { useState } from 'react';
import { 
  Radio, 
  ChevronUp, 
  ChevronDown, 
  Tv, 
  Activity, 
  Users, 
  Volume2, 
  Clock
} from 'lucide-react';

export const AcademySignalWidget: React.FC<{ onOpenApplyModal: () => void }> = ({ onOpenApplyModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFloor, setActiveFloor] = useState<'Floor A (PCR)' | 'Floor B (Chroma)' | 'Lab 03 (Sound)'>('Floor A (PCR)');

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <div className="rounded-2xl bg-[#0b100e]/95 backdrop-blur-2xl border border-[#16241f] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,200,120,0.1)] transition-all duration-300 w-72 sm:w-80 overflow-hidden">
        
        {/* Widget Bar Trigger */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 px-4 flex items-center justify-between cursor-pointer hover:bg-[#121a17]/80 transition-colors select-none"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00c878] animate-ping" />
            <div className="text-left">
              <div className="text-xs font-mono font-bold text-[#f5f7f6] flex items-center gap-1.5">
                <span>ACADEMY SIGNAL</span>
                <span className="px-1.5 py-0.2 rounded bg-[#00c878]/20 text-[#00c878] text-[9px]">LIVE</span>
              </div>
              <div className="text-[10px] text-[#8a9690] font-mono">
                Jaya TV Floor 1 • 2026 Batch
              </div>
            </div>
          </div>

          <button className="text-[#8a9690] hover:text-[#f5f7f6] p-1">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Telemetry Details */}
        {isExpanded && (
          <div className="p-4 pt-1 border-t border-[#16241f] space-y-3.5 text-xs animate-in fade-in duration-200">
            {/* Live Studio Telemetry status */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2 rounded-xl bg-[#050706] border border-[#16241f] text-left">
                <span className="text-[9px] font-mono text-[#8a9690] uppercase block">Studio Status</span>
                <span className="font-mono font-bold text-[#00c878] text-xs flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" /> RECORDING
                </span>
              </div>

              <div className="p-2 rounded-xl bg-[#050706] border border-[#16241f] text-left">
                <span className="text-[9px] font-mono text-[#8a9690] uppercase block">Floor Capacity</span>
                <span className="font-mono font-bold text-[#e6ad54] text-xs">
                  8 Seats Open
                </span>
              </div>
            </div>

            {/* Quick floor broadcast switcher */}
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono text-[#8a9690] uppercase">Active Campus Floors</span>
              <div className="flex gap-1.5 font-mono text-[10px]">
                {(['Floor A (PCR)', 'Floor B (Chroma)', 'Lab 03 (Sound)'] as const).map((floor) => (
                  <button
                    key={floor}
                    onClick={() => setActiveFloor(floor)}
                    className={`px-2 py-1 rounded-lg border transition-all ${
                      activeFloor === floor
                        ? 'bg-[#00c878]/20 border-[#00c878] text-[#00c878]'
                        : 'bg-[#121a17] border-[#16241f] text-[#8a9690] hover:text-[#f5f7f6]'
                    }`}
                  >
                    {floor.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Admissions Call to Action */}
            <button
              onClick={onOpenApplyModal}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] font-mono font-bold text-xs shadow transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
            >
              <Radio className="w-3 h-3 text-[#050706]" />
              <span>Request Studio Tour & Pass</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { FACULTY_DATA } from '../data/facultyData';
import { FacultyMember } from '../types';
import { Award, GraduationCap, Sparkles, X, BookOpen, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export const FacultySection: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 w-full bg-[#050706] text-[#f5f7f6] border-t border-[#16241f]">
      <div className="w-full max-w-[1920px] mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121a17] border border-[#00c878]/30 text-[#00c878] text-xs font-mono font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Veteran Media Practitioners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f5f7f6] tracking-tight font-sans">
            Faculty & Industry Mentors
          </h2>
          <p className="text-[#8a9690] text-sm">
            Learn directly from senior news directors, award-winning cinematographers, and chief post-production supervisors from Jaya TV Network.
          </p>
        </div>

        {/* 4-Column Faculty Cards Grid (Matches Attached Design: 4 in Top Row, 1 in Second Row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
          {FACULTY_DATA.map((fac) => {
            const isExpanded = expandedCardId === fac.id;
            return (
              <div
                key={fac.id}
                className="rounded-3xl bg-[#0b100e] text-[#f5f7f6] border border-[#16241f] shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_36px_rgba(0,200,120,0.12)] hover:border-[#00c878]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col p-4 sm:p-5 group"
              >
                {/* Photo Container with Rounded Corners (Completely clean with NO text overlay) */}
                <div className="relative w-full aspect-[4/4.6] rounded-2xl overflow-hidden bg-[#050706] mb-4 border border-[#16241f]">
                  <img
                    src={fac.image}
                    alt={fac.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[center_16%] group-hover:scale-104 transition-transform duration-500"
                  />
                </div>

                {/* Centered Faculty Identity & Details */}
                <div className="flex-1 flex flex-col justify-between text-center space-y-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#f5f7f6] tracking-tight group-hover:text-[#00c878] transition-colors">
                      {fac.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#8a9690] font-medium leading-snug mt-1 min-h-[38px] flex items-center justify-center">
                      {fac.role}
                    </p>

                    {/* Network & Experience Badges (Placed inside card details, NOT on the image) */}
                    <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121a17] text-[#e6ad54] text-[11px] font-mono font-medium border border-[#16241f]">
                        <Award className="w-3.5 h-3.5 text-[#e6ad54]" />
                        <span>{fac.experience}</span>
                      </div>
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#121a17] text-[#00c878] text-[10px] font-mono font-semibold border border-[#00c878]/30 uppercase">
                        <span>{fac.networkCredit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specializations Pills */}
                  <div className="pt-2.5 border-t border-[#16241f]">
                    <div className="flex flex-wrap items-center justify-center gap-1">
                      {fac.expertise.slice(0, 3).map((exp, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#121a17] text-[#8a9690] font-mono px-2 py-0.5 rounded-md border border-[#16241f]"
                        >
                          {exp}
                        </span>
                      ))}
                      {fac.expertise.length > 3 && (
                        <span className="text-[10px] bg-[#121a17] text-[#8a9690] font-mono px-1.5 py-0.5 rounded-md border border-[#16241f]">
                          +{fac.expertise.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Inline Expandable Bio (Preserves Full Website Details) */}
                  {isExpanded && (
                    <div className="pt-3 text-left border-t border-[#16241f] animate-in fade-in space-y-2">
                      <p className="text-xs text-[#8a9690] leading-relaxed">
                        {fac.bio}
                      </p>
                      <div className="pt-1">
                        <div className="text-[10px] font-mono font-bold text-[#8a9690] uppercase tracking-wider mb-1">
                          All Specializations:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {fac.expertise.map((exp, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-[#121a17] text-[#00c878] font-mono px-2 py-0.5 rounded-md border border-[#00c878]/30"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions: View Bio Modal or Toggle Inline */}
                  <div className="pt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setExpandedCardId(isExpanded ? null : fac.id)}
                      className="py-2 px-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1 border border-[#16241f]"
                    >
                      <span>{isExpanded ? 'Less' : 'Bio'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedFaculty(fac)}
                      className="py-2 px-2.5 rounded-xl bg-[#00c878]/10 hover:bg-[#00c878]/20 text-[#00c878] border border-[#00c878]/40 hover:border-[#00c878] text-[11px] font-mono font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <span>Full Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Comprehensive Faculty Profile Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#070b09] text-[#f5f7f6] border border-[#16241f] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header & Close Button */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#050706] shrink-0 border border-[#16241f] shadow">
                  <img
                    src={selectedFaculty.image}
                    alt={selectedFaculty.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#121a17] text-[#e6ad54] border border-[#e6ad54]/30 text-[11px] font-mono font-bold mb-1">
                    <Award className="w-3.5 h-3.5 text-[#e6ad54]" />
                    <span>{selectedFaculty.networkCredit}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#f5f7f6] tracking-tight">
                    {selectedFaculty.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#00c878] font-medium mt-0.5">
                    {selectedFaculty.role}
                  </p>
                  <p className="text-xs text-[#8a9690] font-mono font-semibold mt-1">
                    {selectedFaculty.experience}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFaculty(null)}
                className="p-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] border border-[#16241f] transition-colors"
                title="Close Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* In-depth Biography */}
            <div className="space-y-2 pt-4 border-t border-[#16241f]">
              <h4 className="text-xs font-mono font-bold text-[#8a9690] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#00c878]" />
                <span>Professional Biography & Media Career</span>
              </h4>
              <p className="text-sm text-[#8a9690] leading-relaxed">
                {selectedFaculty.bio}
              </p>
            </div>

            {/* Core Competencies & Expertise */}
            <div className="space-y-2 pt-4 border-t border-[#16241f]">
              <h4 className="text-xs font-mono font-bold text-[#8a9690] uppercase tracking-wider">
                Specialized Domains & Industry Training
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedFaculty.expertise.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#121a17] text-[#00c878] font-mono px-3 py-1 rounded-xl border border-[#00c878]/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-4 border-t border-[#16241f]">
              <button
                type="button"
                onClick={() => setSelectedFaculty(null)}
                className="px-6 py-2.5 rounded-xl bg-[#00c878] hover:bg-[#00c878]/90 text-[#050706] font-mono text-xs font-bold transition-colors"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

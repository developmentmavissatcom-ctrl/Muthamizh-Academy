import React, { useState } from 'react';
import { FACULTY_DATA, DEPARTMENTS } from '../data/facultyData';
import { FacultyMember } from '../types';
import { 
  Award, 
  GraduationCap, 
  X, 
  BookOpen, 
  ExternalLink, 
  Tv,
  Code,
  Cpu,
  Layers,
  Mail,
  Sparkles
} from 'lucide-react';

export const FacultySection: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  // Directly sourced from codebase data
  const allFaculty: FacultyMember[] = FACULTY_DATA;

  // Department counts
  const newsCount = allFaculty.filter(f => (f.department || 'News Department') === 'News Department').length;
  const itCount = allFaculty.filter(f => (f.department || '').toLowerCase().includes('it') || (f.department || '').toLowerCase().includes('computing')).length;

  // Filtered faculty list
  const filteredFaculty = allFaculty.filter(fac => {
    const dept = fac.department || 'News Department';
    if (selectedDept === 'all') return true;
    if (selectedDept === 'news') return dept === 'News Department';
    if (selectedDept === 'it') return dept.toLowerCase().includes('it') || dept.toLowerCase().includes('computing');
    return dept === selectedDept;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 w-full bg-[#050706] text-[#f5f7f6] border-t border-[#16241f]">
      <div className="w-full max-w-[1920px] mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl mx-auto border-b border-[#16241f] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121a17] border border-[#00c878]/30 text-[#00c878] text-xs font-mono font-semibold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Departments & Industry Mentors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f5f7f6] tracking-tight font-sans">
              Faculty Directory
            </h2>
            <p className="text-[#8a9690] text-sm sm:text-base leading-relaxed">
              Explore veteran practitioners across our broadcast television, media production, and information technology departments.
            </p>
          </div>
        </div>

        {/* Department Switcher Tabs */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[#070b09] border border-[#16241f] w-fit">
            
            {/* All Departments Tab */}
            <button
              type="button"
              onClick={() => setSelectedDept('all')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                selectedDept === 'all'
                  ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/40 shadow-sm'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All Departments</span>
              <span className="px-2 py-0.5 rounded-full bg-[#16241f] text-[10px] font-mono text-[#f5f7f6]">
                {allFaculty.length}
              </span>
            </button>

            {/* News Department Tab */}
            <button
              type="button"
              onClick={() => setSelectedDept('news')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                selectedDept === 'news'
                  ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/40 shadow-sm'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              <Tv className="w-4 h-4 text-[#e6ad54]" />
              <span>News Department</span>
              <span className="px-2 py-0.5 rounded-full bg-[#16241f] text-[10px] font-mono text-[#e6ad54]">
                {newsCount} Mentors
              </span>
            </button>

            {/* IT Department Tab */}
            <button
              type="button"
              onClick={() => setSelectedDept('it')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                selectedDept === 'it'
                  ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/40 shadow-sm'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              <Code className="w-4 h-4 text-cyan-400" />
              <span>IT Department</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-[10px] font-mono text-cyan-400">
                {itCount > 0 ? `${itCount} Faculty` : 'School of Computing'}
              </span>
            </button>

          </div>
        </div>

        {/* Department Information Banners */}
        {selectedDept === 'news' && (
          <div className="max-w-7xl mx-auto p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0b100e] via-[#070b09] to-[#0b100e] border border-[#16241f]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e6ad54] uppercase tracking-wider font-bold">
                <Tv className="w-3.5 h-3.5" />
                <span>News & Television Journalism Department</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#f5f7f6]">
                Broadcast Anchoring, PCR Direction & Newsroom Operations
              </h3>
              <p className="text-xs sm:text-sm text-[#8a9690] max-w-3xl">
                Led by veteran news directors, chief editors, and satellite broadcast anchors from Jaya TV Network with decades of prime-time studio experience.
              </p>
            </div>
          </div>
        )}

        {selectedDept === 'it' && (
          <div className="max-w-7xl mx-auto p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#081216] via-[#070b09] to-[#081216] border border-cyan-900/30">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                <Cpu className="w-3.5 h-3.5" />
                <span>Information Technology Department (School of Computing & AI)</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#f5f7f6]">
                AI-Assisted Software Development, Agentic Engineering & Cloud Architectures
              </h3>
              <p className="text-xs sm:text-sm text-[#8a9690] max-w-3xl">
                Hands-on computing curriculum covering modern full-stack systems, Cursor / Copilot / Claude Code workflows, Model Context Protocol (MCP), and enterprise AI applications.
              </p>
            </div>
          </div>
        )}

        {/* Informational State for IT Department (when roster is being finalized) */}
        {selectedDept === 'it' && filteredFaculty.length === 0 && (
          <div className="max-w-7xl mx-auto rounded-3xl bg-[#070b09] border border-[#16241f] p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
              <Cpu className="w-8 h-8 animate-pulse" />
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                IT Department Roster Under Finalization
              </span>
              <h3 className="text-2xl font-bold text-[#f5f7f6]">
                Faculty Profiles & Research Chairs
              </h3>
              <p className="text-sm text-[#8a9690] leading-relaxed">
                Faculty appointments for the IT Department (School of Computing, AI Systems & Software Engineering) will be announced shortly for the upcoming academic cohort.
              </p>
            </div>

            {/* IT Department Curriculum Highlights */}
            <div className="pt-6 border-t border-[#16241f] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-[#0b100e] border border-[#16241f] space-y-1.5">
                <div className="text-xs font-mono font-bold text-cyan-400">Track 01</div>
                <div className="text-sm font-bold text-[#f5f7f6]">AI-Assisted Software Dev</div>
                <p className="text-[11px] text-[#8a9690]">Cursor, Claude Code, GitHub Copilot & Next.js</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0b100e] border border-[#16241f] space-y-1.5">
                <div className="text-xs font-mono font-bold text-cyan-400">Track 02</div>
                <div className="text-sm font-bold text-[#f5f7f6]">Agentic AI & MCP Systems</div>
                <p className="text-[11px] text-[#8a9690]">Model Context Protocol & Multi-Agent RAG</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0b100e] border border-[#16241f] space-y-1.5">
                <div className="text-xs font-mono font-bold text-cyan-400">Track 03</div>
                <div className="text-sm font-bold text-[#f5f7f6]">Full-Stack Web Engineering</div>
                <p className="text-[11px] text-[#8a9690]">React 19, TypeScript, Node.js & PostgreSQL</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0b100e] border border-[#16241f] space-y-1.5">
                <div className="text-xs font-mono font-bold text-cyan-400">Track 04</div>
                <div className="text-sm font-bold text-[#f5f7f6]">Cloud & DevOps Operations</div>
                <p className="text-[11px] text-[#8a9690]">Docker, Cloud Run, CI/CD & Production APIs</p>
              </div>
            </div>

          </div>
        )}

        {/* Faculty Cards Grid */}
        {filteredFaculty.length > 0 && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {filteredFaculty.map((fac) => {
              const isIT = (fac.department || '').toLowerCase().includes('it') || (fac.department || '').toLowerCase().includes('computing');
              return (
                <div
                  key={fac.id}
                  className="rounded-3xl bg-[#0b100e] text-[#f5f7f6] border border-[#16241f] shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_36px_rgba(0,200,120,0.12)] hover:border-[#00c878]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col p-4 sm:p-5 group relative"
                >
                  {/* Photo Container */}
                  <div className="relative w-full aspect-[4/4.6] rounded-2xl overflow-hidden bg-[#050706] mb-4 border border-[#16241f]">
                    <img
                      src={fac.image}
                      alt={fac.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('/f1.jpg')) {
                          target.src = '/f1.jpg';
                        }
                      }}
                      className="w-full h-full object-cover object-[center_16%] group-hover:scale-104 transition-transform duration-500"
                    />

                    {/* Department Tag Overlay */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md shadow-md ${
                        isIT 
                          ? 'bg-cyan-950/85 text-cyan-300 border-cyan-800/60' 
                          : 'bg-[#121a17]/90 text-[#e6ad54] border-[#e6ad54]/40'
                      }`}>
                        {fac.department || 'News Department'}
                      </span>
                    </div>
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

                      {/* Network & Experience Badges */}
                      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121a17] text-[#e6ad54] text-[11px] font-mono font-medium border border-[#16241f]">
                          <Award className="w-3.5 h-3.5 text-[#e6ad54]" />
                          <span>{fac.experience}</span>
                        </div>
                        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold border uppercase ${
                          isIT 
                            ? 'bg-cyan-950/30 text-cyan-400 border-cyan-800/30' 
                            : 'bg-[#121a17] text-[#00c878] border-[#00c878]/30'
                        }`}>
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

                    {/* Actions */}
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => setSelectedFaculty(fac)}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#00c878]/10 hover:bg-[#00c878]/20 text-[#00c878] border border-[#00c878]/40 hover:border-[#00c878] text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,200,120,0.15)]"
                      >
                        <span>Full Profile</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Comprehensive Faculty Profile Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#070b09] text-[#f5f7f6] border border-[#16241f] rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header & Close Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 sm:pt-0">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#050706] shrink-0 border border-[#16241f] shadow">
                  <img
                    src={selectedFaculty.image}
                    alt={selectedFaculty.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('/f1.jpg')) {
                        target.src = '/f1.jpg';
                      }
                    }}
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#121a17] text-[#00c878] border border-[#00c878]/30 text-[9px] sm:text-[10px] font-mono font-bold">
                      {selectedFaculty.department || 'News Department'}
                    </span>
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#121a17] text-[#e6ad54] border border-[#e6ad54]/30 text-[9px] sm:text-[10px] font-mono font-bold">
                      {selectedFaculty.networkCredit}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-[#f5f7f6] tracking-tight">
                    {selectedFaculty.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#00c878] font-medium mt-0.5">
                    {selectedFaculty.role}
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#8a9690] font-mono font-semibold mt-0.5 sm:mt-1">
                    {selectedFaculty.experience}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFaculty(null)}
                className="absolute top-4 right-4 sm:static p-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] border border-[#16241f] transition-colors cursor-pointer"
                title="Close Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* In-depth Biography */}
            <div className="space-y-2 pt-4 border-t border-[#16241f]">
              <h4 className="text-xs font-mono font-bold text-[#8a9690] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#00c878]" />
                <span>Professional Biography & Career Overview</span>
              </h4>
              <p className="text-sm text-[#8a9690] leading-relaxed">
                {selectedFaculty.bio}
              </p>
            </div>

            {/* Core Competencies & Expertise */}
            <div className="space-y-2 pt-4 border-t border-[#16241f]">
              <h4 className="text-xs font-mono font-bold text-[#8a9690] uppercase tracking-wider">
                Specialized Domains & Training Areas
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
                className="px-6 py-2.5 rounded-xl bg-[#00c878] hover:bg-[#00c878]/90 text-[#050706] font-mono text-xs font-bold transition-colors cursor-pointer"
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

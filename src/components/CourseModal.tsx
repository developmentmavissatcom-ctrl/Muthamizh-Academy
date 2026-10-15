import React, { useState } from 'react';
import { Course } from '../types';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  Award, 
  Wrench, 
  GraduationCap, 
  Bot, 
  BookOpen, 
  Tv, 
  Globe, 
  Laptop, 
  ChevronDown, 
  ChevronUp, 
  Briefcase,
  Layers,
  Calendar,
  Zap,
  Check,
  Sparkles,
  Radio,
  Eye,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onOpenAstraWithCourse: (courseTitle: string) => void;
  onOpenApplyModal?: (courseTitle?: string) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onOpenAstraWithCourse,
  onOpenApplyModal
}) => {
  const [expandedChapterIdx, setExpandedChapterIdx] = useState<number | null>(0);
  const [selectedTrackId, setSelectedTrackId] = useState<'2_weeks' | '4_weeks' | 'weekend'>('2_weeks');
  const [syllabusViewMode, setSyllabusViewMode] = useState<'tracks' | 'all_lessons'>('tracks');
  const [expandedPeriodIdx, setExpandedPeriodIdx] = useState<number | null>(0);
  const [selectedLabImage, setSelectedLabImage] = useState<{
    url: string;
    title: string;
    caption: string;
    tag: string;
  } | null>(null);

  if (!course) return null;

  const toggleChapter = (idx: number) => {
    setExpandedChapterIdx(expandedChapterIdx === idx ? null : idx);
  };

  const activeTrack = course.durationTracks?.find(t => t.id === selectedTrackId) || course.durationTracks?.[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#050706]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0b100e] border border-[#16241f] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(0,200,120,0.15)] overflow-hidden max-h-[92vh] flex flex-col font-sans">
        
        {/* Modal Header */}
        <div className="relative h-48 sm:h-60 bg-[#050706] shrink-0">
          <img
            src={course.image}
            alt={course.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b100e] via-[#0b100e]/70 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-[#050706]/80 border border-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#121a17] transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-[#00c878] text-[#050706] text-[10px] font-mono font-black uppercase tracking-wider">
                {course.categoryName}
              </span>
              {course.isOnline && (
                <span className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span>Online / Virtual Labs Available</span>
                </span>
              )}
              {course.badge && (
                <span className="px-2.5 py-1 rounded-md bg-[#e6ad54]/20 text-[#e6ad54] border border-[#e6ad54]/40 text-[10px] font-mono font-bold">
                  {course.badge}
                </span>
              )}
              {course.durationTracks && (
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                  3 Duration Tracks Available
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight text-[#f5f7f6]">
              {course.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8a9690] mt-2 font-mono">
              <span className="flex items-center gap-1 text-[#f5f7f6]">
                <Clock className="w-3.5 h-3.5 text-[#00c878]" />
                {activeTrack ? activeTrack.durationLabel : course.duration}
              </span>
              <span>•</span>
              <span className="text-[#e6ad54] font-bold">{activeTrack ? activeTrack.fee : course.fee}</span>
              <span>•</span>
              <span className="text-[#8a9690]">{activeTrack ? activeTrack.schedule : course.mode}</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#8a9690] text-xs sm:text-sm">
          
          {/* Overview & Highlight */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#121a17] border border-[#00c878]/30 flex items-start gap-3">
              <Award className="w-4 h-4 text-[#e6ad54] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-bold text-[#e6ad54] uppercase tracking-wider">Key Focus & Outcome</div>
                <div className="text-xs text-[#f5f7f6] mt-0.5">{course.highlight}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e6ad54] mb-1">
                Program Description
              </h3>
              <p className="text-[#f5f7f6] leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>

          {/* Special 3-Duration Tracks Selector for Television News Reading */}
          {course.durationTracks && course.durationTracks.length > 0 && (
            <div className="p-4 sm:p-5 rounded-3xl bg-[#050706] border border-[#00c878]/30 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#16241f] pb-3">
                <div>
                  <div className="text-xs font-mono font-bold text-[#00c878] uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00c878]" />
                    <span>Duration Tracks for this Course</span>
                  </div>
                  <p className="text-xs text-[#f5f7f6] mt-0.5">
                    Choose between <strong>2 Weeks Fast-Track</strong>, <strong>4 Weeks Comprehensive</strong>, or <strong>Weekend Batches</strong>
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-[#0b100e] p-1 rounded-xl border border-[#16241f] shrink-0">
                  <button
                    onClick={() => setSyllabusViewMode('tracks')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                      syllabusViewMode === 'tracks'
                        ? 'bg-[#00c878] text-[#050706] shadow'
                        : 'text-[#8a9690] hover:text-[#f5f7f6]'
                    }`}
                  >
                    Duration Breakdown
                  </button>
                  <button
                    onClick={() => setSyllabusViewMode('all_lessons')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                      syllabusViewMode === 'all_lessons'
                        ? 'bg-[#00c878] text-[#050706] shadow'
                        : 'text-[#8a9690] hover:text-[#f5f7f6]'
                    }`}
                  >
                    10-Lesson Master List
                  </button>
                </div>
              </div>

              {/* 3 Duration Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {course.durationTracks.map((track) => {
                  const isSelected = selectedTrackId === track.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => {
                        setSelectedTrackId(track.id);
                        setSyllabusViewMode('tracks');
                        setExpandedPeriodIdx(0);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#121a17] border-[#00c878] shadow-[0_0_20px_rgba(0,200,120,0.2)] ring-1 ring-[#00c878]'
                          : 'bg-[#0b100e] border-[#16241f] hover:border-[#00c878]/40 hover:bg-[#121a17]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded ${
                          isSelected ? 'bg-[#00c878] text-[#050706]' : 'bg-[#16241f] text-[#8a9690]'
                        }`}>
                          {track.badge}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#e6ad54]">{track.fee}</span>
                      </div>

                      <div className="font-bold text-[#f5f7f6] text-sm leading-snug">
                        {track.title}
                      </div>

                      <div className="text-[11px] font-mono text-[#8a9690] mt-1.5 leading-tight">
                        {track.schedule}
                      </div>

                      {isSelected && (
                        <div className="mt-2 text-[10px] font-mono text-[#00c878] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#00c878]" />
                          <span>Active Track</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Duration Track Schedule View */}
              {syllabusViewMode === 'tracks' && activeTrack && (
                <div className="space-y-4 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[#0b100e] border border-[#16241f] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono text-[#8a9690] uppercase tracking-wider">Ideal For:</span>
                      <p className="text-xs text-[#f5f7f6] font-medium mt-0.5 leading-relaxed">{activeTrack.recommendedFor}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-[#16241f] pt-2 sm:pt-0 sm:pl-4">
                      <div>
                        <div className="text-[10px] font-mono text-[#8a9690] uppercase">Tuition Fee</div>
                        <div className="text-sm font-mono font-extrabold text-[#00c878]">{activeTrack.fee}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#e6ad54] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-[#00c878]" />
                        <span>{activeTrack.durationLabel} Curriculum Breakdown (10 Lessons Covered)</span>
                      </span>
                      <span className="text-[10px] text-[#8a9690]">Click to expand</span>
                    </div>

                    {activeTrack.scheduleBreakdown.map((breakdown, pIdx) => {
                      const isPeriodExpanded = expandedPeriodIdx === pIdx;
                      return (
                        <div key={pIdx} className="rounded-2xl bg-[#0b100e] border border-[#16241f] overflow-hidden">
                          <button
                            onClick={() => setExpandedPeriodIdx(isPeriodExpanded ? null : pIdx)}
                            className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-[#121a17]/50 transition-colors"
                          >
                            <div>
                              <div className="text-xs font-mono font-bold text-[#00c878] uppercase">{breakdown.period}</div>
                              <div className="text-xs sm:text-sm font-bold text-[#f5f7f6] mt-0.5">{breakdown.theme}</div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] font-mono text-[#8a9690] px-2.5 py-1 rounded-md bg-[#16241f]">
                                {breakdown.lessons.length} Lessons
                              </span>
                              {isPeriodExpanded ? <ChevronUp className="w-4 h-4 text-[#8a9690]" /> : <ChevronDown className="w-4 h-4 text-[#8a9690]" />}
                            </div>
                          </button>

                          {isPeriodExpanded && (
                            <div className="p-4 border-t border-[#16241f] bg-[#050706]/70 space-y-3">
                              {breakdown.lessons.map((lesson) => (
                                <div key={lesson.lessonNumber} className="p-3.5 rounded-2xl bg-[#0b100e] border border-[#16241f] space-y-2">
                                  <div className="flex items-center gap-2.5">
                                    <span className="w-6 h-6 rounded-lg bg-[#00c878]/20 text-[#00c878] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                      {lesson.lessonNumber}
                                    </span>
                                    <h5 className="font-bold text-[#f5f7f6] text-xs sm:text-sm">
                                      Lesson {lesson.lessonNumber}: {lesson.title}
                                    </h5>
                                  </div>

                                  <p className="text-xs text-[#8a9690] pl-8">
                                    <span className="text-[#e6ad54] font-mono font-semibold">Core Focus: </span>
                                    {lesson.focus}
                                  </p>

                                  <ul className="pl-8 space-y-1 text-xs text-[#f5f7f6]">
                                    {lesson.topics.map((t, tIdx) => (
                                      <li key={tIdx} className="flex items-start gap-1.5">
                                        <span className="text-[#00c878] mt-0.5">•</span>
                                        <span className="leading-relaxed">{t}</span>
                                      </li>
                                    ))}
                                  </ul>

                                  {lesson.handsOnDrill && (
                                    <div className="ml-8 p-2.5 rounded-xl bg-[#121a17] border border-[#00c878]/30 text-xs text-[#00c878] flex items-center gap-2">
                                      <Tv className="w-4 h-4 shrink-0 text-[#00c878]" />
                                      <span><strong>Practical Drill:</strong> {lesson.handsOnDrill}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Delivery Mode Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#050706] border border-[#16241f] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#00c878]/15 text-[#00c878] flex items-center justify-center shrink-0">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8a9690] uppercase">Delivery Format</div>
                <div className="text-xs font-bold text-[#f5f7f6]">
                  {course.deliveryFormat || course.mode}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#050706] border border-[#16241f] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#e6ad54]/15 text-[#e6ad54] flex items-center justify-center shrink-0">
                <Tv className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#8a9690] uppercase">Studio Immersion</div>
                <div className="text-xs font-bold text-[#e6ad54]">
                  Jaya TV Broadcast Infrastructure
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Syllabus Chapters / All Lessons List or 1-Day Workshop Hands-On Agenda */}
          {(!course.durationTracks || syllabusViewMode === 'all_lessons') && (
            <div>
              {course.chapters && course.chapters.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e6ad54] flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#00c878]" />
                      <span>
                        {course.id === 'tally-prime-gst-crash-course'
                          ? `8-DAY PRACTICAL TALLY & GST CURRICULUM (${course.chapters.length} Modules • 16 Hours)`
                          : course.id.includes('news')
                          ? `TAMIL NEWS READING CURRICULUM (${course.chapters.length} Lessons)`
                          : `COURSE CURRICULUM & MODULE BREAKDOWN (${course.chapters.length} Modules)`}
                      </span>
                    </h3>
                    <span className="text-[11px] font-mono text-[#8a9690]">Click to expand topics</span>
                  </div>

                  <div className="space-y-2.5">
                    {course.chapters.map((chapter, idx) => {
                      const isExpanded = expandedChapterIdx === idx;
                      return (
                        <div
                          key={idx}
                          className="rounded-2xl bg-[#050706] border border-[#16241f] overflow-hidden transition-all"
                        >
                          <button
                            onClick={() => toggleChapter(idx)}
                            className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-[#121a17]/50 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 font-medium text-[#f5f7f6] text-xs sm:text-sm">
                              <CheckCircle2 className="w-4 h-4 text-[#00c878] shrink-0" />
                              <span>{chapter.title}</span>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#8a9690] shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#8a9690] shrink-0" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="px-4 pb-4 pt-1 border-t border-[#16241f] bg-[#0b100e]/40 space-y-1.5">
                              {chapter.topics.map((topic, tIdx) => (
                                <div key={tIdx} className="text-xs text-[#8a9690] flex items-start gap-2 pl-2">
                                  <span className="text-[#00c878] mt-0.5">•</span>
                                  <span className="leading-relaxed">{topic}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                /* Specialized 1-Day Workshop Practical Agenda & Hands-On Stations (Zero Theory / No Conventional Syllabus) */
                <div className="space-y-4">
                  {/* Workshop Philosophy Header */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#00c878]/15 via-[#121a17] to-[#e6ad54]/15 border border-[#00c878]/40 shadow-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#00c878] text-[#050706] text-[10px] font-mono font-black uppercase tracking-wider">
                          100% Practical Immersion
                        </span>
                        <span className="text-xs font-mono font-bold text-[#e6ad54] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#e6ad54]" />
                          <span>No Theory Exams • Hands-On Hardware Only</span>
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#00c878] font-bold">1 Day • 8 Hours</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-extrabold text-[#f5f7f6]">
                      Action-Oriented Enterprise Networking Lab Experience
                    </h4>
                    <p className="text-xs text-[#8a9690] leading-relaxed">
                      This 1-day workshop eliminates tedious textbook theory. Instead, you spend every minute working with real physical hardware: crimping Ethernet cables, wiring patch panels, accessing Cisco router & switch CLIs, setting up live firewalls, and sniffing network packets inside Jaya TV’s broadcast facility.
                    </p>
                  </div>

                  {/* Real Networking Hardware Lab Image Gallery */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00c878] flex items-center gap-1.5">
                        <Wrench className="w-4 h-4 text-[#00c878]" />
                        <span>Real Hardware & Practical Lab Environments</span>
                      </h4>
                      <span className="text-[10px] font-mono text-[#8a9690]">
                        Click any photo to zoom in HD
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Photo 1: Server Rack & Catalyst Switches */}
                      <div
                        onClick={() => setSelectedLabImage({
                          url: '/networking-workshop-hero.jpg',
                          title: 'Enterprise Server Racks & Cisco Catalyst Infrastructure',
                          tag: 'Enterprise Rackmount Lab',
                          caption: 'Students wire and configure physical Cisco rackmount switches, managed patch panels, Gigabit fiber uplinks, and redundant network paths.'
                        })}
                        className="group relative rounded-2xl overflow-hidden border border-[#16241f] hover:border-[#00c878]/60 bg-[#050706] cursor-pointer transition-all hover:scale-[1.02] shadow-lg"
                      >
                        <div className="h-28 overflow-hidden relative">
                          <img
                            src="/networking-workshop-hero.jpg"
                            alt="Enterprise Cisco Server Rack"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#050706]/80 text-[#00c878] border border-[#00c878]/30 text-[9px] font-mono font-bold">
                            Hardware Racks
                          </span>
                          <div className="absolute bottom-1.5 right-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <div className="p-2.5">
                          <div className="text-[11px] font-bold text-[#f5f7f6] line-clamp-1">Cisco Catalyst & Patch Panels</div>
                          <p className="text-[10px] text-[#8a9690] mt-0.5 line-clamp-2">Physical managed switches, VLAN trunking & server enclosures.</p>
                        </div>
                      </div>

                      {/* Photo 2: RJ45 Crimping & Fluke Tester Drill */}
                      <div
                        onClick={() => setSelectedLabImage({
                          url: '/networking-cabling-drill.jpg',
                          title: 'RJ45 Cat6 Cable Termination & Fluke Continuity Testing',
                          tag: 'Cabling & Crimping Station',
                          caption: 'Mastering T568B color coding standards, modular crimping tools, keystone punch-downs, and testing cable pinouts live on digital testers with 100% PASS verification.'
                        })}
                        className="group relative rounded-2xl overflow-hidden border border-[#16241f] hover:border-[#00c878]/60 bg-[#050706] cursor-pointer transition-all hover:scale-[1.02] shadow-lg"
                      >
                        <div className="h-28 overflow-hidden relative">
                          <img
                            src="/networking-cabling-drill.jpg"
                            alt="RJ45 Crimping Drill & Digital Tester"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#050706]/80 text-[#e6ad54] border border-[#e6ad54]/30 text-[9px] font-mono font-bold">
                            Take-Home Drill
                          </span>
                          <div className="absolute bottom-1.5 right-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <div className="p-2.5">
                          <div className="text-[11px] font-bold text-[#f5f7f6] line-clamp-1">Cat6 Crimping & Digital Testing</div>
                          <p className="text-[10px] text-[#8a9690] mt-0.5 line-clamp-2">Hands-on RJ45 crimping tool and Fluke PASS verification.</p>
                        </div>
                      </div>

                      {/* Photo 3: Managed Switch CLI & Wireshark Console */}
                      <div
                        onClick={() => setSelectedLabImage({
                          url: '/networking-switch-config.jpg',
                          title: 'Switch CLI Configuration & Wireshark Protocol Sniffing',
                          tag: 'Console CLI & Packet Inspection',
                          caption: 'Connecting via serial console cables, configuring VLANs and firewall ACL policies, and capturing live network packets to inspect TCP/IP handshakes.'
                        })}
                        className="group relative rounded-2xl overflow-hidden border border-[#16241f] hover:border-[#00c878]/60 bg-[#050706] cursor-pointer transition-all hover:scale-[1.02] shadow-lg"
                      >
                        <div className="h-28 overflow-hidden relative">
                          <img
                            src="/networking-switch-config.jpg"
                            alt="Switch CLI & Wireshark Terminal"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#050706]/80 text-sky-400 border border-sky-400/30 text-[9px] font-mono font-bold">
                            Wireshark & CLI
                          </span>
                          <div className="absolute bottom-1.5 right-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <div className="p-2.5">
                          <div className="text-[11px] font-bold text-[#f5f7f6] line-clamp-1">CLI Terminal & Wireshark Sniffing</div>
                          <p className="text-[10px] text-[#8a9690] mt-0.5 line-clamp-2">Console access, VLAN isolation & real-time packet graphs.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 6 Hands-On Stations */}
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e6ad54] mb-3 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-[#00c878]" />
                      <span>6 Practical Hands-On Stations You Will Master</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-2xl bg-[#050706] border border-[#16241f] space-y-1.5 hover:border-[#00c878]/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#00c878]/20 text-[#00c878] font-mono text-xs font-bold flex items-center justify-center shrink-0">1</span>
                          <h5 className="font-bold text-[#f5f7f6] text-xs sm:text-sm">RJ45 Cabling & Crimping Drill</h5>
                        </div>
                        <p className="text-xs text-[#8a9690] pl-8 leading-relaxed">
                          Learn T568B color coding standards, strip Cat6 cables, punch down keystones, crimp RJ45 plugs, and test line continuity live with digital LED cable meters. (You take your cable home!)
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#050706] border border-[#16241f] space-y-1.5 hover:border-[#00c878]/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#00c878]/20 text-[#00c878] font-mono text-xs font-bold flex items-center justify-center shrink-0">2</span>
                          <h5 className="font-bold text-[#f5f7f6] text-xs sm:text-sm">Cisco Switch CLI & VLAN Isolation</h5>
                        </div>
                        <p className="text-xs text-[#8a9690] pl-8 leading-relaxed">
                          Plug into physical console ports via serial cables, navigate IOS CLI commands, configure VLANs, trunk links (802.1Q), and isolate corporate network traffic.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#050706] border border-[#16241f] space-y-1.5 hover:border-[#00c878]/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#00c878]/20 text-[#00c878] font-mono text-xs font-bold flex items-center justify-center shrink-0">3</span>
                          <h5 className="font-bold text-[#f5f7f6] text-xs sm:text-sm">Enterprise Routers & Dynamic Routing</h5>
                        </div>
                        <p className="text-xs text-[#8a9690] pl-8 leading-relaxed">
                          Bootstrap enterprise routers, assign IP addressing schemes, subnet masks, default gateways, and configure dynamic OSPF routing between departmental networks.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#050706] border border-[#16241f] space-y-1.5 hover:border-[#00c878]/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#00c878]/20 text-[#00c878] font-mono text-xs font-bold flex items-center justify-center shrink-0">4</span>
                          <h5 className="font-bold text-[#f5f7f6] text-xs sm:text-sm">Hardware Firewalls & Security Policies</h5>
                        </div>
                        <p className="text-xs text-[#8a9690] pl-8 leading-relaxed">
                          Deploy physical firewall appliances, define stateful Access Control Lists (ACLs), configure NAT/PAT internet sharing, and secure switch ports against unauthorized devices.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#050706] border border-[#16241f] space-y-1.5 hover:border-[#00c878]/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#00c878]/20 text-[#00c878] font-mono text-xs font-bold flex items-center justify-center shrink-0">5</span>
                          <h5 className="font-bold text-[#f5f7f6] text-xs sm:text-sm">Wireshark Packet Sniffing & Diagnostics</h5>
                        </div>
                        <p className="text-xs text-[#8a9690] pl-8 leading-relaxed">
                          Capture live network frames, decode TCP 3-way handshakes, DNS lookups, DHCP DORA cycles, and diagnose simulated real-world connection drops and IP conflicts.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#050706] border border-[#16241f] space-y-1.5 hover:border-[#00c878]/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#e6ad54]/20 text-[#e6ad54] font-mono text-xs font-bold flex items-center justify-center shrink-0">6</span>
                          <h5 className="font-bold text-[#f5f7f6] text-xs sm:text-sm">Jaya TV Broadcast Infrastructure Tour</h5>
                        </div>
                        <p className="text-xs text-[#8a9690] pl-8 leading-relaxed">
                          Tour the active Master Control Room (MCR), Production Control Room (PCR), server rack farm, and live video-over-IP encoding pipeline powering on-air 24/7 television.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Day Flow Schedule */}
                  <div className="p-4 rounded-2xl bg-[#0b100e] border border-[#16241f] space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00c878] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#00c878]" />
                      <span>Workshop Day Schedule (9:30 AM – 5:30 PM)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-[#050706] border border-[#16241f]">
                        <div className="text-[#00c878] font-mono font-bold text-[11px]">09:30 AM – 12:30 PM</div>
                        <div className="text-[#f5f7f6] font-semibold mt-0.5">Morning Hardware Boot</div>
                        <p className="text-[#8a9690] text-[11px] mt-1">Rack architecture, tool safety, Cat6 crimping drill, digital tester verification.</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#050706] border border-[#16241f]">
                        <div className="text-[#e6ad54] font-mono font-bold text-[11px]">01:30 PM – 04:00 PM</div>
                        <div className="text-[#f5f7f6] font-semibold mt-0.5">Afternoon CLI & Security</div>
                        <p className="text-[#8a9690] text-[11px] mt-1">Cisco switch CLI, VLANs, dynamic router configuration, hardware firewall rules.</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#050706] border border-[#16241f]">
                        <div className="text-sky-400 font-mono font-bold text-[11px]">04:00 PM – 05:30 PM</div>
                        <div className="text-[#f5f7f6] font-semibold mt-0.5">Broadcast Tour & Awards</div>
                        <p className="text-[#8a9690] text-[11px] mt-1">Wireshark packet sniffing, Jaya TV broadcast floor tour, certificate ceremony.</p>
                      </div>
                    </div>
                  </div>

                  {/* What You Take Home */}
                  <div className="p-3.5 rounded-2xl bg-[#121a17] border border-[#00c878]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#00c878] shrink-0" />
                      <span className="font-bold text-[#f5f7f6]">What Every Participant Takes Home:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#8a9690]">
                      <span className="px-2 py-0.5 rounded bg-[#050706] border border-[#16241f] text-[#00c878]">✓ Verified Cat6 Patch Cable</span>
                      <span className="px-2 py-0.5 rounded bg-[#050706] border border-[#16241f] text-[#e6ad54]">✓ Muthamizh & Jaya TV Certificate</span>
                      <span className="px-2 py-0.5 rounded bg-[#050706] border border-[#16241f] text-[#f5f7f6]">✓ Cisco CLI Reference Cheat-Sheet</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Practical Exposure */}
          <div className="p-4 rounded-2xl bg-[#050706] border border-[#e6ad54]/30 text-xs space-y-1">
            <div className="flex items-center gap-2 font-mono font-bold text-[#e6ad54]">
              <Tv className="w-4 h-4 text-[#e6ad54]" />
              <span>Studio Floor & Practical Project Exposure</span>
            </div>
            <p className="text-[#8a9690] leading-relaxed">
              {course.onlineHandsOn || course.jayaTvHandsOn}
            </p>
          </div>

          {/* Tools & Software Taught */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e6ad54] mb-2 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-[#00c878]" />
              <span>Software Suites, Hardware & Tools</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.tools.map((tool, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-[#050706] border border-[#16241f] text-xs font-mono font-semibold text-[#00c878]">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Career Roles & Eligibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#16241f]">
            <div>
              <h4 className="text-xs font-mono font-bold text-[#8a9690] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#e6ad54]" />
                <span>Eligibility</span>
              </h4>
              <p className="text-[#f5f7f6] font-medium text-xs leading-relaxed">
                {course.eligibility}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-[#8a9690] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#00c878]" />
                <span>Target Career Roles</span>
              </h4>
              <p className="text-[#f5f7f6] font-medium text-xs leading-relaxed">
                {course.careerRoles.join(', ')}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-5 bg-[#050706] border-t border-[#16241f] shrink-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 font-mono">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] font-bold text-xs border border-[#16241f] transition-colors text-center"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              const applyTitle = activeTrack 
                ? `${course.title} (${activeTrack.durationLabel})`
                : course.title;
              if (onOpenApplyModal) {
                onOpenApplyModal(applyTitle);
              } else {
                onOpenAstraWithCourse(applyTitle);
              }
            }}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-extrabold text-xs shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-center"
          >
            <GraduationCap className="w-4 h-4 text-[#050706] shrink-0" />
            <span className="truncate">{activeTrack ? `Apply Now • ${activeTrack.durationLabel} (${activeTrack.fee})` : 'Apply Now'}</span>
          </button>
        </div>

      </div>

      {/* Full-screen Networking Lab Hardware Photo Zoom Overlay */}
      {selectedLabImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedLabImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[92vh] bg-[#0b100e] border border-[#00c878]/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full p-4 bg-[#050706] border-b border-[#16241f] flex items-center justify-between px-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#00c878] uppercase tracking-wider block">
                  {selectedLabImage.tag}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-[#f5f7f6]">
                  {selectedLabImage.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLabImage(null)}
                className="p-2 rounded-full bg-[#121a17] text-[#8a9690] hover:text-white hover:bg-[#1f332a] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-auto max-h-[75vh] p-4 flex flex-col items-center justify-center bg-black/70">
              <img
                src={selectedLabImage.url}
                alt={selectedLabImage.title}
                className="max-h-[62vh] w-auto object-contain rounded-2xl shadow-2xl border border-[#16241f]"
              />
              <p className="text-xs text-[#a0aba5] text-center max-w-2xl mt-4 font-mono leading-relaxed bg-[#050706]/80 px-4 py-2 rounded-xl border border-[#16241f]">
                {selectedLabImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

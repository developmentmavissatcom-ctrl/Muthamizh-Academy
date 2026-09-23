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
  Sparkles, 
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
  Check
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
              <Sparkles className="w-4 h-4 text-[#e6ad54] shrink-0 mt-0.5" />
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

          {/* Detailed Syllabus Chapters / All Lessons List */}
          {(!course.durationTracks || syllabusViewMode === 'all_lessons') && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e6ad54] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#00c878]" />
                  <span>TAMIL NEWS READING CURRICULUM ({course.chapters?.length || 10} Lessons)</span>
                </h3>
                <span className="text-[11px] font-mono text-[#8a9690]">Click to expand topics</span>
              </div>

              <div className="space-y-2.5">
                {course.chapters?.map((chapter, idx) => {
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
            </div>
          )}

          {/* Practical Exposure */}
          <div className="p-4 rounded-2xl bg-[#050706] border border-[#e6ad54]/30 text-xs space-y-1">
            <div className="flex items-center gap-2 font-mono font-bold text-[#e6ad54]">
              <Tv className="w-4 h-4 text-[#e6ad54]" />
              <span>Studio Floor & Practical Project Exposure</span>
            </div>
            <p className="text-[#8a9690] leading-relaxed">
              {course.jayaTvHandsOn}
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
        <div className="p-4 sm:p-5 bg-[#050706] border-t border-[#16241f] shrink-0 flex items-center justify-between gap-3 font-mono">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] font-bold text-xs border border-[#16241f] transition-colors"
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
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4 text-[#050706]" />
            <span>{activeTrack ? `Apply Now • ${activeTrack.durationLabel} (${activeTrack.fee})` : 'Apply Now'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

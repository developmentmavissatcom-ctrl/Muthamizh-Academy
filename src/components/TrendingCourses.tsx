import React, { useState, useMemo } from 'react';
import { Course, CourseCategory } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { 
  Clock, 
  ChevronRight, 
  Bot, 
  Wrench, 
  Radio, 
  Eye, 
  CheckCircle2, 
  Cpu, 
  Award, 
  Layers,
  Globe,
  Laptop,
  BookOpen,
  Filter,
  Search,
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface TrendingCoursesProps {
  onSelectCourse: (course: Course) => void;
  onOpenAstraWithCourse?: (courseName: string) => void;
  onOpenApplyModal: (courseTitle?: string) => void;
  selectedCategory: CourseCategory | 'all' | 'online_only';
  setSelectedCategory: (cat: CourseCategory | 'all' | 'online_only') => void;
}

export const TrendingCourses: React.FC<TrendingCoursesProps> = ({
  onSelectCourse,
  onOpenAstraWithCourse,
  onOpenApplyModal,
  selectedCategory,
  setSelectedCategory
}) => {
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOnlineOnly, setFilterOnlineOnly] = useState(false);

  const onlineCoursesCount = useMemo(() => {
    return COURSES_DATA.filter(c => c.isOnline).length;
  }, []);

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter(course => {
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.description.toLowerCase().includes(query);
        const matchesTools = course.tools.some(t => t.toLowerCase().includes(query));
        const matchesRoles = course.careerRoles.some(r => r.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTools && !matchesRoles) {
          return false;
        }
      }

      // Online Only toggle
      if (filterOnlineOnly || selectedCategory === 'online_only') {
        if (!course.isOnline) return false;
      }

      // Category filter
      if (selectedCategory === 'all' || selectedCategory === 'online_only') {
        return true;
      }

      return course.category === selectedCategory;
    });
  }, [selectedCategory, searchQuery, filterOnlineOnly]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 w-full bg-[#050706] relative" id="courses">
      <div className="w-full max-w-[1920px] mx-auto space-y-10">
        
        {/* Header Title & Description */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f5f7f6] tracking-tight font-sans">
              Media, Television &amp; IT Courses in Chennai
            </h2>
            <p className="text-[#8a9690] text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              Muthamizh Academy offers practical, industry-focused programs across two distinct domains: <strong>Media, Television &amp; Digital Journalism</strong> with hands-on satellite studio training at Jaya TV, and <strong>IT, Software &amp; Networking Education</strong> featuring confirmed tracks in AI-Assisted Software Development, Practical Computer Networking &amp; IT Support, and Manual Software Testing.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, tools, roles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0b100e] border border-[#16241f] text-xs font-mono text-[#f5f7f6] placeholder-[#8a9690] focus:outline-none focus:border-[#00c878]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8a9690] hover:text-[#f5f7f6]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category & Online Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-[#0b100e] border border-[#16241f]">
          
          {/* Main Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setFilterOnlineOnly(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedCategory === 'all' && !filterOnlineOnly
                  ? 'bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] shadow-lg'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#121a17]'
              }`}
            >
              ALL PROGRAMMES ({COURSES_DATA.length})
            </button>

            <button
              onClick={() => {
                setSelectedCategory('online_learning');
                setFilterOnlineOnly(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === 'online_learning'
                  ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-slate-950 shadow-lg'
                  : 'text-sky-400 hover:text-white hover:bg-sky-950/40 border border-sky-900/30'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>ONLINE & VIRTUAL LABS ({COURSES_DATA.filter(c => c.category === 'online_learning').length})</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('pg_diploma');
                setFilterOnlineOnly(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedCategory === 'pg_diploma'
                  ? 'bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] shadow-lg'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#121a17]'
              }`}
            >
              PG DIPLOMA (1 YR)
            </button>

            <button
              onClick={() => {
                setSelectedCategory('short_term');
                setFilterOnlineOnly(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedCategory === 'short_term'
                  ? 'bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] shadow-lg'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#121a17]'
              }`}
            >
              SHORT TERM & WORKSHOPS ({COURSES_DATA.filter(c => c.category === 'short_term').length})
            </button>

            
          </div>

          {/* Quick Online Only Toggle Switch */}
          <button
            onClick={() => setFilterOnlineOnly(!filterOnlineOnly)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              filterOnlineOnly
                ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                : 'bg-[#121a17] border-[#16241f] text-[#8a9690] hover:text-[#f5f7f6]'
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-sky-400" />
            <span>Show Online-Capable Only ({onlineCoursesCount})</span>
          </button>
        </div>

        {/* Featured 1-Day Networking Workshop Spotlight Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0b100e] via-[#121a17] to-[#0b100e] border border-[#00c878]/40 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(0,200,120,0.15)] flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00c878]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left z-10">
            <div 
              onClick={() => {
                const workshop = COURSES_DATA.find(c => c.id === 'one-day-enterprise-networking-workshop');
                if (workshop) onSelectCourse(workshop);
              }}
              className="relative w-28 sm:w-32 h-36 sm:h-40 rounded-2xl overflow-hidden border-2 border-[#00c878]/60 shrink-0 bg-[#050706] group cursor-pointer shadow-xl hover:scale-105 transition-transform"
            >
              <img
                src="/networking-workshop-hero.jpg"
                alt="1-Day Enterprise Networking & Hardware Lab"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-2">
                <span className="text-[10px] font-mono font-bold text-[#00c878] flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Live Lab Details
                </span>
              </div>
            </div>

            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#00c878] text-[#050706] text-[10px] font-mono font-black uppercase tracking-wider">
                  NEW UPCOMING WORKSHOP
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e6ad54]/20 text-[#e6ad54] text-[10px] font-mono font-bold border border-[#e6ad54]/40">
                  1 Day (8 Hours) • Live Hardware Lab
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                  Fee: ₹999
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#f5f7f6] leading-tight">
                1-Day Enterprise Networking &amp; Hardware Hands-On Workshop
              </h3>

              <p className="text-xs sm:text-sm text-[#8a9690] leading-relaxed">
                Step onto the Jaya TV broadcast technical floor. Zero theory overload — 100% hands-on work configuring physical enterprise Cisco routers, managed Gigabit switches, hardware firewalls, RJ45 Cat6 cable crimping, and live Wireshark packet analysis. Crimp and take home your own tested cable and earn an official verified certificate!
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] font-mono text-[#00c878]">
                <span>✓ Physical Cisco Routers &amp; Switches</span>
                <span className="text-[#8a9690]">•</span>
                <span>✓ RJ45 Crimping Drill</span>
                <span className="text-[#8a9690]">•</span>
                <span>✓ Hardware Firewalls</span>
                <span className="text-[#8a9690]">•</span>
                <span>✓ Jaya TV Studio Tour</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto shrink-0 z-10">
            <button
              onClick={() => {
                const workshop = COURSES_DATA.find(c => c.id === 'one-day-enterprise-networking-workshop');
                if (workshop) onSelectCourse(workshop);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#121a17] hover:bg-[#1f332a] text-[#00c878] border border-[#00c878]/40 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 hover:border-[#00c878]"
            >
              <Eye className="w-4 h-4" />
              <span>Workshop Details &amp; Stations</span>
            </button>

            <button
              onClick={() => onOpenApplyModal('1-Day Enterprise Networking & Hardware Hands-On Workshop')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-mono text-xs font-black shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-[#050706]" />
              <span>Register for Workshop (₹999)</span>
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#0b100e] border border-[#16241f] text-[#8a9690] font-mono">
            <BookOpen className="w-8 h-8 text-[#e6ad54] mx-auto mb-3 opacity-60" />
            <p className="text-sm text-[#f5f7f6]">Coming Soon....</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setFilterOnlineOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#00c878] text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredCourses.map((course) => {
              const isHovered = hoveredCourseId === course.id;

              return (
                <div
                  key={course.id}
                  onMouseEnter={() => setHoveredCourseId(course.id)}
                  onMouseLeave={() => setHoveredCourseId(null)}
                  className={`group relative bg-[#0b100e] rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isHovered
                      ? 'border-[#00c878] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,200,120,0.2)] -translate-y-2'
                      : 'border-[#16241f] shadow-lg hover:border-[#00c878]/40'
                  }`}
                >
                  {/* Course Media Frame */}
                  <div className="relative h-48 overflow-hidden bg-[#050706]">
                    <img
                      src={course.image}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b100e] via-[#0b100e]/40 to-transparent" />
                    <div className="absolute inset-0 scanline-effect opacity-20 pointer-events-none" />

                    {/* Program Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                      {course.badge && (
                        <span className="bg-[#00c878] text-[#050706] text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider shadow">
                          {course.badge}
                        </span>
                      )}
                      {course.isOnline && (
                        <span className="bg-sky-950/90 text-sky-400 border border-sky-500/40 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md backdrop-blur-md flex items-center gap-1">
                          <Globe className="w-2.5 h-2.5" />
                          <span>Online Available</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 bg-[#0b100e]/90 text-[#e6ad54] text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-[#e6ad54]/30 backdrop-blur-md">
                      {course.categoryName}
                    </div>

                    {/* Fee badge */}
                    <div className="absolute bottom-3 left-3 bg-[#050706]/90 text-[#e6ad54] text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-[#16241f]">
                      {course.fee}
                    </div>
                  </div>

                  {/* Card Content Information */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Duration & Delivery Mode */}
                      <div className="flex items-center gap-2 text-xs font-mono text-[#8a9690] mb-2">
                        <Clock className="w-3.5 h-3.5 text-[#00c878]" />
                        <span>{course.duration}</span>
                      </div>

                      {/* Course Title */}
                      <h3 className="text-base sm:text-lg font-bold text-[#f5f7f6] group-hover:text-[#00c878] transition-colors leading-snug line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-xs text-[#8a9690] mt-2 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Syllabus Chapters Count or Workshop Tag */}
                    <div className="p-2.5 rounded-xl bg-[#121a17] border border-[#16241f] flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-[#e6ad54]">
                        <BookOpen className="w-3.5 h-3.5 text-[#e6ad54]" />
                        <span>
                          {course.chapters && course.chapters.length > 0
                            ? `${course.chapters.length} Curriculum Lessons`
                            : '1-Day Intensive Practical Workshop'}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#00c878] font-bold">
                        {course.durationTracks 
                          ? '3 Duration Tracks' 
                          : course.chapters && course.chapters.length > 0
                          ? `${course.chapters.length}-Lesson Syllabus`
                          : '100% Hands-On Hardware'}
                      </span>
                    </div>

                    {/* Special Duration Tracks Badges if available */}
                    {course.durationTracks && (
                      <div className="p-2.5 rounded-xl bg-[#050706] border border-[#00c878]/30 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#00c878] uppercase tracking-wider">
                          <span>3 Duration Options</span>
                          <span className="text-[#e6ad54]">Choose Track</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          {course.durationTracks.map(track => (
                            <button
                              key={track.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectCourse(course);
                              }}
                              className="px-1.5 py-1 rounded-lg bg-[#121a17] hover:bg-[#00c878]/20 border border-[#16241f] hover:border-[#00c878]/50 text-[10px] font-mono text-center text-[#f5f7f6] hover:text-[#00c878] transition-colors"
                            >
                              {track.durationLabel}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Gear / Tools Preview */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono font-bold text-[#8a9690] uppercase tracking-wider flex items-center gap-1">
                        <Wrench className="w-3 h-3 text-[#00c878]" />
                        <span>Software & Equipment</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {course.tools.slice(0, 3).map((tool, idx) => (
                          <span key={idx} className="text-[10px] bg-[#050706] text-[#f5f7f6] px-2 py-0.5 rounded-md border border-[#16241f] font-mono">
                            {tool}
                          </span>
                        ))}
                        {course.tools.length > 3 && (
                          <span className="text-[10px] bg-[#050706] text-[#8a9690] px-1.5 py-0.5 rounded-md border border-[#16241f] font-mono">
                            +{course.tools.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Triggers */}
                    <div className="pt-2 border-t border-[#16241f] grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="w-full py-2 px-3 rounded-xl bg-[#050706] hover:bg-[#121a17] text-[#f5f7f6] font-mono font-bold text-xs border border-[#16241f] hover:border-[#00c878]/40 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#00c878]" />
                        <span>{course.chapters && course.chapters.length > 0 ? 'Syllabus' : 'Workshop Info'}</span>
                      </button>

                      <button
                        onClick={() => onOpenApplyModal(course.title)}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-mono font-bold text-xs transition-all shadow-[0_4px_12px_rgba(0,200,120,0.25)] flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                        title="Apply for Admission"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-[#050706]" />
                        <span>Apply Now</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

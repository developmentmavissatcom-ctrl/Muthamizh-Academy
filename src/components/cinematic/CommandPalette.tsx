import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Film, 
  Tv, 
  GraduationCap, 
  Bot, 
  Layers, 
  X, 
  ArrowRight, 
  ShieldCheck,
  Building,
  Users
} from 'lucide-react';
import { COURSES_DATA } from '../../data/coursesData';
import { NavTab, Course } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab) => void;
  onSelectCourse: (course: Course) => void;
  onOpenAstra: (courseContext?: string) => void;
  onOpenApplyModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectCourse,
  onOpenAstra,
  onOpenApplyModal
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Command+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // Controlled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCourses = COURSES_DATA.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.tools.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
    c.careerRoles.some(r => r.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#050706]/85 backdrop-blur-xl flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0b100e] border border-[#16241f] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(0,200,120,0.15)] overflow-hidden">
        
        {/* Search input header */}
        <div className="p-4 border-b border-[#16241f] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#00c878]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs, tools (RED, ARRI, Avid), or commands (⌘K)..."
            className="flex-1 bg-transparent text-[#f5f7f6] placeholder:text-[#8a9690] text-sm focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#121a17]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 text-xs font-sans">
          
          {/* Quick Actions / Navigation */}
          <div>
            <div className="px-3 py-1 text-[10px] font-mono font-bold text-[#8a9690] uppercase tracking-wider">
              Quick Actions
            </div>
            <div className="space-y-1 mt-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenApplyModal();
                }}
                className="w-full p-2.5 px-3 rounded-xl hover:bg-[#121a17] text-left text-[#f5f7f6] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#00c878]" />
                  <span className="font-semibold">Submit Admission Application 2026</span>
                </div>
                <span className="text-[10px] font-mono text-[#00c878]">Action</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenAstra();
                }}
                className="w-full p-2.5 px-3 rounded-xl hover:bg-[#121a17] text-left text-[#f5f7f6] flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Bot className="w-4 h-4 text-[#e6ad54]" />
                  <span className="font-semibold">Talk to Astra AI Counselor</span>
                </div>
                <span className="text-[10px] font-mono text-[#e6ad54]">AI Help</span>
              </button>
            </div>
          </div>

          {/* Academic Courses */}
          <div>
            <div className="px-3 py-1 text-[10px] font-mono font-bold text-[#8a9690] uppercase tracking-wider">
              Programs & Courses ({filteredCourses.length})
            </div>
            <div className="space-y-1 mt-1">
              {filteredCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => {
                    onClose();
                    onSelectCourse(course);
                  }}
                  className="w-full p-2.5 px-3 rounded-xl hover:bg-[#121a17] text-left text-[#f5f7f6] flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Film className="w-4 h-4 text-[#00c878]" />
                    <div>
                      <span className="font-semibold block">{course.title}</span>
                      <span className="text-[11px] text-[#8a9690]">{course.duration} • {course.fee}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8a9690] group-hover:text-[#00c878] group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Views */}
          <div>
            <div className="px-3 py-1 text-[10px] font-mono font-bold text-[#8a9690] uppercase tracking-wider">
              Campus Sections
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1">
              <button
                onClick={() => {
                  onClose();
                  onNavigate('about');
                }}
                className="p-2 px-3 rounded-xl hover:bg-[#121a17] text-left text-[#8a9690] hover:text-[#f5f7f6] flex items-center gap-2"
              >
                <Building className="w-3.5 h-3.5 text-[#00c878]" />
                <span>About Muthamizh Academy</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigate('campus');
                }}
                className="p-2 px-3 rounded-xl hover:bg-[#121a17] text-left text-[#8a9690] hover:text-[#f5f7f6] flex items-center gap-2"
              >
                <Tv className="w-3.5 h-3.5 text-[#e6ad54]" />
                <span>Studio Floor Infrastructure</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigate('faculty');
                }}
                className="p-2 px-3 rounded-xl hover:bg-[#121a17] text-left text-[#8a9690] hover:text-[#f5f7f6] flex items-center gap-2"
              >
                <Users className="w-3.5 h-3.5 text-[#00c878]" />
                <span>Jaya TV Faculty & Mentors</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigate('admin');
                }}
                className="p-2 px-3 rounded-xl hover:bg-[#121a17] text-left text-[#8a9690] hover:text-[#f5f7f6] flex items-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#e6ad54]" />
                <span>Admissions Control Center</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Navigation Hints */}
        <div className="p-3 bg-[#050706] border-t border-[#16241f] flex items-center justify-between text-[11px] font-mono text-[#8a9690]">
          <span>Use <strong>ESC</strong> to dismiss</span>
          <span>Muthamizh Studios Command Palette</span>
        </div>

      </div>
    </div>
  );
};

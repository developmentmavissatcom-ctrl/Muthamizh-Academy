import React, { useState } from 'react';
import { NavTab, CourseCategory, UserProfile, PortalMode } from '../types';
import { MuthamizhLogo } from './MuthamizhLogo';
import { 
  Radio, 
  ChevronDown, 
  Sparkles, 
  GraduationCap, 
  Award, 
  Layers, 
  BookOpen, 
  ShieldCheck, 
  Search, 
  Tv, 
  Camera, 
  Menu, 
  X, 
  User, 
  LogOut,
  SlidersHorizontal,
  Lock
} from 'lucide-react';

interface HeaderNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  portalMode: PortalMode;
  setPortalMode: (mode: PortalMode) => void;
  onSelectCategory?: (category: CourseCategory) => void;
  onOpenAstra: () => void;
  onOpenApplyModal: () => void;
  registrationsCount: number;
  onReplayIntro?: () => void;
  onOpenCommandPalette: () => void;
  isStudioMode: boolean;
  onToggleStudioMode: () => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenUserProfile: () => void;
  onOpenFacultyLogin: () => void;
  onLogout?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  portalMode,
  setPortalMode,
  onSelectCategory,
  onOpenAstra,
  onOpenApplyModal,
  registrationsCount,
  onReplayIntro,
  onOpenCommandPalette,
  isStudioMode,
  onToggleStudioMode,
  currentUser,
  onOpenAuthModal,
  onOpenUserProfile,
  onOpenFacultyLogin,
  onLogout
}) => {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isFacultyUser = currentUser && (currentUser.role === 'faculty' || currentUser.role === 'admin');

  const handleCategoryClick = (category: CourseCategory) => {
    setActiveTab('courses');
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    setCoursesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSwitchToStudent = () => {
    setPortalMode('student');
    localStorage.setItem('muthamizh_portal_mode', 'student');
    if (activeTab === 'faculty_portal') {
      setActiveTab('home');
    }
  };

  const handleSwitchToFaculty = () => {
    setPortalMode('faculty');
    localStorage.setItem('muthamizh_portal_mode', 'faculty');
    setActiveTab('faculty_portal');
  };

  const handleDirectLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('muthamizh_auth_token');
      localStorage.removeItem('muthamizh_auth_user');
      localStorage.setItem('muthamizh_portal_mode', 'student');
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#050706]/95 backdrop-blur-2xl border-b border-[#16241f] text-[#f5f7f6] shadow-2xl w-full">
      
      {/* Primary Brand & Navigation Header (Top telemetry strip removed per user request) */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Official Brand Logo */}
        <button
          onClick={() => {
            if (portalMode === 'faculty') {
              setActiveTab('faculty_portal');
            } else {
              setActiveTab('home');
            }
          }}
          className="text-left group focus:outline-none shrink-0"
        >
          <MuthamizhLogo size="md" showSubtext={true} />
        </button>

        {/* Center: Navigation Links */}
        {portalMode === 'student' ? (
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/50 shadow-md'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/50 shadow-md'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              About Us
            </button>

            {/* Courses Mega Dropdown */}
            <div className="relative group">
              <button
                onClick={() => {
                  setActiveTab('courses');
                  setCoursesDropdownOpen(!coursesDropdownOpen);
                }}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'courses'
                    ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/50 shadow-md'
                    : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
                }`}
              >
                <span>Courses</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#070b09] border border-[#16241f] rounded-2xl shadow-2xl p-2 hidden group-hover:block animate-in fade-in zoom-in-95 duration-150 z-50">
                <div className="px-3 py-2 text-[10px] font-mono text-[#8a9690] uppercase tracking-wider border-b border-[#16241f] flex items-center justify-between">
                  <span>11 Specializations</span>
                  <span className="text-[#00c878]">2026 Batch</span>
                </div>
                
                <button
                  onClick={() => handleCategoryClick('pg_diploma')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#121a17] hover:text-[#00c878] transition-colors flex items-center gap-2 text-[#f5f7f6]"
                >
                  <Tv className="w-3.5 h-3.5 text-[#00c878]" />
                  <span>PG Diploma (1 Year)</span>
                </button>

                <button
                  onClick={() => handleCategoryClick('short_term')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#121a17] hover:text-[#00c878] transition-colors flex items-center gap-2 text-[#f5f7f6]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#e6ad54]" />
                  <span>Certificate & Fast-Track (3-6 Mos)</span>
                </button>

                <button
                  onClick={() => handleCategoryClick('evening_weekend')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#121a17] hover:text-[#00c878] transition-colors flex items-center gap-2 text-[#f5f7f6]"
                >
                  <Layers className="w-3.5 h-3.5 text-[#00c878]" />
                  <span>Weekend & Executive Masterclasses</span>
                </button>

                <button
                  onClick={() => handleCategoryClick('online_learning')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#121a17] hover:text-[#00c878] transition-colors flex items-center gap-2 text-[#f5f7f6]"
                >
                  <Award className="w-3.5 h-3.5 text-[#e6ad54]" />
                  <span>Online & Virtual Labs</span>
                </button>

                <div className="border-t border-[#16241f] mt-1 pt-1">
                  <button
                    onClick={() => {
                      setActiveTab('courses');
                      if (onSelectCategory) onSelectCategory('all');
                      setCoursesDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-mono font-bold text-[#00c878] hover:bg-[#121a17] transition-colors flex items-center justify-between"
                  >
                    <span>View All Programs</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('campus')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'campus'
                  ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/50 shadow-md'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              Campus Life
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/50 shadow-md'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              <Camera className="w-4 h-4 text-[#00c878]" />
              <span>Gallery</span>
            </button>

            <button
              onClick={() => setActiveTab('faculty')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'faculty'
                  ? 'bg-[#121a17] text-[#00c878] border border-[#00c878]/50 shadow-md'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              Faculty
            </button>

            {/* Highlighted Student Tracker Link */}
            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'tracker'
                  ? 'bg-[#00c878]/20 text-[#00c878] border border-[#00c878] shadow-md font-mono'
                  : 'text-[#00c878] hover:bg-[#121a17] font-mono'
              }`}
              title="Track Your Application Progress"
            >
              <Radio className="w-3.5 h-3.5 text-[#00c878] animate-pulse" />
              <span>My Tracker</span>
            </button>
          </nav>
        ) : (
          /* Faculty Mode Center Badge */
          <div className="hidden lg:flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-[#e6ad54]/10 border border-[#e6ad54]/30 text-xs font-mono text-[#e6ad54] flex items-center gap-2 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-[#e6ad54]" />
              <span className="font-bold">Exclusive Faculty Admissions & Candidate Processing Console</span>
            </div>
          </div>
        )}

        {/* Right Section: Command Palette Trigger, Role Auth CTA & Apply Button */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Quick Search / Command Palette (⌘K) */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0b100e] hover:bg-[#121a17] text-[#8a9690] hover:text-[#f5f7f6] border border-[#16241f] text-xs font-mono transition-all"
            title="Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-[#00c878]" />
            <span>Search</span>
          </button>

          {/* USER AUTH & PORTAL STATE */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              {/* Logged in User Pill */}
              <button
                onClick={isFacultyUser ? handleSwitchToFaculty : onOpenUserProfile}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0b100e] hover:bg-[#121a17] text-[#f5f7f6] border text-xs font-mono transition-all group ${
                  isFacultyUser ? 'border-[#e6ad54]/50 hover:border-[#e6ad54]' : 'border-[#00c878]/50 hover:border-[#00c878]'
                }`}
                title={isFacultyUser ? "Faculty Console" : "Open Candidate Status & Updates"}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs border ${
                  isFacultyUser 
                    ? 'bg-[#e6ad54]/20 text-[#e6ad54] border-[#e6ad54]/40'
                    : 'bg-[#00c878]/20 text-[#00c878] border-[#00c878]/40'
                }`}>
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold leading-tight flex items-center gap-1">
                    <span>{currentUser.fullName.split(' ')[0]}</span>
                    {isFacultyUser ? (
                      <ShieldCheck className="w-3 h-3 text-[#e6ad54]" />
                    ) : (
                      <GraduationCap className="w-3 h-3 text-[#00c878]" />
                    )}
                  </div>
                  <div className={`text-[10px] leading-none ${isFacultyUser ? 'text-[#e6ad54]' : 'text-[#8a9690]'}`}>
                    {isFacultyUser ? 'Faculty Staff' : (currentUser.applicationId || 'Enrolled')}
                  </div>
                </div>
              </button>

              {/* Direct Logout Button */}
              <button
                onClick={handleDirectLogout}
                className="p-2 rounded-xl bg-[#0b100e] hover:bg-rose-950/40 text-[#8a9690] hover:text-rose-400 border border-[#16241f] hover:border-rose-800/50 transition-all"
                title={`Log Out (${currentUser.role === 'faculty' ? 'Faculty' : 'Student'})`}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Not logged in: Sign in CTA with Role Selection in Modal */
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0b100e] hover:bg-[#121a17] text-[#00c878] hover:text-[#f5f7f6] border border-[#00c878]/40 hover:border-[#00c878] text-xs font-mono font-bold transition-all shadow-sm"
              title="Sign In or Register (Select Student or Faculty Portal)"
            >
              <User className="w-3.5 h-3.5 text-[#00c878]" />
              <span>Sign In / Portal</span>
            </button>
          )}

          {/* If viewing faculty workspace, provide a quick return button to student view */}
          {portalMode === 'faculty' ? (
            <button
              onClick={handleSwitchToStudent}
              className="px-3.5 py-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#00c878] border border-[#00c878]/40 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
              title="Return to Student View"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Student View</span>
            </button>
          ) : (
            /* Student Apply CTA */
            <button
              onClick={onOpenApplyModal}
              className="relative group overflow-hidden rounded-xl px-4 py-2 bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-extrabold text-xs sm:text-sm shadow-[0_5px_20px_rgba(0,200,120,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 border border-[#00c878]/60 font-mono"
            >
              <span>Apply Now</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#0b100e] hover:bg-[#121a17] text-[#8a9690] hover:text-[#f5f7f6] border border-[#16241f] transition-colors"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#00c878]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b09] border-b border-[#16241f] px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          
          {/* Mobile User Profile or Sign In */}
          {currentUser ? (
            <div className="p-3 rounded-2xl bg-[#0b100e] border border-[#16241f] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm border ${
                  isFacultyUser 
                    ? 'bg-[#e6ad54]/20 text-[#e6ad54] border-[#e6ad54]/40'
                    : 'bg-[#00c878]/20 text-[#00c878] border-[#00c878]/40'
                }`}>
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#f5f7f6]">{currentUser.fullName}</div>
                  <div className="text-[10px] text-[#8a9690] font-mono">
                    {currentUser.role === 'faculty' ? 'Faculty Staff' : (currentUser.admissionStatus || 'Student')}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  handleDirectLogout();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-950/40 text-rose-300 border border-rose-800/40 text-xs font-mono font-bold flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAuthModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl bg-[#121a17] text-[#00c878] border border-[#00c878]/50 text-sm font-semibold flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#00c878]" />
              <span>Sign In / Select Portal (Student or Faculty)</span>
            </button>
          )}

          {/* Links */}
          {portalMode === 'student' ? (
            <div className="space-y-1 pt-1">
              <button
                onClick={() => {
                  setActiveTab('home');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#121a17] text-[#f5f7f6]"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveTab('about');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#121a17] text-[#f5f7f6]"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  setActiveTab('courses');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#121a17] text-[#f5f7f6]"
              >
                Courses (11 Programs)
              </button>
              <button
                onClick={() => {
                  setActiveTab('campus');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#121a17] text-[#f5f7f6]"
              >
                Campus Life & Amenities
              </button>
              <button
                onClick={() => {
                  setActiveTab('faculty');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#121a17] text-[#f5f7f6]"
              >
                Faculty
              </button>
              <button
                onClick={() => {
                  setActiveTab('gallery');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#121a17] text-[#f5f7f6]"
              >
                Gallery
              </button>
              <button
                onClick={() => {
                  setActiveTab('tracker');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-mono font-bold bg-[#00c878]/15 text-[#00c878] border border-[#00c878]/30 flex items-center gap-2"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>My Application Tracker</span>
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-[#121a17] text-xs font-mono text-[#e6ad54] border border-[#e6ad54]/30 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#e6ad54]" />
                <span className="font-bold">Faculty Admissions Desk</span>
              </div>
              <button
                onClick={() => {
                  handleSwitchToStudent();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 rounded-lg bg-[#00c878] text-[#050706] font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Switch to Student View</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

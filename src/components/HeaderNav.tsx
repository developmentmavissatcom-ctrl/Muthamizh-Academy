import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NavTab, CourseCategory, UserProfile, PortalMode } from '../types';
import { MuthamizhLogo } from './MuthamizhLogo';
import { 
  Radio, 
  ChevronDown, 
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050706]/95 backdrop-blur-2xl border-b border-[#16241f] text-[#f5f7f6] shadow-2xl w-full">
      
      {/* Primary Brand & Navigation Header (Top telemetry strip removed per user request) */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Official Brand Logo */}
        <a
          href={portalMode === 'faculty' ? '/faculty-portal' : '/'}
          onClick={(e) => {
            e.preventDefault();
            if (portalMode === 'faculty') {
              setActiveTab('faculty_portal');
            } else {
              setActiveTab('home');
            }
          }}
          className="text-left group focus:outline-none shrink-0"
          aria-label="Muthamizh Academy Home"
        >
          <MuthamizhLogo size="md" showSubtext={true} />
        </a>

        {/* Center: Navigation Links */}
        {portalMode === 'student' ? (
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('home');
              }}
              className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'home'
                  ? 'text-[#00c878]'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              {activeTab === 'home' && (
                <>
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#121a17] border border-[#00c878]/50 rounded-xl shadow-md z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-transparent via-[#00c878] to-transparent rounded-full shadow-[0_0_8px_rgba(0,200,120,0.8)] z-10"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  />
                </>
              )}
              <span className="relative z-10">Home</span>
            </a>

            {/* Courses Mega Dropdown */}
            <div className="relative group">
              <a
                href="/courses"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('courses');
                  setCoursesDropdownOpen(!coursesDropdownOpen);
                }}
                className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'courses'
                    ? 'text-[#00c878]'
                    : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
                }`}
              >
                {activeTab === 'courses' && (
                  <>
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#121a17] border border-[#00c878]/50 rounded-xl shadow-md z-0"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-transparent via-[#00c878] to-transparent rounded-full shadow-[0_0_8px_rgba(0,200,120,0.8)] z-10"
                      transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                    />
                  </>
                )}
                <span className="relative z-10 flex items-center gap-1">
                  <span>Courses</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </span>
              </a>

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
                  <Award className="w-3.5 h-3.5 text-[#e6ad54]" />
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

            <a
              href="/campus"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('campus');
              }}
              className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'campus'
                  ? 'text-[#00c878]'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              {activeTab === 'campus' && (
                <>
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#121a17] border border-[#00c878]/50 rounded-xl shadow-md z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-transparent via-[#00c878] to-transparent rounded-full shadow-[0_0_8px_rgba(0,200,120,0.8)] z-10"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  />
                </>
              )}
              <span className="relative z-10">Campus Life</span>
            </a>

            <a
              href="/gallery"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('gallery');
              }}
              className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'text-[#00c878]'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              {activeTab === 'gallery' && (
                <>
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#121a17] border border-[#00c878]/50 rounded-xl shadow-md z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-transparent via-[#00c878] to-transparent rounded-full shadow-[0_0_8px_rgba(0,200,120,0.8)] z-10"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  />
                </>
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#00c878]" />
                <span>Gallery</span>
              </span>
            </a>

            <a
              href="/faculty"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('faculty');
              }}
              className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'faculty'
                  ? 'text-[#00c878]'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              {activeTab === 'faculty' && (
                <>
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#121a17] border border-[#00c878]/50 rounded-xl shadow-md z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-transparent via-[#00c878] to-transparent rounded-full shadow-[0_0_8px_rgba(0,200,120,0.8)] z-10"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  />
                </>
              )}
              <span className="relative z-10">Faculty</span>
            </a>

            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('about');
              }}
              className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === 'about'
                  ? 'text-[#00c878]'
                  : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
              }`}
            >
              {activeTab === 'about' && (
                <>
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#121a17] border border-[#00c878]/50 rounded-xl shadow-md z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-transparent via-[#00c878] to-transparent rounded-full shadow-[0_0_8px_rgba(0,200,120,0.8)] z-10"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  />
                </>
              )}
              <span className="relative z-10">About Us</span>
            </a>

            {/* Highlighted Student Tracker Link */}
            <a
              href="/tracker"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('tracker');
              }}
              className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'tracker'
                  ? 'text-[#00c878]'
                  : 'text-[#00c878] hover:bg-[#121a17]'
              }`}
              title="Track Your Application Progress"
            >
              {activeTab === 'tracker' && (
                <>
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#00c878]/20 border border-[#00c878] rounded-xl shadow-md z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-[#00c878] rounded-full shadow-[0_0_8px_rgba(0,200,120,0.9)] z-10"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  />
                </>
              )}
              <span className="relative z-10 flex items-center gap-1.5 font-mono">
                <Radio className="w-3.5 h-3.5 text-[#00c878] animate-pulse" />
                <span>My Tracker</span>
              </span>
            </a>
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
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Logged in User Pill */}
              <button
                onClick={isFacultyUser ? handleSwitchToFaculty : onOpenUserProfile}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-[#0b100e] hover:bg-[#121a17] text-[#f5f7f6] border text-xs font-mono transition-all group ${
                  isFacultyUser ? 'border-[#e6ad54]/50 hover:border-[#e6ad54]' : 'border-[#00c878]/50 hover:border-[#00c878]'
                }`}
                title={isFacultyUser ? "Faculty Console" : "Open Candidate Status & Updates"}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs border shrink-0 ${
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
                className="p-2 rounded-xl bg-[#0b100e] hover:bg-rose-950/40 text-[#8a9690] hover:text-rose-400 border border-[#16241f] hover:border-rose-800/50 transition-all shrink-0"
                title={`Log Out (${currentUser.role === 'faculty' ? 'Faculty' : 'Student'})`}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Not logged in: Sign in CTA with Role Selection in Modal */
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl bg-[#0b100e] hover:bg-[#121a17] text-[#00c878] hover:text-[#f5f7f6] border border-[#00c878]/40 hover:border-[#00c878] text-xs font-mono font-bold transition-all shadow-sm shrink-0"
              title="Sign In or Register (Select Student or Faculty Portal)"
            >
              <User className="w-3.5 h-3.5 text-[#00c878]" />
              <span className="hidden sm:inline">Sign In / Portal</span>
            </button>
          )}

          {/* If viewing faculty workspace, provide a quick return button to student view */}
          {portalMode === 'faculty' ? (
            <button
              onClick={handleSwitchToStudent}
              className="px-2.5 sm:px-3.5 py-2 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#00c878] border border-[#00c878]/40 font-mono text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
              title="Return to Student View"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Student View</span>
            </button>
          ) : (
            /* Student Apply CTA */
            <button
              onClick={onOpenApplyModal}
              className="relative group overflow-hidden rounded-xl px-3 sm:px-4 py-2 bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-extrabold text-xs sm:text-sm shadow-[0_5px_20px_rgba(0,200,120,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border border-[#00c878]/60 font-mono shrink-0 whitespace-nowrap"
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
            <div className="space-y-1.5 pt-1" aria-label="Mobile Navigation">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('home');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  activeTab === 'home'
                    ? 'bg-[#121a17] text-[#00c878] font-bold border border-[#00c878]/40 shadow-sm'
                    : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
                }`}
              >
                <span>Home</span>
                {activeTab === 'home' && <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />}
              </a>
              <a
                href="/courses"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('courses');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  activeTab === 'courses'
                    ? 'bg-[#121a17] text-[#00c878] font-bold border border-[#00c878]/40 shadow-sm'
                    : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
                }`}
              >
                <span>Courses (11 Programs)</span>
                {activeTab === 'courses' && <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />}
              </a>
              <a
                href="/campus"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('campus');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  activeTab === 'campus'
                    ? 'bg-[#121a17] text-[#00c878] font-bold border border-[#00c878]/40 shadow-sm'
                    : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
                }`}
              >
                <span>Campus Life & Amenities</span>
                {activeTab === 'campus' && <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />}
              </a>
              <a
                href="/gallery"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('gallery');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  activeTab === 'gallery'
                    ? 'bg-[#121a17] text-[#00c878] font-bold border border-[#00c878]/40 shadow-sm'
                    : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
                }`}
              >
                <span>Gallery</span>
                {activeTab === 'gallery' && <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />}
              </a>
              <a
                href="/faculty"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('faculty');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  activeTab === 'faculty'
                    ? 'bg-[#121a17] text-[#00c878] font-bold border border-[#00c878]/40 shadow-sm'
                    : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
                }`}
              >
                <span>Faculty</span>
                {activeTab === 'faculty' && <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />}
              </a>
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('about');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                  activeTab === 'about'
                    ? 'bg-[#121a17] text-[#00c878] font-bold border border-[#00c878]/40 shadow-sm'
                    : 'text-[#8a9690] hover:text-[#f5f7f6] hover:bg-[#0b100e]'
                }`}
              >
                <span>About Us</span>
                {activeTab === 'about' && <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />}
              </a>
              <a
                href="/tracker"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('tracker');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-mono font-bold transition-all flex items-center justify-between ${
                  activeTab === 'tracker'
                    ? 'bg-[#00c878]/25 text-[#00c878] border border-[#00c878] shadow-sm'
                    : 'bg-[#00c878]/10 text-[#00c878] border border-[#00c878]/30 hover:bg-[#00c878]/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>My Application Tracker</span>
                </div>
                {activeTab === 'tracker' && <span className="w-1.5 h-1.5 rounded-full bg-[#00c878]" />}
              </a>
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

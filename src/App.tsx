import React, { useState, useEffect } from 'react';
import { NavTab, CourseCategory, Course, RegistrationRecord, UserProfile, PortalMode } from './types';
import { HeaderNav } from './components/HeaderNav';
import { BroadcastHero } from './components/cinematic/BroadcastHero';
import { AcademySignalWidget } from './components/cinematic/AcademySignalWidget';
import { CommandPalette } from './components/cinematic/CommandPalette';
import { IntroSequence } from './components/cinematic/IntroSequence';
import { ScrollVideoBackground } from './components/ScrollVideoBackground';
import { TrendingCourses } from './components/TrendingCourses';
import { AstraAICounselor } from './components/AstraAICounselor';
import { AboutSection } from './components/AboutSection';
import { CampusLifeSection } from './components/CampusLifeSection';
import { FacultySection } from './components/FacultySection';
import { CourseModal } from './components/CourseModal';
import { ApplicationFormModal } from './components/ApplicationFormModal';
import { AdminRegistrationsModal } from './components/AdminRegistrationsModal';
import { AuthModal } from './components/auth/AuthModal';
import { UserProfileModal } from './components/auth/UserProfileModal';
import { GallerySection } from './components/GallerySection';
import { Footer } from './components/Footer';
import { COURSES_DATA } from './data/coursesData';
import { StudentApplicationTracker } from './components/student/StudentApplicationTracker';
import { FacultyPortal } from './components/faculty/FacultyPortal';

export default function App() {
  const [portalMode, setPortalMode] = useState<PortalMode>(() => {
    const saved = localStorage.getItem('muthamizh_portal_mode') as PortalMode;
    return saved === 'faculty' ? 'faculty' : 'student';
  });
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedCourseCategory, setSelectedCourseCategory] = useState<CourseCategory | 'all'>('all');
  
  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('muthamizh_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signup' | 'login'>('signup');
  const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);

  // Cinematic Intro Sequence State with localStorage persistence
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    const viewed = localStorage.getItem('muthamizh_intro_viewed');
    return !viewed;
  });

  // Studio Mode State
  const [isStudioMode, setIsStudioMode] = useState<boolean>(true);

  // Command Palette State (⌘K)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Modals state
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [astraOpen, setAstraOpen] = useState(false);
  const [astraCourseContext, setAstraCourseContext] = useState<string | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedProgramForApply, setSelectedProgramForApply] = useState<string | undefined>(undefined);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const handleOpenApplyModal = (programTitle?: string) => {
    setSelectedProgramForApply(programTitle);
    setApplyModalOpen(true);
  };

  // Registrations Counter
  const [registrationsCount, setRegistrationsCount] = useState(2);

  const fetchRegistrationsCount = async () => {
    try {
      const res = await fetch('/api/registrations');
      const data = await res.json();
      if (typeof data.count === 'number') {
        setRegistrationsCount(data.count);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRegistrationsCount();
  }, []);

  // Validate active auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('muthamizh_auth_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.user) {
            setCurrentUser(data.user);
            localStorage.setItem('muthamizh_auth_user', JSON.stringify(data.user));
          }
        })
        .catch(err => console.error('Failed to restore user session:', err));
    }
  }, []);

  // Check if there is an active pending OTP verification in session
  useEffect(() => {
    if (!currentUser) {
      try {
        const pending = sessionStorage.getItem('muthamizh_pending_signup');
        if (pending) {
          const parsed = JSON.parse(pending);
          if (parsed && parsed.timestamp && (Date.now() - parsed.timestamp < 15 * 60 * 1000)) {
            setAuthModalOpen(true);
            setAuthModalMode('signup');
          }
        }
      } catch (e) {}
    }
  }, [currentUser]);

  // First-time user prompt on website open:
  // When website is opened and no user is signed in, prompt them to sign up for updates and status tracking!
  useEffect(() => {
    if (!showIntro && !currentUser) {
      const hasPrompted = sessionStorage.getItem('muthamizh_welcome_prompted');
      if (!hasPrompted) {
        sessionStorage.setItem('muthamizh_welcome_prompted', 'true');
        const timer = setTimeout(() => {
          setAuthModalMode('signup');
          setAuthModalOpen(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    }
  }, [showIntro, currentUser]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    if (!currentUser) {
      setTimeout(() => {
        setAuthModalMode('signup');
        setAuthModalOpen(true);
      }, 400);
    }
  };

  const handleAuthSuccess = (user: UserProfile, token: string) => {
    setCurrentUser(user);
    localStorage.setItem('muthamizh_auth_user', JSON.stringify(user));
    localStorage.setItem('muthamizh_auth_token', token);
    if (user.role === 'faculty') {
      setPortalMode('faculty');
      localStorage.setItem('muthamizh_portal_mode', 'faculty');
      setActiveTab('faculty_portal');
    }
    fetchRegistrationsCount();
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('muthamizh_auth_token');
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {}
    }
    setCurrentUser(null);
    localStorage.removeItem('muthamizh_auth_token');
    localStorage.removeItem('muthamizh_auth_user');
    setPortalMode('student');
    localStorage.setItem('muthamizh_portal_mode', 'student');
    setActiveTab('home');
  };

  // When activeTab changes
  useEffect(() => {
    if (activeTab === 'admin') {
      setAdminModalOpen(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  // Global keydown for ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenAstraWithCourse = (courseTitle: string) => {
    setAstraCourseContext(courseTitle);
    setAstraOpen(true);
  };

  const handleSelectCourseById = (courseId: string) => {
    const course = COURSES_DATA.find(c => c.id === courseId);
    if (course) {
      setSelectedCourseForModal(course);
    }
  };

  const handleRegistrationSuccess = (record: RegistrationRecord) => {
    setRegistrationsCount(prev => prev + 1);
    if (currentUser) {
      const updatedUser: UserProfile = {
        ...currentUser,
        applicationId: record.id,
        admissionStatus: 'Application Submitted',
        programInterest: record.program_interest
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('muthamizh_auth_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <div className={`relative min-h-screen bg-[#050706] text-[#f5f7f6] font-sans selection:bg-[#00c878] selection:text-[#050706] flex flex-col justify-between w-full overflow-x-hidden ${
      isStudioMode ? 'studio-mode' : ''
    }`}>
      
      {/* Scroll-Synced Overall Background Video */}
      <ScrollVideoBackground videoSrc="/BG.mp4" />

      {/* Cinematic Waveform & 4K Video Intro Overlay */}
      {showIntro && (
        <IntroSequence
          videoSrc="/intro.mp4"
          onComplete={handleIntroComplete}
        />
      )}

      {/* Top Header & Navigation */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'admin') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        portalMode={portalMode}
        setPortalMode={setPortalMode}
        onSelectCategory={(cat) => setSelectedCourseCategory(cat)}
        onOpenAstra={() => {
          setAstraCourseContext(null);
          setAstraOpen(true);
        }}
        onOpenApplyModal={() => setApplyModalOpen(true)}
        registrationsCount={registrationsCount}
        onReplayIntro={() => setShowIntro(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isStudioMode={isStudioMode}
        onToggleStudioMode={() => setIsStudioMode(prev => !prev)}
        currentUser={currentUser}
        onOpenAuthModal={() => {
          setAuthModalMode('login');
          setAuthModalOpen(true);
        }}
        onOpenFacultyLogin={() => {
          setPortalMode('faculty');
          setActiveTab('faculty_portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenUserProfile={() => setUserProfileModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full">
        
        {/* EXCLUSIVE FACULTY ADMISSIONS DESK */}
        {(portalMode === 'faculty' || activeTab === 'faculty_portal') ? (
          <div className="pt-2 pb-16 animate-in fade-in w-full">
            <FacultyPortal
              currentUser={currentUser}
              onFacultyLogout={handleLogout}
              onSwitchToStudentView={() => {
                setPortalMode('student');
                localStorage.setItem('muthamizh_portal_mode', 'student');
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToFacultyTab={() => {
                setPortalMode('student');
                localStorage.setItem('muthamizh_portal_mode', 'student');
                setActiveTab('faculty');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onFacultyLoginSuccess={(user) => {
                const token = localStorage.getItem('muthamizh_auth_token') || '';
                handleAuthSuccess(user, token);
              }}
            />
          </div>
        ) : (
          <>
            {/* STUDENT APPLICATION PROGRESS TRACKER VIEW */}
            {activeTab === 'tracker' && (
              <div className="pt-8 pb-20 px-4 sm:px-6 max-w-5xl mx-auto animate-in fade-in w-full">
                <StudentApplicationTracker
                  currentUser={currentUser}
                  onOpenAuthModal={() => {
                    setAuthModalMode('login');
                    setAuthModalOpen(true);
                  }}
                  onOpenApplyModal={handleOpenApplyModal}
                />
              </div>
            )}

            {/* HOME VIEW: Studio OS Broadcast Experience */}
            {activeTab === 'home' && (
              <div className="space-y-0 w-full">
                
                {/* Broadcast Control Room Hero */}
                <BroadcastHero
                  onOpenAstra={() => {
                    setAstraCourseContext(null);
                    setAstraOpen(true);
                  }}
                  onExploreCourses={() => {
                    setActiveTab('courses');
                    const el = document.getElementById('courses-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenApplyModal={() => setApplyModalOpen(true)}
                  onOpenDiscovery={() => {
                    const el = document.getElementById('discovery-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* Student Quick Status & Application Bar */}
                <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-6">
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0b100e] via-[#121a17] to-[#0b100e] border border-[#00c878]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00c878]/20 text-[#00c878] flex items-center justify-center border border-[#00c878]/40">
                        <span className="w-3 h-3 rounded-full bg-[#00c878] animate-ping" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#f5f7f6] font-mono flex items-center gap-2">
                          <span>Student Admissions & Live Status Tracker</span>
                          <span className="text-[10px] bg-[#00c878] text-[#050706] font-extrabold px-2 py-0.5 rounded uppercase">2026 Batch</span>
                        </div>
                        <p className="text-xs text-[#8a9690] mt-0.5">
                          {currentUser 
                            ? `Signed in as ${currentUser.fullName} • Status: ${currentUser.admissionStatus || 'Registered'}`
                            : 'Sign in to monitor live application progress, interview schedules, faculty remarks & studio floor clearance.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => {
                          setActiveTab('tracker');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-[#16241f] hover:bg-[#1f332a] text-[#00c878] border border-[#00c878]/40 font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Check Status Tracker</span>
                      </button>
                      <button
                        onClick={() => handleOpenApplyModal()}
                        className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-[#00c878] hover:bg-[#00e087] text-[#050706] font-mono text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <span>Apply for 2026</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Studio OS Curricula & Trending Courses */}
                <div id="courses-section">
                  <TrendingCourses
                    onSelectCourse={(course) => setSelectedCourseForModal(course)}
                    onOpenAstraWithCourse={handleOpenAstraWithCourse}
                    onOpenApplyModal={handleOpenApplyModal}
                    selectedCategory={selectedCourseCategory}
                    setSelectedCategory={setSelectedCourseCategory}
                  />
                </div>

                {/* About Institution Section */}
                <AboutSection />

                {/* Studio Floor Infrastructure Section */}
                <CampusLifeSection />

                {/* Jaya TV Showrunners & Faculty Mentors */}
                <FacultySection />
              </div>
            )}

            {/* ABOUT VIEW */}
            {activeTab === 'about' && (
              <div className="pt-4 pb-16 animate-in fade-in w-full">
                <AboutSection />
                <CampusLifeSection />
              </div>
            )}

            {/* COURSES VIEW */}
            {activeTab === 'courses' && (
              <div className="pt-4 pb-16 animate-in fade-in w-full">
                <TrendingCourses
                  onSelectCourse={(course) => setSelectedCourseForModal(course)}
                  onOpenAstraWithCourse={handleOpenAstraWithCourse}
                  onOpenApplyModal={handleOpenApplyModal}
                  selectedCategory={selectedCourseCategory}
                  setSelectedCategory={setSelectedCourseCategory}
                />
              </div>
            )}

            {/* CAMPUS VIEW */}
            {activeTab === 'campus' && (
              <div className="pt-4 pb-16 animate-in fade-in w-full">
                <CampusLifeSection />
              </div>
            )}

            {/* FACULTY VIEW */}
            {activeTab === 'faculty' && (
              <div className="pt-4 pb-16 animate-in fade-in w-full">
                <FacultySection />
              </div>
            )}

            {/* GALLERY VIEW */}
            {activeTab === 'gallery' && (
              <div className="pt-4 pb-16 animate-in fade-in w-full">
                <GallerySection onOpenApplyModal={() => setApplyModalOpen(true)} />
              </div>
            )}
          </>
        )}

      </main>

      {/* Floating Academy Signal Live Widget */}
      <AcademySignalWidget
        onOpenApplyModal={() => setApplyModalOpen(true)}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenAstra={() => setAstraOpen(true)}
        onOpenApplyModal={() => setApplyModalOpen(true)}
      />

      {/* Astra AI Concierge Widget */}
      <AstraAICounselor
        isOpen={astraOpen}
        onClose={() => setAstraOpen(!astraOpen)}
        initialCourseInterest={astraCourseContext}
        onNewRegistrationSuccess={handleRegistrationSuccess}
        onOpenApplyModal={() => setApplyModalOpen(true)}
      />

      {/* Command Palette (⌘K) Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          if (tab !== 'admin') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onSelectCourse={(course) => setSelectedCourseForModal(course)}
        onOpenAstra={(ctx) => {
          setAstraCourseContext(ctx || null);
          setAstraOpen(true);
        }}
        onOpenApplyModal={() => setApplyModalOpen(true)}
      />

      {/* Course Detail Modal */}
      <CourseModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onOpenAstraWithCourse={handleOpenAstraWithCourse}
        onOpenApplyModal={handleOpenApplyModal}
      />

      {/* Application Form Modal */}
      <ApplicationFormModal
        isOpen={applyModalOpen}
        onClose={() => {
          setApplyModalOpen(false);
          setSelectedProgramForApply(undefined);
        }}
        onRegistrationSuccess={handleRegistrationSuccess}
        initialProgramInterest={selectedProgramForApply}
        currentUser={currentUser}
      />

      {/* Candidate Mail OTP Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        initialRole={portalMode === 'faculty' ? 'faculty' : 'student'}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Candidate Status & Regular Updates Modal */}
      <UserProfileModal
        isOpen={userProfileModalOpen}
        onClose={() => setUserProfileModalOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
        onOpenApplyModal={handleOpenApplyModal}
      />

      {/* Admissions Control Center Modal */}
      <AdminRegistrationsModal
        isOpen={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          if (activeTab === 'admin') {
            setActiveTab('home');
          }
        }}
      />

    </div>
  );
}

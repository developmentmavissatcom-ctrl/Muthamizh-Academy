import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavTab, CourseCategory, Course, RegistrationRecord, UserProfile, PortalMode } from './types';
import { HeaderNav } from './components/HeaderNav';
import { BroadcastHero } from './components/cinematic/BroadcastHero';
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

const TAB_SEO_CONFIG: Record<NavTab, { title: string; path: string }> = {
  home: {
    title: 'Muthamizh Academy | Media, Television & Digital Media Education',
    path: '/'
  },
  about: {
    title: 'Muthamizh Academy | About Us',
    path: '/about'
  },
  courses: {
    title: 'Muthamizh Academy | Courses & Academic Curricula',
    path: '/courses'
  },
  campus: {
    title: 'Muthamizh Academy | Studio Floors & Campus Life',
    path: '/campus'
  },
  faculty: {
    title: 'Muthamizh Academy | Faculty & Industry Mentors',
    path: '/faculty'
  },
  gallery: {
    title: 'Muthamizh Academy | Campus & Studio Gallery',
    path: '/gallery'
  },
  tracker: {
    title: 'Muthamizh Academy | Application Status Tracker',
    path: '/tracker'
  },
  admin: {
    title: 'Muthamizh Academy | Administration',
    path: '/admin'
  },
  faculty_portal: {
    title: 'Muthamizh Academy | Faculty Admissions Console',
    path: '/faculty-portal'
  }
};

/**
 * User-Specified Transition Effects Pool:
 * 1. Fade + Slide: Current tab content fades out and slides slightly left; new content fades in and slides from the right.
 * 2. Scale + Fade: Old content gently scales down (1 → 0.98) while fading; new content scales up (0.98 → 1) while appearing.
 * 3. Underline + Content Reveal: Animated underline moves smoothly beneath active tab; content appears with a subtle upward motion.
 * 4. Sliding Panel: Content behaves like a horizontal carousel; switching tabs slides the new section into view.
 * 5. Blur Transition: Content briefly becomes blurred while changing; new content sharpens into focus.
 * 6. Morphing Indicator & Content Combo: Opacity + translateY + slight scale with buttery-smooth fade-in.
 */
interface TabTransitionEffect {
  name: string;
  initial: { opacity: number; x?: number; y?: number; scale?: number; filter?: string };
  animate: { opacity: number; x?: number; y?: number; scale?: number; filter?: string; transition?: any };
  exit: { opacity: number; x?: number; y?: number; scale?: number; filter?: string; transition?: any };
}

const TAB_TRANSITION_EFFECTS: TabTransitionEffect[] = [
  // 1. Fade + Slide (Current tab fades out and slides slightly left; new fades in and slides from the right - buttery smooth)
  {
    name: 'Fade + Slide',
    initial: { opacity: 0, x: 50, y: 0, scale: 1, filter: 'blur(3px)' },
    animate: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.58, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.52, ease: [0.33, 1, 0.68, 1] } 
      }
    },
    exit: { 
      opacity: 0, 
      x: -35, 
      y: 0, 
      scale: 1, 
      filter: 'blur(2px)',
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } 
    }
  },

  // 2. Scale + Fade (Old gently scales down 1 -> 0.98 while fading; new scales up 0.98 -> 1 with gradual blooming fade)
  {
    name: 'Scale + Fade',
    initial: { opacity: 0, scale: 0.975, x: 0, y: 0, filter: 'blur(3px)' },
    animate: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.56, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.52, ease: [0.33, 1, 0.68, 1] } 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.985, 
      x: 0, 
      y: 0, 
      filter: 'blur(2px)',
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } 
    }
  },

  // 3. Underline + Content Reveal (Content appears with subtle upward motion and luscious fade-in)
  {
    name: 'Underline + Content Reveal',
    initial: { opacity: 0, y: 35, scale: 1, x: 0, filter: 'blur(3px)' },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.54, ease: [0.33, 1, 0.68, 1] } 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 1, 
      x: 0, 
      filter: 'blur(2px)',
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } 
    }
  },

  // 4. Sliding Panel (Content behaves like a horizontal carousel with smooth gliding fade-in)
  {
    name: 'Sliding Panel',
    initial: { opacity: 0, x: 80, y: 0, scale: 1, filter: 'blur(3px)' },
    animate: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.54, ease: [0.33, 1, 0.68, 1] } 
      }
    },
    exit: { 
      opacity: 0, 
      x: -80, 
      y: 0, 
      scale: 1, 
      filter: 'blur(2px)',
      transition: { duration: 0.24, ease: [0.4, 0, 1, 1] } 
    }
  },

  // 5. Blur Transition (Content briefly blurs while changing; new content sharpens into focus like butter)
  {
    name: 'Blur Transition',
    initial: { opacity: 0, filter: 'blur(12px)', scale: 0.99, x: 0, y: 0 },
    animate: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      scale: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 0.58, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.52, ease: [0.33, 1, 0.68, 1] } 
      }
    },
    exit: { 
      opacity: 0, 
      filter: 'blur(8px)', 
      scale: 0.99, 
      x: 0, 
      y: 0,
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } 
    }
  },

  // 6. Morphing Indicator & Content Combo (Opacity + translateY + slight scale with buttery-smooth fade-in)
  {
    name: 'Morphing Pill Combo',
    initial: { opacity: 0, y: 30, scale: 0.985, x: 0, filter: 'blur(3px)' },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.58, 
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.54, ease: [0.33, 1, 0.68, 1] } 
      }
    },
    exit: { 
      opacity: 0, 
      y: -18, 
      scale: 0.985, 
      x: 0, 
      filter: 'blur(2px)',
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } 
    }
  }
];

export default function App() {
  const [portalMode, setPortalMode] = useState<PortalMode>(() => {
    const saved = localStorage.getItem('muthamizh_portal_mode') as PortalMode;
    return saved === 'faculty' ? 'faculty' : 'student';
  });
  const [activeTab, setActiveTab] = useState<NavTab>(() => {
    if (typeof window !== 'undefined') {
      const raw = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
      if (raw === 'about') return 'about';
      if (raw === 'courses' || raw === 'admissions') return 'courses';
      if (raw === 'campus') return 'campus';
      if (raw === 'faculty') return 'faculty';
      if (raw === 'gallery') return 'gallery';
      if (raw === 'tracker') return 'tracker';
    }
    return 'home';
  });

  // Randomized smooth transition state
  const [transitionEffectIndex, setTransitionEffectIndex] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);
  const prevTabRef = useRef(activeTab);

  const triggerRandomTabTransition = () => {
    setTransitionEffectIndex((prev) => {
      let next = Math.floor(Math.random() * TAB_TRANSITION_EFFECTS.length);
      if (next === prev) {
        next = (next + 1) % TAB_TRANSITION_EFFECTS.length;
      }
      return next;
    });
    setTransitionKey((prev) => prev + 1);
  };

  const handleTabChange = (tab: NavTab) => {
    triggerRandomTabTransition();
    setActiveTab(tab);
    if (tab !== 'admin') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  // When activeTab changes: update scroll, document.title, canonical URL, and browser URL
  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      prevTabRef.current = activeTab;
      triggerRandomTabTransition();
    }

    if (activeTab === 'admin') {
      setAdminModalOpen(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const config = TAB_SEO_CONFIG[activeTab] || TAB_SEO_CONFIG.home;
    document.title = config.title;

    // Sync Canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      const canonicalHref = `https://muthamizhacademy.com${config.path === '/' ? '/' : config.path}`;
      canonicalLink.setAttribute('href', canonicalHref);
    }

    // Sync Meta Description for homepage
    if (activeTab === 'home') {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Muthamizh Academy in Chennai offers media, television, digital media and IT education with practical, industry-focused training.'
        );
      }
    }

    // Sync browser URL without full refresh
    if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
      const currentPath = window.location.pathname;
      if (currentPath !== config.path && !(config.path === '/' && (currentPath === '' || currentPath === '/'))) {
        window.history.replaceState(null, '', config.path);
      }
    }
  }, [activeTab]);

  // Track scroll position on the Home page to dynamically update the active tab indicator
  const [scrollIndicatedTab, setScrollIndicatedTab] = useState<NavTab | null>(null);

  useEffect(() => {
    if (activeTab !== 'home') {
      setScrollIndicatedTab(null);
      return;
    }

    const sections: { id: string; tab: NavTab }[] = [
      { id: 'hero-section', tab: 'home' },
      { id: 'courses-section', tab: 'courses' },
      { id: 'campus-section', tab: 'campus' },
      { id: 'gallery-section', tab: 'gallery' },
      { id: 'faculty-section', tab: 'faculty' },
      { id: 'about-section', tab: 'about' }
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setScrollIndicatedTab(sections[i].tab);
            return;
          }
        }
      }
      setScrollIndicatedTab('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const navActiveTab = (activeTab === 'home' && scrollIndicatedTab) ? scrollIndicatedTab : activeTab;

  // Support browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const raw = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
      if (raw === 'about') setActiveTab('about');
      else if (raw === 'courses' || raw === 'admissions') setActiveTab('courses');
      else if (raw === 'campus') setActiveTab('campus');
      else if (raw === 'faculty') setActiveTab('faculty');
      else if (raw === 'gallery') setActiveTab('gallery');
      else if (raw === 'tracker') setActiveTab('tracker');
      else setActiveTab('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check if user directly arrived via admissions URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
      if (raw === 'admissions') {
        setApplyModalOpen(true);
      }
    }
  }, []);

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
        activeTab={navActiveTab}
        setActiveTab={handleTabChange}
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
          handleTabChange('faculty_portal');
        }}
        onOpenUserProfile={() => setUserProfileModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area with Smooth Randomized Transitions */}
      <main className="relative z-10 flex-1 w-full overflow-x-hidden pt-[74px] sm:pt-[78px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${portalMode}-${transitionKey}`}
            initial={TAB_TRANSITION_EFFECTS[transitionEffectIndex].initial}
            animate={TAB_TRANSITION_EFFECTS[transitionEffectIndex].animate}
            exit={TAB_TRANSITION_EFFECTS[transitionEffectIndex].exit}
            className="w-full will-change-transform"
          >
          {/* EXCLUSIVE FACULTY ADMISSIONS DESK */}
          {(portalMode === 'faculty' || activeTab === 'faculty_portal') ? (
            <div className="pt-2 pb-16 w-full">
              <FacultyPortal
                currentUser={currentUser}
                onFacultyLogout={handleLogout}
                onSwitchToStudentView={() => {
                  setPortalMode('student');
                  localStorage.setItem('muthamizh_portal_mode', 'student');
                  handleTabChange('home');
                }}
                onNavigateToFacultyTab={() => {
                  setPortalMode('student');
                  localStorage.setItem('muthamizh_portal_mode', 'student');
                  handleTabChange('faculty');
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
                <div className="pt-8 pb-20 px-4 sm:px-6 max-w-5xl mx-auto w-full">
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
                  <div id="hero-section">
                    <BroadcastHero
                      onOpenAstra={() => {
                        setAstraCourseContext(null);
                        setAstraOpen(true);
                      }}
                      onExploreCourses={() => {
                        handleTabChange('courses');
                        const el = document.getElementById('courses-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      onOpenApplyModal={() => setApplyModalOpen(true)}
                      onOpenDiscovery={() => {
                        const el = document.getElementById('discovery-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  </div>

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
                            handleTabChange('tracker');
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

                  {/* 1. Studio OS Curricula & Academic Programs (Courses) */}
                  <div id="courses-section">
                    <TrendingCourses
                      onSelectCourse={(course) => setSelectedCourseForModal(course)}
                      onOpenAstraWithCourse={handleOpenAstraWithCourse}
                      onOpenApplyModal={handleOpenApplyModal}
                      selectedCategory={selectedCourseCategory}
                      setSelectedCategory={setSelectedCourseCategory}
                    />
                  </div>

                  {/* 2. Studio Floor Infrastructure Section (Campus Life) */}
                  <div id="campus-section">
                    <CampusLifeSection />
                  </div>

                  {/* 3. Campus & Studio Gallery Section (Gallery) */}
                  <div id="gallery-section">
                    <GallerySection onOpenApplyModal={() => setApplyModalOpen(true)} />
                  </div>

                  {/* 4. Jaya TV Showrunners & Faculty Mentors (Faculty) */}
                  <div id="faculty-section">
                    <FacultySection />
                  </div>

                  {/* 5. About Institution Section (About Us) */}
                  <div id="about-section">
                    <AboutSection />
                  </div>
                </div>
              )}

              {/* COURSES VIEW */}
              {activeTab === 'courses' && (
                <div className="pt-4 pb-16 w-full">
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
                <div className="pt-4 pb-16 w-full">
                  <CampusLifeSection />
                </div>
              )}

              {/* GALLERY VIEW */}
              {activeTab === 'gallery' && (
                <div className="pt-4 pb-16 w-full">
                  <GallerySection onOpenApplyModal={() => setApplyModalOpen(true)} />
                </div>
              )}

              {/* FACULTY VIEW */}
              {activeTab === 'faculty' && (
                <div className="pt-4 pb-16 w-full">
                  <FacultySection />
                </div>
              )}

              {/* ABOUT VIEW */}
              {activeTab === 'about' && (
                <div className="pt-4 pb-16 w-full">
                  <AboutSection />
                </div>
              )}
            </>
          )}
        </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleTabChange}
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

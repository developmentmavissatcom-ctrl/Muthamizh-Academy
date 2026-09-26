import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  GraduationCap, 
  ArrowRight, 
  Bot, 
  Layers,
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  FastForward 
} from 'lucide-react';
import { HERO_VIDEOS } from '../../data/heroVideosData';

interface BroadcastHeroProps {
  onOpenAstra: () => void;
  onExploreCourses: () => void;
  onOpenApplyModal: () => void;
  onOpenDiscovery?: () => void;
}

export const BroadcastHero: React.FC<BroadcastHeroProps> = ({
  onOpenAstra,
  onExploreCourses,
  onOpenApplyModal
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [isMuted, setIsMuted] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [videoAspectRatio, setVideoAspectRatio] = useState<number>(16 / 9);

  const isAdvancingRef = useRef(false);
  const activeVideoRef = useRef<HTMLVideoElement>(null);
  const totalSlides = HERO_VIDEOS.length;

  const currentVideo = HERO_VIDEOS[activeSlide] || HERO_VIDEOS[0];
  const nextVideo = HERO_VIDEOS[(activeSlide + 1) % totalSlides];
  const queuedVideo = HERO_VIDEOS[(activeSlide + 2) % totalSlides];

  // Auto-play active video on change and ensure proper playback
  useEffect(() => {
    if (activeVideoRef.current) {
      activeVideoRef.current.currentTime = 0;
      activeVideoRef.current.playbackRate = currentVideo.playbackSpeed || 1.0;
      const playPromise = activeVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (activeVideoRef.current) {
            activeVideoRef.current.muted = true;
            activeVideoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [activeSlide, currentVideo]);

  // Slide to next video: front card slides out, next card slides in from the back
  const handleNextSlide = useCallback(() => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;
    setSlideDirection('next');
    setProgressPercent(0);
    setActiveSlide((prev) => (prev + 1) % totalSlides);

    setTimeout(() => {
      isAdvancingRef.current = false;
    }, 500);
  }, [totalSlides]);

  // Slide to previous video
  const handlePrevSlide = useCallback(() => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;
    setSlideDirection('prev');
    setProgressPercent(0);
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

    setTimeout(() => {
      isAdvancingRef.current = false;
    }, 500);
  }, [totalSlides]);

  // Handle active video time update & auto-advance when completed
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (!video.duration || isNaN(video.duration)) return;

    const pct = (video.currentTime / video.duration) * 100;
    setProgressPercent(Math.min(pct, 100));

    // When video is within 0.15s of ending, trigger slide-out to next
    if (video.currentTime >= video.duration - 0.15 && !isAdvancingRef.current) {
      handleNextSlide();
    }
  };

  // Video finished playing event -> automatically slide out and slide in next video
  const handleVideoEnded = () => {
    handleNextSlide();
  };

  // Adopt actual video dimensions and ensure smooth playback
  const handleVideoLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.videoWidth && video.videoHeight) {
      setVideoAspectRatio(video.videoWidth / video.videoHeight);
    }
    video.playbackRate = currentVideo.playbackSpeed || 1.0;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const cardVariants = {
    initial: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? 16 : '-120%',
      y: direction === 'next' ? -12 : 0,
      scale: direction === 'next' ? 0.96 : 1,
      opacity: direction === 'next' ? 0.85 : 0,
      rotate: direction === 'next' ? 0 : -6,
    }),
    animate: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      rotate: 0,
      zIndex: 20,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? '-120%' : 20,
      y: direction === 'next' ? 0 : -14,
      scale: direction === 'next' ? 0.98 : 0.95,
      rotate: direction === 'next' ? -6 : 0,
      opacity: 0,
      zIndex: 30,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="relative min-h-[85vh] flex items-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 lg:py-16 w-full overflow-hidden">
      {/* Studio Telemetry Grid Lines */}
      <div className="absolute inset-0 telemetry-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1560px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
          
          {/* ================= LEFT SIDE: Content Column ================= */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-8">
            
            {/* Live On-Air Pill */}
            <div className="inline-flex flex-wrap items-center gap-3 p-1.5 pr-4 rounded-full bg-[#0b100e]/95 border border-[#16241f] shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00c878]/15 border border-[#00c878]/30 text-[#00c878] text-xs font-mono font-bold tracking-wide">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#00c878]" />
                <span>LIVE ON-AIR</span>
              </div>
              <span className="text-xs text-[#8a9690] font-mono hidden sm:inline">
                Mavis Satcom Ltd • Jaya TV Network Floor
              </span>
              <span className="bg-[#e6ad54]/20 text-[#e6ad54] px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border border-[#e6ad54]/40">
                BATCH 2026
              </span>
            </div>

            {/* Master Headline */}
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-[#f5f7f6] tracking-tight leading-[1.1] font-sans">
                THE NEXT ERA OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c878] via-[#e6ad54] to-[#f5f7f6]">
                  BROADCAST & FILM
                </span>
              </h1>

              <p className="text-base sm:text-xl xl:text-2xl font-serif text-[#e6ad54] font-medium tracking-wide">
                Muthamizh Academy • Professional Television & Cinema Academy
              </p>

              <p className="text-[#8a9690] text-xs sm:text-base leading-relaxed">
                Step inside 10,000+ sq.ft of active satellite television production floors. Direct hands-on training with Advanced Camera Setup, multi-cam vision mixers, newsroom teleprompters, and Jaya TV senior showrunners.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1 w-full sm:w-auto">
              <button
                onClick={onOpenApplyModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] hover:from-[#00c878] hover:to-[#00c878] text-[#050706] font-extrabold text-sm sm:text-base transition-all shadow-[0_10px_30px_rgba(0,200,120,0.3)] hover:shadow-[0_15px_40px_rgba(0,200,120,0.5)] hover:scale-[1.02] flex items-center justify-center gap-3 border border-[#00c878]/60 group font-mono"
              >
                <GraduationCap className="w-5 h-5 text-[#050706]" />
                <span>Apply for Admissions 2026</span>
                <ArrowRight className="w-4 h-4 text-[#050706] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#0b100e]/90 hover:bg-[#121a17] text-[#f5f7f6] border border-[#16241f] hover:border-[#00c878]/50 font-bold text-sm sm:text-base transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#00c878]" />
                <span>Explore Programs</span>
              </button>

              <button
                onClick={onOpenAstra}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#e6ad54]/10 to-[#00c878]/10 hover:from-[#e6ad54]/20 hover:to-[#00c878]/20 text-[#e6ad54] border border-[#e6ad54]/40 hover:border-[#e6ad54] font-bold text-sm sm:text-base transition-all backdrop-blur-md flex items-center justify-center gap-2 group"
              >
                <Bot className="w-5 h-5 text-[#e6ad54] group-hover:rotate-12 transition-transform" />
                <span>Astra AI Concierge</span>
              </button>
            </div>

            {/* Telemetry Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-[#16241f] w-full max-w-2xl">
              <div className="p-3 rounded-xl bg-[#0b100e]/80 border border-[#16241f] text-left">
                <div className="text-[#00c878] font-mono font-black text-xl">100%</div>
                <div className="text-[#f5f7f6] text-[11px] font-semibold">Jaya TV Floor</div>
                <div className="text-[#8a9690] text-[10px] font-mono">Live rotation</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0b100e]/80 border border-[#16241f] text-left">
                <div className="text-[#e6ad54] font-mono font-black text-xl">10k+</div>
                <div className="text-[#f5f7f6] text-[11px] font-semibold">Sq.Ft Studio</div>
                <div className="text-[#8a9690] text-[10px] font-mono">Acoustic stage</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0b100e]/80 border border-[#16241f] text-left">
                <div className="text-[#00c878] font-mono font-black text-xl">11</div>
                <div className="text-[#f5f7f6] text-[11px] font-semibold">Programs</div>
                <div className="text-[#8a9690] text-[10px] font-mono">Cinema & AI</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0b100e]/80 border border-[#16241f] text-left">
                <div className="text-[#ef4444] font-mono font-black text-xl">2026</div>
                <div className="text-[#f5f7f6] text-[11px] font-semibold">New Cohort</div>
                <div className="text-[#8a9690] text-[10px] font-mono">Seats open</div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT SIDE: Pure Video Player in Curved-Edged Box with 3D Stack Slide Transition ================= */}
          <div className="lg:col-span-6 xl:col-span-5 relative w-full flex flex-col items-center justify-center">
            
            {/* Ambient Lighting Aura */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-[#00c878]/20 via-[#e6ad54]/10 to-transparent rounded-[36px] blur-3xl pointer-events-none" />

            {/* Outer Responsive Frame adopting the Video's Actual Aspect Ratio */}
            <div 
              style={{ aspectRatio: `${videoAspectRatio}` }}
              className="relative w-full max-w-[620px] select-none transition-all duration-500"
            >
              {/* STACKED CARD 2 (Farthest In Queue - Lined up in the back) */}
              <div 
                onClick={handleNextSlide}
                className="absolute -top-3 sm:-top-5 -right-2 sm:-right-4 w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-[#040705] border border-[#16241f] shadow-2xl scale-[0.93] z-0 opacity-40 hover:opacity-60 transition-all duration-500 cursor-pointer overflow-hidden group pointer-events-auto"
                title={`In Queue: ${queuedVideo.title}`}
              >
                <video
                  src={queuedVideo.videoSrc}
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="auto"
                  className="w-full h-full object-cover filter brightness-30 contrast-110"
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0b100e]/90 border border-[#16241f] text-[10px] font-mono text-[#8a9690] group-hover:text-white">
                  <span>QUEUED</span>
                </div>
              </div>

              {/* STACKED CARD 1 (Next in line - Lined up directly behind active card) */}
              <div 
                onClick={handleNextSlide}
                className="absolute -top-1.5 sm:-top-2.5 -right-1 sm:-right-2 w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-[#070c09] border border-[#00c878]/30 shadow-2xl scale-[0.97] z-10 opacity-75 hover:opacity-95 transition-all duration-500 cursor-pointer overflow-hidden group pointer-events-auto"
                title={`Next in line: ${nextVideo.title}`}
              >
                <video
                  src={nextVideo.videoSrc}
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="auto"
                  className="w-full h-full object-cover filter brightness-50 contrast-110"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute bottom-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#121a17]/95 border border-[#00c878]/50 text-[10px] font-mono text-[#00c878] group-hover:text-white shadow-sm">
                  <FastForward className="w-3 h-3 text-[#00c878] animate-pulse" />
                  <span>NEXT</span>
                </div>
              </div>

              {/* ACTIVE CURVED VIDEO TAB (Slides out on click or end, next tab slides in from back) */}
              <AnimatePresence mode="popLayout" custom={slideDirection} initial={false}>
                <motion.div
                  key={activeSlide}
                  custom={slideDirection}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onClick={handleNextSlide}
                  className="relative z-20 w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] bg-black border border-[#16241f] hover:border-[#00c878]/60 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden cursor-pointer group"
                  title="Click to slide to next video"
                >
                  <video
                    ref={activeVideoRef}
                    key={currentVideo.videoSrc}
                    src={currentVideo.videoSrc}
                    autoPlay
                    playsInline
                    muted={isMuted}
                    preload="auto"
                    onLoadedMetadata={handleVideoLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleVideoEnded}
                    className="w-full h-full object-cover filter brightness-95 contrast-105"
                  />

                  {/* Top Live Camera Overlay */}
                  <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 z-30 flex items-center gap-2 pointer-events-none">
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-black/75 border border-[#00c878]/40 text-[#00c878] font-mono text-[10px] sm:text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-md">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00c878] animate-ping" />
                      {currentVideo.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-[#f5f7f6] font-mono text-[11px] backdrop-blur-md hidden sm:inline-block shadow-sm">
                      {currentVideo.title}
                    </span>
                  </div>

                  {/* Real-time bottom progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40 z-30 pointer-events-none">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00c878] via-[#00c878] to-[#e6ad54] transition-all duration-150"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Audio Mute/Unmute Toggle Button (Always accessible on touch, hover on desktop) */}
                  <div className="absolute bottom-2.5 sm:bottom-3.5 right-2.5 sm:right-3.5 flex items-center gap-1.5 z-30 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="p-1.5 sm:p-2 rounded-xl bg-black/75 hover:bg-[#00c878] hover:text-[#050706] text-[#f5f7f6] border border-white/15 transition-colors backdrop-blur-md shadow-lg"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Hover Navigation Arrows (Always accessible on touch, hover on desktop) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevSlide();
                    }}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/65 hover:bg-[#00c878] hover:text-[#050706] text-[#f5f7f6] transition-all opacity-85 sm:opacity-0 sm:group-hover:opacity-100 z-30 shadow-xl border border-white/15 backdrop-blur-md"
                    title="Previous Reel"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextSlide();
                    }}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/65 hover:bg-[#00c878] hover:text-[#050706] text-[#f5f7f6] transition-all opacity-85 sm:opacity-0 sm:group-hover:opacity-100 z-30 shadow-xl border border-white/15 backdrop-blur-md"
                    title="Next Reel"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Camera Angle Switcher */}
            <div className="w-full max-w-[620px] mt-3 flex items-center justify-center sm:justify-start gap-1.5 overflow-x-auto pb-1 scrollbar-none z-20">
              <span className="text-[10px] font-mono text-[#8a9690] uppercase tracking-wider hidden sm:inline mr-1">
                Jaya TV Feed:
              </span>
              {HERO_VIDEOS.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideDirection(idx > activeSlide ? 1 : -1);
                    setActiveSlide(idx);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                    idx === activeSlide
                      ? 'bg-[#00c878]/20 border-[#00c878] text-[#00c878] shadow-[0_0_12px_rgba(0,200,120,0.3)]'
                      : 'bg-[#0b100e]/80 border-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] hover:border-[#00c878]/40'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${idx === activeSlide ? 'bg-[#00c878] animate-pulse' : 'bg-[#8a9690]'}`} />
                  <span>{vid.tag}</span>
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

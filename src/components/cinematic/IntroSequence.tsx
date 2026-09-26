import React, { useEffect, useRef, useState } from 'react';

interface IntroSequenceProps {
  onComplete: () => void;
  videoSrc?: string;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({
  onComplete,
  videoSrc = '/intro.mp4'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Smooth fade-out and completion trigger
  const handleFinish = (persistSkip = false) => {
    if (isFadingOut) return;
    if (persistSkip) {
      localStorage.setItem('muthamizh_intro_viewed', 'true');
    }
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  // Keyboard shortcut listener (Escape or Space to proceed)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Play video with audio immediately on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser autoplay policy restricts unmuted autoplay, play muted as fallback
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, []);

  return (
    <div
      onClick={() => {
        // Allow user to click to unmute if browser auto-muted, or skip on double interaction
        if (videoRef.current && videoRef.current.muted) {
          videoRef.current.muted = false;
        }
      }}
      className={`fixed inset-0 z-[9999] bg-[#050706] flex items-center justify-center transition-opacity duration-700 select-none overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        playsInline
        onEnded={() => handleFinish(true)}
        className="w-full h-full object-cover"
      />

      {/* Skip Intro Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleFinish(true);
        }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 px-3.5 sm:px-4 py-2 rounded-xl bg-black/60 hover:bg-[#00c878] hover:text-[#050706] text-white border border-white/20 hover:border-[#00c878] text-xs font-mono font-bold backdrop-blur-md transition-all shadow-xl flex items-center gap-1.5 cursor-pointer"
        title="Skip Intro"
      >
        <span>Skip Intro</span>
        <span>→</span>
      </button>
    </div>
  );
};

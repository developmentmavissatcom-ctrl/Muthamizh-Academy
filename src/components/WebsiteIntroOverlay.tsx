import React, { useEffect, useRef, useState } from 'react';

interface WebsiteIntroOverlayProps {
  onIntroComplete: () => void;
  videoSrc?: string;
}

export const WebsiteIntroOverlay: React.FC<WebsiteIntroOverlayProps> = ({
  onIntroComplete,
  videoSrc = '/intro.mp4' // Local video path inside public/ directory
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Trigger smooth fade-out and unmount
  const handleFinish = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onIntroComplete();
    }, 700); // 700ms matches the CSS transition duration
  };

  // Keyboard controls (press Esc or Space to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autoplay video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch((err) => {
      console.warn('Video playback notice:', err);
    });
  }, []);

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-700 ease-in-out cursor-pointer select-none overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        playsInline
        onEnded={handleFinish}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
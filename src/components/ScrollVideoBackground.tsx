import React, { useEffect, useRef, useState } from 'react';

interface ScrollVideoBackgroundProps {
  videoSrc?: string;
}

export const ScrollVideoBackground: React.FC<ScrollVideoBackgroundProps> = ({
  videoSrc = '/BG.mp4'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetTime = 0;
    let currentTime = 0;
    let targetParallax = 0;
    let currentParallax = 0;
    let animationFrameId = 0;

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
      video.muted = true;
      video.currentTime = 0;
      video.playbackRate = 0.5;
      video.play().catch(() => undefined);
    };

    const updateScrollTarget = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;

      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight
      );
      const maxScroll = Math.max(1, documentHeight - window.innerHeight);
      const scrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);
      const scrollFraction = Math.min(1, Math.max(0, scrollY / maxScroll));

      targetTime = scrollFraction * Math.max(0.01, video.duration - 0.02);
      targetParallax = -scrollFraction * 96;
    };

    const renderLoop = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        const timeDiff = targetTime - currentTime;
        if (Math.abs(timeDiff) > 0.0005) {
          currentTime += timeDiff * 0.16;
          const safeTime = Math.max(0, Math.min(video.duration - 0.02, currentTime));
          if (Math.abs(video.currentTime - safeTime) > 0.01) {
            video.currentTime = safeTime;
          }
        }

        const parallaxDiff = targetParallax - currentParallax;
        if (Math.abs(parallaxDiff) > 0.01) {
          currentParallax += parallaxDiff * 0.16;
          if (videoRef.current) {
            videoRef.current.style.transform = `translate3d(0, ${currentParallax}px, 0) scale(1.12)`;
          }
        }
      }

      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 2) {
      handleLoadedMetadata();
    }

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', updateScrollTarget, { passive: true });

    updateScrollTarget();
    renderLoop();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', updateScrollTarget);
      window.cancelAnimationFrame(animationFrameId);
      video.pause();
    };
  }, [videoSrc]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-slate-950">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        autoPlay
        playsInline
        loop
        preload="auto"
        className={`w-full h-full object-cover opacity-85 filter brightness-95 contrast-110 will-change-transform origin-center transition-opacity duration-700 ${
          isVideoReady ? 'opacity-85' : 'opacity-0'
        }`}
        style={{ transform: 'translate3d(0, 0px, 0) scale(1.12)' }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(2,6,23,0.5)_100%)] pointer-events-none" />
    </div>
  );
};

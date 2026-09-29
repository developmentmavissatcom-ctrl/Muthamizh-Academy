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

    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 0.75;

    const handleLoadedMetadata = () => {
      setIsVideoReady(true);
      video.play().catch(() => undefined);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 2) {
      handleLoadedMetadata();
    }

    video.play().catch(() => undefined);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoSrc]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#050706]">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        autoPlay
        playsInline
        loop
        preload="auto"
        className={`w-full h-full object-cover filter brightness-95 contrast-110 transition-opacity duration-1000 ${
          isVideoReady ? 'opacity-85' : 'opacity-0'
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#050706]/70 via-[#050706]/35 to-[#050706]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(5,7,6,0.6)_100%)] pointer-events-none" />
    </div>
  );
};

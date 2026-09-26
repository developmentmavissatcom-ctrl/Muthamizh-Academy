import React from 'react';

interface MuthamizhLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
}

export const MuthamizhLogo: React.FC<MuthamizhLogoProps> = ({
  className = '',
  size = 'md',
  showSubtext = true
}) => {
  const iconSizes = {
    sm: 'w-8 h-8 sm:w-10 sm:h-10',
    md: 'w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12',
    lg: 'w-12 h-12 sm:w-16 sm:h-16'
  };

  const textSizes = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base md:text-lg',
    lg: 'text-xl sm:text-2xl'
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Official Emblem Icon */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0 transition-transform duration-300 group-hover:scale-105 overflow-hidden rounded-full bg-emerald-950/40 border border-emerald-500/20`}>
        <img
          src="/ChatGPT Image Aug 5, 2026, 09_28_44 AM.png"
          alt="Muthamizh Academy Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand Text */}
      <div className="shrink-0">
        <div className={`font-serif font-black tracking-widest text-emerald-50 ${textSizes[size]} leading-tight flex items-center gap-1`}>
          <span>MUTHAMIZH</span>
        </div>
        {showSubtext && (
          <div className="flex flex-col gap-0.5">
            <div className="text-[9px] sm:text-[11px] font-serif tracking-[0.2em] sm:tracking-[0.25em] text-amber-400 font-bold uppercase leading-none mt-0.5">
              ACADEMY
            </div>
            <div className="hidden sm:block text-[8px] sm:text-[9px] font-sans tracking-widest text-emerald-400/90 uppercase font-semibold leading-none">
              • PRIVATE LIMITED •
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

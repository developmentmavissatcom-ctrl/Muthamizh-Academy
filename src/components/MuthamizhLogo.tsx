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
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Emblem Icon */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0 transition-transform duration-300 group-hover:scale-105 overflow-hidden rounded-full bg-emerald-950/40 border border-emerald-500/20`}>
        <img
          src="/ChatGPT Image Aug 5, 2026, 09_28_44 AM.png"
          alt="Muthamizh Academy Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand Text */}
      <div>
        <div className={`font-serif font-black tracking-widest text-emerald-50 ${textSizes[size]} leading-tight flex items-center gap-1.5`}>
          <span>MUTHAMIZH</span>
        </div>
        {showSubtext && (
          <div className="flex flex-col gap-0.5">
            <div className="text-[11px] font-serif tracking-[0.25em] text-amber-400 font-bold uppercase">
              ACADEMY
            </div>
            <div className="text-[9px] font-sans tracking-widest text-emerald-400/90 uppercase font-semibold">
              • PRIVATE LIMITED •
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'full'
}) => {
  const iconDimensions = {
    sm: { w: 32, h: 32 },
    md: { w: 42, h: 42 },
    lg: { w: 56, h: 56 },
    xl: { w: 72, h: 72 }
  }[size];

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }[size];

  const subSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[11px] tracking-[0.25em]',
    lg: 'text-xs tracking-[0.3em]',
    xl: 'text-sm tracking-[0.35em]'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Exact stylized SVG icon replicating the uploaded logo */}
      <svg 
        width={iconDimensions.w} 
        height={iconDimensions.h} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Red Top Stylized B Curve */}
        <path 
          d="M38 12C58 12 76 22 76 42C76 52 70 60 62 65C58 67.5 53 69 47 70C58 64 64 54 64 43C64 28 50 20 36 21C26 21.8 18 26 12 34C16 20 26 12 38 12Z" 
          fill="#D91A2A" 
        />
        <path 
          d="M20 30C28 22 40 18 52 20C62 21.5 70 28 72 37C68 31 60 27 50 27C38 27 28 34 22 44C16 54 16 68 25 78C18 70 15 56 17 44C18 39 19 34 20 30Z" 
          fill="#D91A2A" 
        />
        <path 
          d="M30 46C34 38 43 32 54 34C62 35.5 68 41 68 49C68 59 58 68 46 70C34 72 24 64 24 53C24 49 26 47 30 46Z" 
          fill="#D91A2A" 
        />

        {/* Navy Bottom Shopping Cart Swirl & Baker Monogram Base */}
        <path 
          d="M32 60C38 68 47 74 58 74C72 74 84 62 84 46C84 38 80 30 74 24C78 32 80 40 80 47C80 60 70 70 56 70C46 70 38 65 32 60Z" 
          fill="#0B1938" 
        />
        <path 
          d="M24 65C32 78 46 84 62 82C76 80 88 68 86 52C86 64 74 76 60 77C46 78 33 73 24 65Z" 
          fill="#0B1938" 
        />
        <path 
          d="M50 56C58 56 66 62 66 70C66 74 63 78 58 80C65 77 70 71 70 64C70 56 61 51 52 52L50 56Z" 
          fill="#0B1938" 
        />

        {/* Shopping Cart Bottom Dual Wheels */}
        <circle cx="28" cy="90" r="5.5" fill="#0B1938" />
        <circle cx="72" cy="90" r="5.5" fill="#0B1938" />
      </svg>

      {variant !== 'icon' && (
        <div className="flex flex-col">
          <span className={`font-extrabold tracking-tight leading-none ${titleSizes} ${
            variant === 'white' ? 'text-white' : 'text-[#0B1938]'
          }`}>
            Grow bakers & sweet
          </span>
          <div className="flex items-center gap-1.5 mt-0.5 opacity-90">
            <span className={`h-[1px] w-3 ${variant === 'white' ? 'bg-amber-400' : 'bg-[#D91A2A]'}`}></span>
            <span className={`font-medium uppercase text-center ${subSizes} ${
              variant === 'white' ? 'text-amber-200' : 'text-[#0B1938]'
            }`}>
              Bring the Best
            </span>
            <span className={`h-[1px] w-3 ${variant === 'white' ? 'bg-amber-400' : 'bg-[#D91A2A]'}`}></span>
          </div>
        </div>
      )}
    </div>
  );
};

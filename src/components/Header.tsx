import React from 'react';
import { JournalConfig } from '../types';

interface HeaderProps {
  config: JournalConfig;
}

export const Header: React.FC<HeaderProps> = ({ config }) => {
  return (
    <header id="journal-header" className="pt-3 sm:pt-5 pb-1 px-3 sm:px-6 max-w-2xl mx-auto text-center">
      {/* Clean, compact scrapbook masthead card with half the previous height */}
      <div className="relative my-1">
        {/* Primary Scrapbook Card: Warm, calm, and uncluttered */}
        <div className="relative z-10 bg-[#FFFDF9] border border-[#EAE0DB] rounded-xl sm:rounded-2xl py-3.5 sm:py-4 px-5 sm:px-8 shadow-[0_4px_16px_rgba(50,40,35,0.04)]">
          {/* Single subtle washi tape accent */}
          <div
            className="washi-tape-rose washi-tape-edge absolute -top-3 left-6 sm:left-8 w-22 sm:w-26 h-5.5 sm:h-6 -rotate-2 z-20 pointer-events-none rounded-[1px] flex items-center justify-center text-xs sm:text-sm font-handwriting font-bold tracking-wide text-[#751410] select-none shadow-sm"
            aria-hidden="true"
          >
            for kat ♡
          </div>

          {/* Main Title: Elegant Serif */}
          <h1
            id="journal-title"
            className="font-headline text-2.5xl sm:text-3xl md:text-[2.25rem] font-bold tracking-tight text-[#251E19] leading-tight"
          >
            {config.title}
          </h1>

          {/* Subtitle Deck */}
          {config.subtitle && (
            <p
              id="journal-subtitle"
              className="mt-1 font-editorial italic text-sm sm:text-base text-[#6E6156] max-w-md mx-auto leading-normal"
            >
              “{config.subtitle}”
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

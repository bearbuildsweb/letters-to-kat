import React, { useEffect, useRef } from 'react';
import { Letter } from '../types';
import { formatNavDate } from '../utils/date';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateNavigationProps {
  letters: Letter[];
  selectedLetterId: string | null;
  onSelectLetter: (letter: Letter) => void;
}

export const DateNavigation: React.FC<DateNavigationProps> = ({
  letters,
  selectedLetterId,
  onSelectLetter,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll selected date into view smoothly
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedLetterId]);

  const currentIndex = letters.findIndex((l) => l.id === selectedLetterId);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < letters.length - 1 && currentIndex !== -1;

  const handlePrevLetter = () => {
    if (canGoPrev) {
      onSelectLetter(letters[currentIndex - 1]);
    }
  };

  const handleNextLetter = () => {
    if (canGoNext) {
      onSelectLetter(letters[currentIndex + 1]);
    } else if (currentIndex === -1 && letters.length > 0) {
      onSelectLetter(letters[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' && index < letters.length - 1) {
      e.preventDefault();
      onSelectLetter(letters[index + 1]);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      onSelectLetter(letters[index - 1]);
    }
  };

  if (letters.length === 0) {
    return null;
  }

  return (
    <nav
      id="date-navigation"
      aria-label="Letters date timeline"
      className="relative w-full max-w-3xl mx-auto px-4 my-2 sm:my-3"
    >
      {/* Pastel Scrapbook Tab Bar */}
      <div className="relative flex items-center bg-[#FDFBF7] p-2 sm:p-2.5 border border-[#E6D8D5] rounded-xl shadow-[0_3px_12px_rgba(50,40,35,0.04)]">
        {/* Left chevron: Skips to previous letter */}
        <button
          id="date-nav-prev-btn"
          type="button"
          onClick={handlePrevLetter}
          disabled={!canGoPrev}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all mr-1.5 flex-shrink-0 border ${
            canGoPrev
              ? 'text-[#4A3B32] hover:text-[#1F1814] bg-white hover:bg-[#F5ECE9] border-[#DFCFCA] shadow-sm cursor-pointer active:scale-95'
              : 'text-[#D0C2BD] bg-transparent border-transparent cursor-not-allowed opacity-35'
          }`}
          aria-label="Previous letter"
          title={canGoPrev ? `Previous: ${letters[currentIndex - 1].title}` : 'At first letter'}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Container with centered tabs */}
        <div
          ref={containerRef}
          className="flex-1 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth select-none"
          role="tablist"
        >
          <div className="flex items-center justify-center min-w-full w-max mx-auto gap-2 sm:gap-3">
            {letters.map((letter, index) => {
              const isSelected = letter.id === selectedLetterId;
              const { day, month } = formatNavDate(letter.date);
              const entryNum = index + 1;

              // Cycling playful pastel palettes with high-contrast readable typography
              const tabPalettes = [
                {
                  bg: 'bg-[#FFF0EF]',
                  border: 'border-[#F8C1BD]',
                  text: 'text-[#A8322B]',
                  tagTextColor: 'text-[#8A241E]',
                  selectedBorder: 'border-[#E27B75]',
                  washi: 'washi-tape-rose',
                  tag: 'under God',
                },
                {
                  bg: 'bg-[#EFF8F1]',
                  border: 'border-[#BDDFC5]',
                  text: 'text-[#205730]',
                  tagTextColor: 'text-[#164424]',
                  selectedBorder: 'border-[#5D996E]',
                  washi: 'washi-tape-sage',
                  tag: 'HOPE remains',
                },
                {
                  bg: 'bg-[#FEF9E4]',
                  border: 'border-[#F8E399]',
                  text: 'text-[#755200]',
                  tagTextColor: 'text-[#5C4000]',
                  selectedBorder: 'border-[#DDA520]',
                  washi: 'washi-tape-butter',
                  tag: 'nayi le walk',
                },
                {
                  bg: 'bg-[#F0F6FC]',
                  border: 'border-[#C2DBF7]',
                  text: 'text-[#1C4B76]',
                  tagTextColor: 'text-[#143B5E]',
                  selectedBorder: 'border-[#4A88C4]',
                  washi: 'washi-tape-periwinkle',
                  tag: 'unfading FRUIT',
                },
                {
                  bg: 'bg-[#F7EFFB]',
                  border: 'border-[#DDC2EF]',
                  text: 'text-[#572775]',
                  tagTextColor: 'text-[#441C5C]',
                  selectedBorder: 'border-[#A364C9]',
                  washi: 'washi-tape-lavender',
                  tag: 'reflection',
                },
              ];

              const palette = tabPalettes[index % tabPalettes.length];

              return (
                <button
                  key={letter.id}
                  id={`date-pill-${letter.id}`}
                  ref={isSelected ? activeItemRef : null}
                  role="tab"
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => onSelectLetter(letter)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`group relative flex-shrink-0 flex flex-col items-center justify-center min-w-[78px] sm:min-w-[88px] py-2 px-2.5 rounded-lg text-center transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#E27B75] ${palette.bg} ${
                    isSelected
                      ? `${palette.selectedBorder} border-2 shadow-[0_4px_12px_rgba(40,30,30,0.12)] -translate-y-1 scale-105`
                      : `${palette.border} border hover:border-[#D5C0BD] hover:-translate-y-0.5 opacity-85 hover:opacity-100`
                  }`}
                >
                  {/* Colorful washi tape holding the active scrapbook tab */}
                  {isSelected && (
                    <div
                      className={`${palette.washi} washi-tape-edge absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-4 -rotate-2 z-10 pointer-events-none rounded-[1px] flex items-center justify-center text-[8px] font-handwriting ${palette.text}`}
                      aria-hidden="true"
                    >
                      ★
                    </div>
                  )}

                  {/* Highly legible entry tag badge */}
                  <span
                    className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-white/85 border border-black/5 text-[10.5px] sm:text-[11px] font-sans font-bold tracking-tight leading-tight mb-1 whitespace-nowrap shadow-[0_1px_2px_rgba(0,0,0,0.03)] ${palette.tagTextColor}`}
                  >
                    #{entryNum} · {palette.tag}
                  </span>

                  {/* Day in artistic display serif */}
                  <span className={`text-lg sm:text-xl tracking-tight font-headline leading-none font-bold ${palette.text}`}>
                    {day}
                  </span>

                  {/* Month */}
                  <span className={`text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider uppercase mt-1 leading-none text-[#5A4F46]`}>
                    {month}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right chevron: Skips to next letter */}
        <button
          id="date-nav-next-btn"
          type="button"
          onClick={handleNextLetter}
          disabled={!canGoNext}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ml-1.5 flex-shrink-0 border ${
            canGoNext
              ? 'text-[#4A3B32] hover:text-[#1F1814] bg-white hover:bg-[#F5ECE9] border-[#DFCFCA] shadow-sm cursor-pointer active:scale-95'
              : 'text-[#D0C2BD] bg-transparent border-transparent cursor-not-allowed opacity-35'
          }`}
          aria-label="Next letter"
          title={canGoNext ? `Next: ${letters[currentIndex + 1].title}` : 'At latest letter'}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

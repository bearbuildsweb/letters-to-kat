import { useState, useMemo, useEffect, useCallback } from 'react';
import { journalConfig } from './data/journal';
import { letters as allLetters } from './data/letters';
import { getAvailableLetters, getDefaultLetter } from './utils/date';
import { Header } from './components/Header';
import { DateNavigation } from './components/DateNavigation';
import { LetterView } from './components/LetterView';
import { Preloader } from './components/Preloader';
import { Letter } from './types';
import { BookOpen } from 'lucide-react';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  // 1. Filter out any future letters so they remain strictly hidden
  const availableLetters = useMemo(() => {
    return getAvailableLetters(allLetters);
  }, []);

  // 2. Default to the oldest available letter (first in chronological sequence)
  const defaultLetter = useMemo(() => {
    return getDefaultLetter(availableLetters);
  }, [availableLetters]);

  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(
    () => defaultLetter?.id || null
  );

  // Synchronize if letters change or default changes
  useEffect(() => {
    if (!selectedLetterId && defaultLetter) {
      setSelectedLetterId(defaultLetter.id);
    }
  }, [defaultLetter, selectedLetterId]);

  // Active letter resolution
  const currentLetter = useMemo(() => {
    if (!availableLetters.length) return null;
    const found = availableLetters.find((l) => l.id === selectedLetterId);
    return found || defaultLetter || availableLetters[0] || null;
  }, [availableLetters, selectedLetterId, defaultLetter]);

  // Index and adjacent letters for previous/next navigation
  const currentIndex = useMemo(() => {
    if (!currentLetter) return -1;
    return availableLetters.findIndex((l) => l.id === currentLetter.id);
  }, [availableLetters, currentLetter]);

  const previousLetter = currentIndex > 0 ? availableLetters[currentIndex - 1] : null;
  const nextLetter =
    currentIndex >= 0 && currentIndex < availableLetters.length - 1
      ? availableLetters[currentIndex + 1]
      : null;

  const handleSelectLetter = useCallback((letter: Letter) => {
    setSelectedLetterId(letter.id);
    // Smoothly scroll to reading start if viewport is scrolled far down
    const readingView = document.getElementById('letter-reading-view');
    if (readingView && window.scrollY > 300) {
      readingView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Keyboard navigation for previous/next letter (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is inside an input or iframe
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'IFRAME'
      ) {
        return;
      }

      if (e.key === 'ArrowLeft' && previousLetter) {
        e.preventDefault();
        handleSelectLetter(previousLetter);
      } else if (e.key === 'ArrowRight' && nextLetter) {
        e.preventDefault();
        handleSelectLetter(nextLetter);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [previousLetter, nextLetter, handleSelectLetter]);

  return (
    <div className="min-h-screen bg-[#F3F6F4] scrapbook-dot-grid text-[#26201A] py-0 sm:py-6 md:py-10 px-0 sm:px-4 md:px-6 flex flex-col justify-between selection:bg-[#FDD8D5] selection:text-[#93302B]">
      {/* Artisanal Preloader inspired by romantic stationery and wanderer postage stamp */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Artsy Scrapbook Folio / Journal Book Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto bg-[#FFFEFB] border-x sm:border-y sm:border-x border-[#EADFD9] rounded-none sm:rounded-3xl shadow-[0_16px_48px_rgba(40,30,25,0.08),0_2px_8px_rgba(40,30,25,0.04)] relative overflow-hidden">
        {/* Decorative pastel washi tape accent on the desk top-edge */}
        <div
          className="washi-tape-butter washi-tape-edge hidden sm:block absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-4 z-40 pointer-events-none rounded-[1px] opacity-80"
          aria-hidden="true"
        />

        {/* Header & Ambient Journal Music */}
        <Header config={journalConfig} onReplayIntro={() => setShowPreloader(true)} />

        {/* Horizontal Date Navigation */}
        {availableLetters.length > 0 && (
          <DateNavigation
            letters={availableLetters}
            selectedLetterId={currentLetter?.id || null}
            onSelectLetter={handleSelectLetter}
          />
        )}

        {/* Selected Letter Main Reading Area */}
        {currentLetter ? (
          <LetterView
            letter={currentLetter}
            previousLetter={previousLetter}
            nextLetter={nextLetter}
            onNavigate={handleSelectLetter}
          />
        ) : (
          /* Empty state */
          <div
            id="empty-state"
            className="text-center py-24 px-6 max-w-md mx-auto"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0EF] text-[#D84C45] mx-auto flex items-center justify-center mb-4 border border-[#F6C2BD] shadow-sm">
              <BookOpen className="w-6 h-6 text-[#E27B75]" />
            </div>
            <h2 className="font-headline text-2xl text-[#28201A] font-bold">
              a scrapbook of memories
            </h2>
            <p className="font-handwriting text-lg text-[#6E5D52] mt-2 leading-relaxed">
              Every page is written with care, waiting for you to open it. ♡
            </p>
          </div>
        )}

        {/* Artsy Scrapbook Footer */}
        <footer
          id="journal-footer"
          className="py-6 px-4 text-center border-t border-[#EFE5DF] bg-[#FFF9F7]"
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-[#D84C45]">
            <span className="h-px w-8 bg-[#F2C4C0]" />
            <span className="font-handwriting text-base font-bold">handcrafted with love</span>
            <span className="h-px w-8 bg-[#F2C4C0]" />
          </div>
          <p className="font-headline text-base sm:text-lg text-[#2A221C] font-bold">
            A scrapbook of letters for {journalConfig.recipient}
          </p>
        </footer>
      </div>
    </div>
  );
}

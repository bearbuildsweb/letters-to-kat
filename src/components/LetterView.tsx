import React from 'react';
import { Letter } from '../types';
import { formatEditorialDate } from '../utils/date';
import { SongPlayer } from './SongPlayer';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, MapPin, Heart, Sparkles } from 'lucide-react';

interface LetterViewProps {
  letter: Letter;
  previousLetter?: Letter | null;
  nextLetter?: Letter | null;
  onNavigate: (letter: Letter) => void;
}

export const LetterView: React.FC<LetterViewProps> = ({
  letter,
  previousLetter,
  nextLetter,
  onNavigate,
}) => {
  const formattedDate = formatEditorialDate(letter.date);

  // Divide paragraphs into parts so the first media player is placed organically
  // right where an image used to sit (approx halfway through the reading experience)
  const paragraphAndQuoteBlocks = letter.content.filter(
    (b) => b.type === 'paragraph' || b.type === 'quote'
  );

  const midpoint = Math.max(1, Math.floor(paragraphAndQuoteBlocks.length / 2));
  const firstHalfBlocks = paragraphAndQuoteBlocks.slice(0, midpoint);
  const secondHalfBlocks = paragraphAndQuoteBlocks.slice(midpoint);

  return (
    <main
      id="letter-reading-view"
      className="w-full max-w-[760px] mx-auto px-3 sm:px-6 pt-2 pb-16 sm:pb-24"
    >
      <AnimatePresence mode="wait">
        <motion.article
          key={letter.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Layered Scrapbook Card: Colorful Matting Paper behind the letter */}
          <div className="relative">
            {/* Background Layer: Tilted soft sage green backing mat */}
            <div
              className="absolute inset-0 bg-[#E8F2EA] border border-[#BFD9C5] rounded-2xl -rotate-[1deg] translate-y-1.5 pointer-events-none shadow-sm"
              aria-hidden="true"
            />

            {/* Background Layer 2: Tilted soft peach/rose mat */}
            <div
              className="absolute inset-0 bg-[#FDF0EC] border border-[#F6CBC5] rounded-2xl rotate-[0.8deg] -translate-y-1 pointer-events-none shadow-sm"
              aria-hidden="true"
            />

            {/* Primary Scrapbook Lined Letter Paper */}
            <div className="relative z-10 bg-[#FFFDF9] border border-[#E8DDD8] shadow-[0_10px_32px_rgba(45,35,30,0.08)] p-4 sm:p-8 md:p-12 scrapbook-pastel-lined scrapbook-margin-rose rounded-xl sm:rounded-2xl overflow-hidden">
              {/* Top-left Rose Washi Tape */}
              <div
                className="washi-tape-rose washi-tape-edge absolute -top-3 -left-3 sm:-top-3.5 sm:-left-4 w-22 sm:w-28 h-6 -rotate-12 z-20 pointer-events-none rounded-[1px] flex items-center justify-center text-xs sm:text-sm font-handwriting font-bold tracking-wide text-[#751410] select-none shadow-sm"
                aria-hidden="true"
              >
                dear kat ♡
              </div>

              {/* Top-right Sage Washi Tape */}
              <div
                className="washi-tape-sage washi-tape-edge absolute -top-3 -right-3 sm:-top-3.5 sm:-right-4 w-26 sm:w-30 h-6 rotate-12 z-20 pointer-events-none rounded-[1px] flex items-center justify-center text-xs sm:text-sm font-handwriting font-bold tracking-wide text-[#144222] select-none whitespace-nowrap shadow-sm"
                aria-hidden="true"
              >
                Unsaid Things
              </div>

              {/* Scrapbook Letter Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b border-dashed border-[#E8DCD8]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0EF] border border-[#F6BEB9] font-handwriting text-[#C8524B] text-xs sm:text-sm font-bold flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-[#E27B75] text-[#E27B75]" />
                    <span>a letter for you</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-sans text-[#786B60]">
                  <time dateTime={letter.date} className="font-semibold text-[#251E19]">
                    {formattedDate}
                  </time>
                  {letter.location && (
                    <>
                      <span className="text-[#D0C0B8]">·</span>
                      <span className="italic font-editorial text-[#5E5246] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E27B75]" />
                        {letter.location}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Letter Title Header */}
              <header className="text-center pt-2 pb-6 sm:pb-8">
                <h2
                  id="letter-title"
                  className="font-headline text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#251E19] tracking-tight leading-[1.15] max-w-xl mx-auto"
                >
                  {letter.title || formattedDate}
                </h2>

                <div className="mt-4 flex items-center justify-center gap-2.5 text-[#E07A74]">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#F2B0AC]" />
                  <Sparkles className="w-3.5 h-3.5 text-[#E27B75]" />
                  <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#F2B0AC]" />
                </div>
              </header>

              {/* Letter Body Content - First Section */}
              <div className="space-y-6 text-[#241E18]">
                {firstHalfBlocks.map((block, idx) => {
                  if (block.type === 'paragraph' && block.text) {
                    return (
                      <p
                        key={`p1-${idx}`}
                        className={`font-editorial text-[1.125rem] sm:text-[1.22rem] leading-[2rem] sm:leading-[2.15rem] text-[#2C241E] font-light text-justify hyphens-auto ${
                          idx === 0
                            ? 'first-letter:font-headline first-letter:text-[3.25rem] first-letter:leading-[0.8] first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:text-[#C8524B] first-letter:font-bold'
                            : ''
                        }`}
                      >
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === 'quote' && block.text) {
                    return (
                      <div
                        key={`q1-${idx}`}
                        className="relative my-7 sm:my-9 p-5 sm:p-6 bg-[#FFF9E6] border border-[#F5E2A8] rounded-xl shadow-[0_4px_14px_rgba(180,140,50,0.08)] -rotate-[0.8deg]"
                      >
                        <div
                          className="washi-tape-rose washi-tape-edge absolute -top-2.5 left-6 w-16 h-4 -rotate-3 pointer-events-none rounded-[1px]"
                          aria-hidden="true"
                        />
                        <span className="font-handwriting text-xs text-[#9B6F00] font-bold block mb-1">
                          ♡ favourite thought
                        </span>
                        <blockquote className="italic font-editorial text-[1.2rem] sm:text-[1.32rem] text-[#3E3224] leading-relaxed">
                          “{block.text}”
                        </blockquote>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              {/* First Media Player - Placed organically in place of the image, playable in-app */}
              {letter.song && (
                <div className="my-6 sm:my-8">
                  <SongPlayer
                    id="letter-reading-song-1"
                    song={letter.song}
                    label="melody of this memory ♡"
                    variant="in-letter"
                  />
                </div>
              )}

              {/* Letter Body Content - Second Section */}
              <div className="space-y-6 text-[#241E18] mt-6">
                {secondHalfBlocks.map((block, idx) => {
                  if (block.type === 'paragraph' && block.text) {
                    return (
                      <p
                        key={`p2-${idx}`}
                        className="font-editorial text-[1.125rem] sm:text-[1.22rem] leading-[2rem] sm:leading-[2.15rem] text-[#2C241E] font-light text-justify hyphens-auto"
                      >
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === 'quote' && block.text) {
                    return (
                      <div
                        key={`q2-${idx}`}
                        className="relative my-7 sm:my-9 p-5 sm:p-6 bg-[#FFF9E6] border border-[#F5E2A8] rounded-xl shadow-[0_4px_14px_rgba(180,140,50,0.08)] rotate-[0.8deg]"
                      >
                        <div
                          className="washi-tape-sage washi-tape-edge absolute -top-2.5 right-6 w-16 h-4 rotate-3 pointer-events-none rounded-[1px]"
                          aria-hidden="true"
                        />
                        <span className="font-handwriting text-xs text-[#9B6F00] font-bold block mb-1">
                          ♡ kept close to heart
                        </span>
                        <blockquote className="italic font-editorial text-[1.2rem] sm:text-[1.32rem] text-[#3E3224] leading-relaxed">
                          “{block.text}”
                        </blockquote>
                      </div>
                    );
                  }

                  return null;
                })}

                {/* Sign-off in authentic handwritten script font */}
                {letter.signOff && (
                  <div className="pt-6 sm:pt-8 text-right">
                    <p className="font-handwriting text-3xl sm:text-4xl text-[#C8524B] -rotate-1 select-none font-bold">
                      {letter.signOff}
                      <span className="ml-2 inline-block text-2xl">♡</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Second Media Player - Placed at the bottom of the letter content */}
              {letter.songSecondary && (
                <SongPlayer
                  id="letter-reading-song-2"
                  song={letter.songSecondary}
                  label="listen as you finish reading ♫"
                  variant="letter-bottom"
                />
              )}

              {/* Previous / Next Letter Navigation styled as colorful scrapbook cards */}
              <footer
                id="letter-bottom-nav"
                className="mt-6 pt-4 border-t border-[#E8DDD8]"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Previous Letter */}
                  <div className="w-full sm:w-1/2 flex justify-start">
                    {previousLetter ? (
                      <button
                        id="prev-letter-btn"
                        onClick={() => onNavigate(previousLetter)}
                        className="group relative bg-[#FFF2F0] hover:bg-[#FFE9E6] border border-[#F5C2BD] px-4 py-2.5 text-left rounded-xl shadow-sm transition-all active:translate-x-0.5 active:translate-y-0.5 w-full sm:w-auto"
                      >
                        <div className="flex items-center gap-1.5 text-xs text-[#C8524B] font-handwriting font-bold">
                          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                          <span>earlier letter</span>
                        </div>
                        <div className="font-headline text-sm sm:text-base text-[#251E19] font-bold mt-0.5 line-clamp-1">
                          {previousLetter.title}
                        </div>
                      </button>
                    ) : null}
                  </div>

                  {/* Next Letter */}
                  <div className="w-full sm:w-1/2 flex justify-end">
                    {nextLetter ? (
                      <button
                        id="next-letter-btn"
                        onClick={() => onNavigate(nextLetter)}
                        className="group relative bg-[#F0F6FC] hover:bg-[#E5EFF9] border border-[#C5DDF6] px-4 py-2.5 text-right rounded-xl shadow-sm transition-all active:translate-x-0.5 active:translate-y-0.5 w-full sm:w-auto ml-auto"
                      >
                        <div className="flex items-center justify-end gap-1.5 text-xs text-[#2A659E] font-handwriting font-bold">
                          <span>next letter</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                        <div className="font-headline text-sm sm:text-base text-[#251E19] font-bold mt-0.5 line-clamp-1">
                          {nextLetter.title}
                        </div>
                      </button>
                    ) : null}
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </main>
  );
};

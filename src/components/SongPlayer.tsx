import React from 'react';
import { SongConfig } from '../types';
import { getEmbedInfo } from '../utils/media';
import { ExternalLink, Disc3, Music2, Sparkles } from 'lucide-react';

interface SongPlayerProps {
  id?: string;
  song?: SongConfig;
  label?: string;
  variant?: 'journal' | 'in-letter' | 'letter-bottom';
}

export const SongPlayer: React.FC<SongPlayerProps> = ({
  id,
  song,
  label,
  variant = 'in-letter',
}) => {
  if (!song || !song.url) {
    return null;
  }

  const embedInfo = getEmbedInfo(song);
  const platform = embedInfo?.platform || song.platform;
  const platformName = platform === 'youtube' ? 'YouTube' : platform === 'spotify' ? 'Spotify' : 'Music';

  // In-letter placement (replaces photograph) or letter-bottom placement
  const isInLetter = variant === 'in-letter';

  // Palette variant: in-letter uses soft rose/blush; letter-bottom uses soft periwinkle/lavender
  const cardBg = isInLetter
    ? 'bg-[#FFF3F2] border-[#F4BEB9]'
    : 'bg-[#F2F6FC] border-[#C4DBF5]';
  const washiClass = isInLetter ? 'washi-tape-rose' : 'washi-tape-periwinkle';
  const iconBg = isInLetter
    ? 'bg-[#FFE2E0] text-[#D84C45] border-[#F7BAB5]'
    : 'bg-[#DEECFB] text-[#2F659E] border-[#BAD8F7]';
  const tagColor = isInLetter ? 'text-[#C94740]' : 'text-[#2D6096]';

  return (
    <div
      id={id}
      className={`relative w-full max-w-[660px] mx-auto rounded-xl sm:rounded-2xl border p-3 sm:p-5 shadow-[0_4px_16px_rgba(50,40,35,0.06)] ${cardBg} ${
        isInLetter ? 'my-6 sm:my-9' : 'mt-8 sm:mt-9 pt-4 sm:pt-5'
      }`}
    >
      {/* Playful washi tape strip holding the song card */}
      <div
        className={`${washiClass} washi-tape-edge absolute -top-3 ${
          isInLetter ? 'left-8 sm:left-12 -rotate-2' : 'right-8 sm:right-12 rotate-2'
        } w-20 sm:w-24 h-5 z-10 pointer-events-none rounded-[1px] flex items-center justify-center text-[9px] font-handwriting select-none opacity-90`}
        aria-hidden="true"
      >
        <span>♫ sound clip</span>
      </div>

      {/* Header bar of the audio card */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border shadow-sm ${iconBg}`}
          >
            {isInLetter ? (
              <Music2 className="w-4 h-4" />
            ) : (
              <Disc3 className="w-4 h-4 animate-[spin_8s_linear_infinite]" />
            )}
          </div>
          <div className="min-w-0">
            <div className={`text-[11px] font-handwriting font-bold tracking-wide flex items-center gap-1 ${tagColor}`}>
              <Sparkles className="w-3 h-3" />
              <span>{label || (isInLetter ? 'melody for this moment ♡' : 'listen while you read ♫')}</span>
            </div>
            <div className="font-headline text-base sm:text-lg text-[#251E19] font-bold leading-tight truncate">
              {song.title}
              <span className="font-editorial italic text-xs sm:text-sm font-normal text-[#695D52] ml-2">
                — {song.artist}
              </span>
            </div>
          </div>
        </div>

        {/* Platform Direct Link Ticket */}
        <a
          id={`${id}-open-btn`}
          href={song.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#463D36] hover:text-[#221B16] px-3 py-1.5 rounded-full border border-[#DED0CC] bg-white/90 hover:bg-white transition-all flex-shrink-0 shadow-sm"
          title={`Open in ${platformName}`}
        >
          <span>{platformName}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Embedded Audio/Video Player directly playable in the app */}
      {embedInfo?.isEmbeddable && embedInfo.embedUrl ? (
        <div className="rounded-xl overflow-hidden border border-[#E2D5D1] bg-black/5 shadow-inner">
          {embedInfo.platform === 'spotify' ? (
            <iframe
              id={`${id}-spotify-iframe`}
              title={`Spotify player: ${song.title} by ${song.artist}`}
              src={embedInfo.embedUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full bg-transparent min-h-[152px] block"
            />
          ) : (
            <div className="relative w-full aspect-video">
              <iframe
                id={`${id}-youtube-iframe`}
                title={`YouTube player: ${song.title} by ${song.artist}`}
                src={embedInfo.embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 bg-white/80 rounded-xl text-xs font-sans text-[#5E5148] flex items-center justify-between border border-[#E8DAD7]">
          <span>Listen directly on streaming service:</span>
          <a
            href={song.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#C8524B] hover:underline inline-flex items-center gap-1"
          >
            Play on {platformName}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
};

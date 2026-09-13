/**
 * Type definitions for the Letters to Kat journal
 */

export type MusicPlatform = 'spotify' | 'youtube' | 'custom';

export interface SongConfig {
  platform: MusicPlatform;
  url: string;
  title: string;
  artist: string;
  note?: string;
}

export type ContentBlockType = 'paragraph' | 'image' | 'quote' | 'divider';

export interface ContentBlock {
  type: ContentBlockType;
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

export interface Letter {
  id: string;
  date: string; // Format: YYYY-MM-DD
  title: string;
  content: ContentBlock[];
  song?: SongConfig; // First track: placed in letter body in place of the image
  songSecondary?: SongConfig; // Second track: placed below letter content
  location?: string;
  signOff?: string;
}

export interface JournalConfig {
  title: string;
  subtitle?: string;
  recipient: string;
  author?: string;
  journalSong?: SongConfig;
}

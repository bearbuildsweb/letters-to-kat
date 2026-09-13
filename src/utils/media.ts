import { SongConfig } from '../types';

export interface EmbedResult {
  isEmbeddable: boolean;
  embedUrl: string | null;
  platform: 'spotify' | 'youtube' | 'external';
  cleanUrl: string;
}

/**
 * Parses a Spotify URL to obtain its embed URL
 */
export function getSpotifyEmbedUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    // Patterns:
    // /track/{id}
    // /album/{id}
    // /playlist/{id}
    // /episode/{id}
    const match = url.pathname.match(/\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/);
    if (match) {
      const type = match[1];
      const id = match[2];
      return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
    }
  } catch {
    // If not a valid URL object, check regex directly
    const match = rawUrl.match(/(?:spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist|episode)\/)([a-zA-Z0-9]+)/i);
    if (match) {
      return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
    }
  }
  return null;
}

/**
 * Parses a YouTube / YouTube Music URL to obtain its embed URL
 */
export function getYouTubeEmbedUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);

    // youtu.be/{id}
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.slice(1).split('/')[0];
      if (id) {
        return `https://www.youtube-nocookie.com/embed/${id}`;
      }
    }

    // youtube.com or music.youtube.com
    if (url.hostname.includes('youtube.com')) {
      // /watch?v={id}
      const v = url.searchParams.get('v');
      if (v) {
        return `https://www.youtube-nocookie.com/embed/${v}`;
      }
      // /embed/{id}
      const embedMatch = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]+)/);
      if (embedMatch) {
        return `https://www.youtube-nocookie.com/embed/${embedMatch[1]}`;
      }
    }
  } catch {
    // Regex fallback
    const idMatch = rawUrl.match(/(?:youtu\.be\/|v=|\/embed\/)([a-zA-Z0-9_-]{11})/);
    if (idMatch) {
      return `https://www.youtube-nocookie.com/embed/${idMatch[1]}`;
    }
  }
  return null;
}

/**
 * Returns structured embed information for any song configuration.
 * Automatically inspects the URL to reliably identify YouTube vs Spotify.
 */
export function getEmbedInfo(song?: SongConfig): EmbedResult | null {
  if (!song || !song.url) return null;

  const rawUrl = song.url.trim();

  // Check if it's YouTube (via URL pattern or explicit platform)
  const isYouTube =
    rawUrl.includes('youtube.com') ||
    rawUrl.includes('youtu.be') ||
    song.platform === 'youtube';

  if (isYouTube) {
    const embedUrl = getYouTubeEmbedUrl(rawUrl);
    if (embedUrl) {
      return {
        isEmbeddable: true,
        embedUrl,
        platform: 'youtube',
        cleanUrl: rawUrl,
      };
    }
  }

  // Check if it's Spotify (via URL pattern or explicit platform)
  const isSpotify =
    rawUrl.includes('spotify.com') ||
    song.platform === 'spotify';

  if (isSpotify) {
    const embedUrl = getSpotifyEmbedUrl(rawUrl);
    if (embedUrl) {
      return {
        isEmbeddable: true,
        embedUrl,
        platform: 'spotify',
        cleanUrl: rawUrl,
      };
    }
  }

  // Fallback / Custom External
  return {
    isEmbeddable: false,
    embedUrl: null,
    platform: isYouTube ? 'youtube' : isSpotify ? 'spotify' : 'external',
    cleanUrl: rawUrl,
  };
}

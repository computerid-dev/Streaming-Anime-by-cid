import { getEpisode } from '@/lib/scraper';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, List, AlertCircle } from 'lucide-react';

export default async function EpisodePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  const episode = await getEpisode(slug);

  if (!episode.title) {
    return (
      <div className="text-center py-20 border-2 border-[var(--line)] bg-[var(--ink-soft)]">
        <h1 className="font-display text-2xl uppercase text-[#f2ecdc]">Episode Not Found</h1>
        <p className="text-[#f2ecdc]/50 mt-2">The episode you requested could not be loaded.</p>
        <Link href="/" className="inline-block mt-4 px-4 py-2 border-2 border-[var(--line)] font-bold uppercase text-sm text-[var(--volt)] hover:bg-[var(--volt)] hover:text-black transition-colors">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-2 border-[var(--line)] bg-[var(--ink-soft)] px-4 py-3">
        <div>
          <h1 className="font-display text-xl md:text-2xl uppercase text-[#f2ecdc]">{episode.title}</h1>
        </div>
        {episode.allEpisodesSlug && (
          <Link
            href={`/anime/${episode.allEpisodesSlug}`}
            className="flex items-center gap-2 text-sm font-bold uppercase text-black bg-[var(--volt)] border-2 border-black px-4 py-2 brutal-press-sm shrink-0"
          >
            <List className="w-4 h-4" /> All Episodes
          </Link>
        )}
      </div>

      {/* Video Player Section */}
      <div className="w-full aspect-video bg-black overflow-hidden relative border-[3px] border-[var(--line)] brutal-shadow-flame">
        {episode.iframeUrl ? (
          <iframe
            src={episode.iframeUrl}
            allowFullScreen
            className="w-full h-full border-0 absolute inset-0"
          ></iframe>
        ) : episode.videoUrl ? (
          <video
            src={episode.videoUrl}
            controls
            className="w-full h-full outline-none"
            controlsList="nodownload"
          ></video>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-[#f2ecdc]/40 space-y-4">
             <AlertCircle className="w-12 h-12 text-[#f2ecdc]/30" />
             <p className="font-mono-tag text-sm">No video player found for this episode.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-2 pt-4 border-t-2 border-[var(--line)]">
        {episode.prevEpisode ? (
          <Link
            href={`/episode/${episode.prevEpisode}`}
            className="flex items-center gap-2 px-4 py-2 border-2 border-[var(--line)] text-[#f2ecdc]/70 hover:text-[#f2ecdc] hover:border-[var(--volt)] transition-colors font-bold uppercase text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Prev Episode
          </Link>
        ) : (
          <div className="w-[140px]"></div>
        )}

        {episode.nextEpisode ? (
          <Link
            href={`/episode/${episode.nextEpisode}`}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--volt)] text-black border-2 border-black hover:bg-[#f2ecdc] transition-colors font-bold uppercase text-sm brutal-press-sm"
          >
            Next Episode <ChevronRight className="w-4 h-4" />
          </Link>
        ) : null}
      </div>

      {/* Episode List (Dropdown or Grid) */}
      {episode.episodeList && episode.episodeList.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 border-2 border-[var(--line)] bg-[var(--ink-soft)] px-4 py-2.5">
            <h3 className="font-display text-lg uppercase text-[#f2ecdc]">Other Episodes</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {episode.episodeList.map((ep: {slug: string, title: string, info: string}) => (
              <Link
                key={ep.slug}
                href={`/episode/${ep.slug}`}
                className={`p-3 border-2 text-sm font-bold transition-all ${
                  ep.slug === slug
                  ? 'border-[var(--volt)] bg-[var(--volt)]/10 text-[var(--volt)]'
                  : 'border-[var(--line)] bg-[var(--ink-soft)] hover:border-[#f2ecdc]/40 text-[#f2ecdc]/60 hover:text-[#f2ecdc]'
                }`}
              >
                <div className="truncate">{ep.title}</div>
                {ep.info && <div className="text-xs text-[#f2ecdc]/40 mt-1 font-mono-tag">{ep.info}</div>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

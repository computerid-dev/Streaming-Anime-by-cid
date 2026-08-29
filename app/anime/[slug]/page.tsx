import { getDetail } from '@/lib/scraper';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Calendar } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';

export default async function AnimeDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  const anime = await getDetail(slug);

  if (!anime.title) {
    return (
      <div className="text-center py-20 border-2 border-[var(--line)] bg-[var(--ink-soft)]">
        <h1 className="font-display text-2xl uppercase text-[#f2ecdc]">Anime Not Found</h1>
        <p className="text-[#f2ecdc]/50 mt-2">The anime you requested could not be loaded.</p>
        <Link href="/" className="inline-block mt-4 px-4 py-2 border-2 border-[var(--line)] font-bold uppercase text-sm text-[var(--volt)] hover:bg-[var(--volt)] hover:text-black transition-colors">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 max-w-xs mx-auto md:mx-0 shrink-0">
          <div className="relative aspect-[2/3] w-full overflow-hidden border-[3px] border-[var(--line)] brutal-shadow bg-neutral-800">
            {anime.poster ? (
              <Image
                src={anime.poster.startsWith('http') ? anime.poster : `https:${anime.poster}`}
                alt={anime.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-white/30 font-mono-tag">NO IMAGE</div>}
          </div>
          <div className="mt-6 flex gap-2">
            <FavoriteButton anime={{ slug: anime.slug, title: anime.title, poster: anime.poster }} />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl uppercase text-[#f2ecdc] mb-3 leading-tight">{anime.title}</h1>
            <div className="flex flex-wrap gap-2 items-center text-sm font-bold">
              {anime.rating && (
                <div className="flex items-center gap-1 bg-[var(--volt)] text-black border-2 border-black px-2 py-1">
                  <Star className="w-4 h-4 fill-black" /> {anime.rating}
                </div>
              )}
              {anime.status && (
                <div className="flex items-center gap-1 border-2 border-[var(--line)] px-2 py-1 text-[#f2ecdc] text-xs uppercase font-mono-tag">
                   {anime.status}
                </div>
              )}
              {anime.duration && (
                <div className="flex items-center gap-1 border-2 border-[var(--line)] px-2 py-1 text-[#f2ecdc]/80">
                  <Clock className="w-4 h-4" /> {anime.duration}
                </div>
              )}
              {anime.released && (
                <div className="flex items-center gap-1 border-2 border-[var(--line)] px-2 py-1 text-[#f2ecdc]/80">
                  <Calendar className="w-4 h-4" /> {anime.released}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {anime.genres.map((g: {slug: string, name: string}) => (
              <Link
                key={g.slug}
                href={`/genre/${g.slug}`}
                className="text-xs font-bold uppercase px-3 py-1.5 border-2 border-[var(--cobalt)] text-[var(--cobalt)] hover:bg-[var(--cobalt)] hover:text-black transition-colors"
              >
                {g.name}
              </Link>
            ))}
          </div>

          {anime.synopsis && (
            <div className="border-l-[3px] border-[var(--volt)] pl-4">
              <h3 className="font-display text-lg uppercase text-[#f2ecdc] mb-2">Synopsis</h3>
              <p className="text-[#f2ecdc]/60 leading-relaxed text-sm md:text-base">
                {anime.synopsis}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {anime.type && (
              <div className="border-2 border-[var(--line)] p-3">
                <span className="text-[#f2ecdc]/40 block text-[10px] uppercase tracking-wider font-mono-tag mb-1">Type</span>
                <span className="font-bold text-[#f2ecdc]">{anime.type}</span>
              </div>
            )}
            {anime.studio && (
              <div className="border-2 border-[var(--line)] p-3">
                <span className="text-[#f2ecdc]/40 block text-[10px] uppercase tracking-wider font-mono-tag mb-1">Studio</span>
                <span className="font-bold text-[#f2ecdc]">{anime.studio}</span>
              </div>
            )}
            {anime.totalEps && (
              <div className="border-2 border-[var(--line)] p-3">
                <span className="text-[#f2ecdc]/40 block text-[10px] uppercase tracking-wider font-mono-tag mb-1">Episodes</span>
                <span className="font-bold text-[#f2ecdc]">{anime.totalEps}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Episode List */}
      <div className="mt-4">
        <div className="mb-6 border-2 border-[var(--line)] bg-[var(--ink-soft)] px-4 py-2.5 flex items-center gap-2">
          <h3 className="font-display text-lg uppercase text-[#f2ecdc]">Episodes</h3>
          <span className="text-sm font-mono-tag text-[#f2ecdc]/40">({anime.episodes.length})</span>
        </div>
        {anime.episodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {anime.episodes.map(ep => (
              <Link
                key={ep.slug}
                href={`/episode/${ep.slug}`}
                className="flex items-center gap-4 p-3 border-2 border-[var(--line)] bg-[var(--ink-soft)] hover:border-[var(--volt)] transition-colors group"
              >
                <div className="flex items-center justify-center w-10 h-10 border-2 border-[var(--line)] text-[#f2ecdc]/60 font-bold font-mono-tag group-hover:bg-[var(--volt)] group-hover:text-black group-hover:border-black transition-colors shrink-0">
                  {ep.number || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#f2ecdc] truncate group-hover:text-[var(--volt)] transition-colors">
                    {ep.title || `Episode ${ep.number}`}
                  </h4>
                  {ep.date && <p className="text-xs text-[#f2ecdc]/40 font-mono-tag">{ep.date}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
           <div className="text-center py-10 text-[#f2ecdc]/40 border-2 border-[var(--line)] bg-[var(--ink-soft)]">
             No episodes available yet.
           </div>
        )}
      </div>
    </div>
  );
}

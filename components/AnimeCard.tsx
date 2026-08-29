import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle, Bookmark, Star } from 'lucide-react';
import type { AnimeItem } from '@/lib/scraper';

export function AnimeCard({ anime }: { anime: AnimeItem }) {
  return (
    <Link
      href={`/anime/${anime.slug}`}
      className="group relative flex flex-col gap-2 brutal-border-strong bg-[var(--ink-soft)] brutal-shadow brutal-press"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-800 border-b-[3px] border-[var(--line)]">
        {anime.poster ? (
          <Image
            src={anime.poster.startsWith('http') ? anime.poster : `https:${anime.poster}`}
            alt={anime.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-mono-tag text-white/30">
            NO IMAGE
          </div>
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex items-center justify-center pointer-events-none">
          <PlayCircle className="w-12 h-12 text-[var(--volt)] scale-75 group-hover:scale-100 transition-transform duration-200" />
        </div>

        {/* Top left Bookmark */}
        <div className="absolute top-2 left-2 flex items-center justify-center w-8 h-8 bg-[var(--ink)] border-2 border-[var(--line)]">
          <Bookmark className="w-4 h-4 text-[#f2ecdc]" />
        </div>

        {/* Top right Badge — sticker style */}
        {(anime.episode || anime.status) && (
          <div className="absolute top-2 right-2">
            <span className="stamp px-2 py-1 text-[10px]">
              <Star className="w-3 h-3 fill-black" />
              {anime.episode || anime.status}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
          <div className="flex justify-between items-center text-xs w-full font-mono-tag uppercase text-white">
            <span className="truncate">{anime.type || 'Anime'}</span>
            {anime.sub && <span className="text-[var(--volt)] ml-2 shrink-0">{anime.sub}</span>}
          </div>
        </div>
      </div>
      <div className="px-2 pb-2 mt-0.5">
        <h3 className="line-clamp-2 text-sm font-bold text-[#f2ecdc] group-hover:text-[var(--volt)] transition-colors">
          {anime.title}
        </h3>
        {(anime.type || anime.status) && (
          <p className="text-[11px] font-mono-tag uppercase text-[#f2ecdc]/40 mt-1 truncate">
            {anime.type || "Anime"} {anime.status ? `• ${anime.status}` : ''}
          </p>
        )}
      </div>
    </Link>
  );
}

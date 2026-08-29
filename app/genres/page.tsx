import { getGenresList } from '@/lib/scraper';
import Link from 'next/link';

export default async function GenresPage() {
  const genres = await getGenresList();

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="mb-4 border-2 border-[var(--line)] bg-[var(--ink-soft)] px-5 py-5 text-center">
        <h1 className="font-display text-2xl md:text-3xl uppercase text-[#f2ecdc] mb-2">Anime Genres</h1>
        <p className="text-[#f2ecdc]/40 text-sm">Browse anime by your favorite categories.</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {genres.map(genre => (
          <Link
            key={genre.slug}
            href={`/genre/${genre.slug}`}
            className="group flex items-center justify-between gap-3 px-4 py-2 border-2 border-[var(--line)] bg-[var(--ink-soft)] hover:border-black hover:bg-[var(--volt)] transition-colors"
          >
            <span className="font-bold text-[#f2ecdc] group-hover:text-black">{genre.name}</span>
            {genre.count !== null && (
              <span className="text-[10px] font-mono-tag border border-[#f2ecdc]/30 group-hover:border-black/40 px-1.5 py-0.5 text-[#f2ecdc]/40 group-hover:text-black/60">
                {genre.count}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

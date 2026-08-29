'use client';

import { useFavorites } from '@/hooks/use-favorites';
import { AnimeCard } from '@/components/AnimeCard';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return <div className="animate-pulse p-8 font-mono-tag text-[#f2ecdc]/50">Loading favorites...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-4 border-2 border-[var(--line)] bg-[var(--ink-soft)] px-4 py-3">
        <Heart className="text-[var(--flame)] fill-[var(--flame)]" />
        <h1 className="font-display text-xl md:text-2xl uppercase text-[#f2ecdc]">Your Favorites</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {favorites.map((anime, i) => (
            <AnimeCard
              key={`fav-${anime.slug}-${i}`}
              anime={{
                title: anime.title,
                slug: anime.slug,
                poster: anime.poster,
                link: '',
                status: null,
                type: null,
                episode: null,
                sub: null
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 flex flex-col items-center justify-center gap-4 border-2 border-[var(--line)] bg-[var(--ink-soft)]">
          <Heart className="w-16 h-16 text-[#f2ecdc]/20" />
          <h2 className="font-display text-lg uppercase text-[#f2ecdc]/60">No favorites yet</h2>
          <p className="text-sm text-[#f2ecdc]/40">Go to an anime detail page and click the heart icon to add it here.</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import type { FavoriteItem } from '@/hooks/use-favorites';

export function FavoriteButton({ anime }: { anime: FavoriteItem }) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  if (!isLoaded) return <div className="w-full h-11 border-2 border-[var(--line)] animate-pulse"></div>;

  const fav = isFavorite(anime.slug);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(anime);
      }}
      className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 font-bold uppercase text-sm border-2 transition-all brutal-press-sm ${
        fav
        ? 'bg-[var(--flame)] text-black border-black'
        : 'bg-[var(--ink-soft)] text-[#f2ecdc]/80 border-[var(--line)] hover:text-[#f2ecdc]'
      }`}
    >
      <Heart className={`w-5 h-5 ${fav ? 'fill-black' : ''}`} />
      {fav ? 'Favorited' : 'Add to Favorites'}
    </button>
  );
}

'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export function HorizontalScroller({
  title,
  viewAllHref,
  children
}: {
  title: string;
  viewAllHref?: string;
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 gap-3 border-2 border-[var(--line)] bg-[var(--ink-soft)] px-4 py-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="font-display text-base md:text-lg uppercase text-[#f2ecdc] truncate">
            {title}
          </h2>
          {viewAllHref && (
            <>
              <span className="w-px h-5 bg-[var(--line)] shrink-0"></span>
              <Link
                href={viewAllHref}
                className="text-xs font-bold uppercase tracking-wide text-[var(--volt)] hover:underline shrink-0"
              >
                View All
              </Link>
            </>
          )}
        </div>
        <div className="hidden sm:flex gap-2 shrink-0">
          <button
            onClick={scrollLeft}
            className="w-8 h-8 border-2 border-[var(--line)] flex items-center justify-center hover:bg-[var(--volt)] hover:text-black hover:border-black transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            className="w-8 h-8 border-2 border-[var(--line)] flex items-center justify-center hover:bg-[var(--volt)] hover:text-black hover:border-black transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
        {children}
      </div>
    </div>
  );
}

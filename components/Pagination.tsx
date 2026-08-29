import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  basePath: string;
}

export function Pagination({ currentPage, hasNext, basePath }: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage + 1;

  // Make sure basePath handles both query strings and paths
  const getUrl = (page: number) => {
    if (basePath.includes('?')) {
      return `${basePath}&page=${page}`;
    }
    return `${basePath}?page=${page}`;
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      {currentPage > 1 ? (
        <Link
          href={getUrl(prevPage)}
          className="flex items-center gap-2 px-4 py-2 border-2 border-[var(--line)] bg-[var(--ink)] text-[#f2ecdc]/80 hover:text-black hover:bg-[var(--volt)] hover:border-black transition-colors font-bold uppercase text-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Link>
      ) : (
        <button disabled className="flex items-center gap-2 px-4 py-2 border-2 border-[var(--line)]/30 bg-transparent text-[#f2ecdc]/20 font-bold uppercase text-sm cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
      )}

      <span className="px-3 py-2 border-2 border-[var(--line)] font-mono-tag text-sm text-[#f2ecdc]/70">
        Page {currentPage}
      </span>

      {hasNext ? (
        <Link
          href={getUrl(nextPage)}
          className="flex items-center gap-2 px-4 py-2 border-2 border-[var(--line)] bg-[var(--ink)] text-[#f2ecdc]/80 hover:text-black hover:bg-[var(--volt)] hover:border-black transition-colors font-bold uppercase text-sm"
        >
          Next <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <button disabled className="flex items-center gap-2 px-4 py-2 border-2 border-[var(--line)]/30 bg-transparent text-[#f2ecdc]/20 font-bold uppercase text-sm cursor-not-allowed">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

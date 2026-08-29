'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Search, Menu, X, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Genres', href: '/genres' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Favorites', href: '/favorites' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b-[3px] border-[var(--line)] bg-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <span className="flex items-center justify-center w-11 h-11 bg-[var(--volt)] border-2 border-black text-black">
                <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15.6L24.4 46.1C31.5 42.4 39.8 40.5 48.6 40.5C58.1 40.5 67 42.7 74.4 46.7L85.6 15.6L76.1 50C87.9 59.4 92.5 73.1 84.4 86.9C74.4 103.8 24.4 104.4 14.4 86.9C6.25 72.5 11.25 58.8 23.1 50L12.5 15.6Z"/>
                  <ellipse cx="68.8" cy="71.9" rx="7.5" ry="13.1" fill="#121214" transform="rotate(20 68.8 71.9)"/>
                  <ellipse cx="30" cy="71.9" rx="7.5" ry="13.1" fill="#121214" transform="rotate(-20 30 71.9)"/>
                </svg>
              </span>
              <span className="font-display text-xl uppercase tracking-tight text-[#f2ecdc]">WibuFinal</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 text-sm">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 font-bold uppercase tracking-wide text-[#f2ecdc]/70 border-2 border-transparent hover:border-[var(--line)] hover:text-[#f2ecdc] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden md:flex relative items-center">
              <input
                type="text"
                placeholder="SEARCH ANIME..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-3 py-2 bg-[var(--ink-soft)] border-2 border-[var(--line)] focus:border-[var(--volt)] focus:outline-none text-sm w-60 font-mono-tag uppercase text-[#f2ecdc] placeholder:text-[#f2ecdc]/30"
              />
              <Search className="w-4 h-4 absolute left-3 text-[#f2ecdc]/40" />
            </form>

            <Link
              href="/schedule"
              className="relative p-2 border-2 border-[var(--line)] text-[#f2ecdc]/80 hover:text-[#f2ecdc] hover:border-[var(--volt)] transition-colors"
              title="New Episodes"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[var(--flame)] border-2 border-[var(--ink)]"></span>
            </Link>

            <button
              className="p-2 md:hidden border-2 border-[var(--line)] text-[#f2ecdc]/80 hover:text-[#f2ecdc] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t-[3px] border-[var(--line)] bg-[var(--ink)] px-4 py-4 space-y-4 pb-6">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder="SEARCH ANIME..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-[var(--ink-soft)] border-2 border-[var(--line)] focus:border-[var(--volt)] focus:outline-none text-sm font-mono-tag uppercase text-[#f2ecdc] placeholder:text-[#f2ecdc]/30"
            />
            <Search className="w-4 h-4 absolute left-3 text-[#f2ecdc]/40" />
          </form>

          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 border-2 border-[var(--line)] font-bold uppercase text-[#f2ecdc]/80 hover:text-[#f2ecdc] hover:border-[var(--volt)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

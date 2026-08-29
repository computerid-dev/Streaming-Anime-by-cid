import { getSchedule } from '@/lib/scraper';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export const revalidate = 3600;

export default async function SchedulePage() {
  const daysList = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];

  const scheduleResults = await Promise.all(daysList.map(async (d) => {
    // Add small delay to avoid hitting Jikan API rate limit (3 req/sec) when doing Promise.all
    await new Promise(r => setTimeout(r, 400 * daysList.indexOf(d)));
    return getSchedule(d);
  }));

  const schedule: Record<string, any[]> = {};
  daysList.forEach((d, i) => {
    schedule[d] = scheduleResults[i];
  });
  const days = daysList.filter(d => schedule[d] && schedule[d].length > 0);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 border-2 border-[var(--line)] bg-[var(--ink-soft)] px-5 py-4">
        <div className="w-11 h-11 flex items-center justify-center bg-[var(--volt)] border-2 border-black shrink-0">
          <Calendar className="w-6 h-6 text-black" />
        </div>
        <div>
           <h1 className="font-display text-xl md:text-2xl uppercase text-[#f2ecdc]">Release Schedule</h1>
           <p className="text-[#f2ecdc]/40 text-sm">Weekly anime release schedule based on Japan time.</p>
        </div>
      </div>

      {days.length > 0 ? (
        <div className="flex flex-col gap-10">
          {days.map((day) => (
            <div key={day}>
              <h2 className="font-display text-lg md:text-xl capitalize sticky top-[81px] bg-[var(--ink)] py-2 z-10 border-b-2 border-[var(--line)] text-[#f2ecdc]">
                {day}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
                {schedule[day].map((anime, i) => (
                  <Link href={`/anime/${anime.slug}`} key={`sch-${day}-${i}`} className="group flex flex-col gap-2 brutal-border-strong brutal-shadow-cobalt brutal-press bg-[var(--ink-soft)]">
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-800 border-b-[3px] border-[var(--line)]">
                      {anime.poster ? (
                        <Image
                          src={anime.poster.startsWith('http') ? anime.poster : `https:${anime.poster}`}
                          alt={anime.title}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : null}
                      <div className="absolute top-2 right-2 bg-[var(--ink)] border-2 border-[var(--line)] text-[#f2ecdc] text-[10px] font-mono-tag px-2 py-0.5">
                        {anime.time}
                      </div>
                    </div>
                    <div className="px-2 pb-2">
                      <h3 className="line-clamp-2 text-sm font-bold text-[#f2ecdc] group-hover:text-[var(--volt)] transition-colors">
                        {anime.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-[var(--line)] bg-[var(--ink-soft)] text-[#f2ecdc]/40">
           Schedule not available.
        </div>
      )}
    </div>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/Navbar';
import { Inter, Archivo_Black, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'WibuFinal',
  description: 'Watch anime full episodes directly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${archivoBlack.variable} ${jetbrainsMono.variable} min-h-screen bg-[var(--ink)] text-[#f2ecdc] font-sans flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children}
          </main>
          <footer className="mt-20 relative w-full border-t-[3px] border-[var(--line)] bg-[var(--paper)] py-14">
            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">

              <Link
                href="/"
                className="inline-block mb-8 px-4 py-2 font-display text-3xl md:text-4xl uppercase text-black bg-[var(--volt)] border-[3px] border-black brutal-press-sm"
              >
                WibuFinal
              </Link>

              <div className="grid grid-cols-2 max-w-[340px] mx-auto gap-y-4 gap-x-10 text-left mb-10 text-[14px] font-bold uppercase tracking-wide text-black">
                <div className="flex flex-col gap-4 items-start ml-auto">
                  <Link href="/terms" className="hover:text-[var(--flame)] transition-colors">Terms of Service</Link>
                  <Link href="/policy" className="hover:text-[var(--flame)] transition-colors">Policy</Link>
                  <Link href="/faq" className="hover:text-[var(--flame)] transition-colors">FAQs</Link>
                  <Link href="/contact" className="hover:text-[var(--flame)] transition-colors">Contact</Link>
                </div>
                <div className="flex flex-col gap-4 items-start">
                  <Link href="/movies" className="hover:text-[var(--flame)] transition-colors">Movies</Link>
                  <Link href="/tv-shows" className="hover:text-[var(--flame)] transition-colors">Tv shows</Link>
                  <Link href="/ongoing" className="hover:text-[var(--flame)] transition-colors">Animes</Link>
                  <Link href="/favorites" className="hover:text-[var(--flame)] transition-colors">Favorites</Link>
                </div>
              </div>

              <div className="w-full h-[3px] bg-black mb-8"></div>

              <div className="text-black/70 space-y-4 text-[15px] leading-relaxed mx-auto max-w-4xl font-medium">
                <p>
                  <span className="font-display text-black">wibufinal.vercel.app</span> is top of free streaming website, where to watch anime online free without registration required.
                  With a big database and great features, we&apos;re confident. wibufinal.vercel.app is the best free anime online website in the space that you can&apos;t simply miss!
                </p>
                <p>
                  This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services.<br/>
                  Powered by NugrohoKheren_CID. All Rights Reserved
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

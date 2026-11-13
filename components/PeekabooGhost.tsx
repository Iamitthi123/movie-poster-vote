'use client';

import React, { useState, useEffect } from 'react';

/**
 * PeekabooGhost Component (TypeScript Version)
 * 
 * Compatible with Next.js App Router and Pages Router.
 * Uses Tailwind CSS for smooth slide animation.
 */
export const PeekabooGhostOverlay: React.FC<{
  minScroll?: number;
  maxScroll?: number;
  imageSrc?: string;
}> = ({
  minScroll = 800,
  maxScroll = 1500,
  imageSrc = '/ghost-transparent.png',
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScrollY >= minScroll && currentScrollY <= maxScroll) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [minScroll, maxScroll]);

  return (
    <div
      className={`fixed bottom-0 right-0 z-50 pointer-events-none select-none transition-transform duration-700 ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-hidden={!isVisible}
    >
      <div className="relative">
        <div
          className={`absolute -inset-4 bg-red-600/20 blur-2xl rounded-full transition-opacity duration-1000 ${
            isVisible ? 'opacity-80' : 'opacity-0'
          }`}
        />
        <img
          src={imageSrc}
          alt="Peekaboo Ghost"
          className="relative w-56 sm:w-72 md:w-88 lg:w-96 max-h-[85vh] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
        />
      </div>
    </div>
  );
};

export default function PeekabooGhostPage() {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const onScroll = () => setScrollY(Math.round(window.scrollY || window.pageYOffset));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-red-700 selection:text-white">
      {/* Scroll indicator HUD */}
      <aside aria-label="Scroll HUD" className="fixed top-4 left-4 z-40 bg-black/80 backdrop-blur-md border border-neutral-800 rounded-xl px-4 py-3 shadow-2xl flex flex-col gap-1 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">Current Scroll Y:</span>
          <span className="font-mono font-bold text-red-400">{scrollY}px</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">Target Range:</span>
          <span className="font-mono text-xs text-neutral-300">800px – 1500px</span>
        </div>
      </aside>

      {/* Floating Ghost */}
      <PeekabooGhostOverlay minScroll={800} maxScroll={1500} imageSrc="/ghost-transparent.png" />

      {/* Mock Long Scrolling Sections */}
      <header className="min-h-[800px] flex flex-col justify-center items-center text-center px-6 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950">
        <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider text-neutral-400 bg-neutral-800/60 border border-neutral-700 mb-6">
          Scroll-Triggered Ghost Effect
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold max-w-3xl leading-tight">
          Scroll Down to Trigger <span className="text-red-500 underline decoration-red-900">Peekaboo Ghost</span>
        </h1>
        <p className="mt-6 text-neutral-400 max-w-xl text-base sm:text-lg">
          Scroll past 800px to see the ghost slide in from the bottom-right corner.
        </p>
      </header>

      <div className="border-t-2 border-dashed border-red-600/70 bg-red-950/20 py-3 px-6 text-center">
        <span className="inline-block px-4 py-1 rounded-md bg-red-900/60 border border-red-600 text-red-200 font-mono text-sm font-bold shadow-lg">
          ▼ 800px Trigger Point — Ghost Starts Peeking Here ▼
        </span>
      </div>

      <section className="min-h-[700px] flex flex-col justify-center items-center px-6 text-center bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">Haunted Zone (800px - 1500px)</span>
          <h2 className="text-3xl sm:text-5xl font-bold">The Ghost is Currently Visible</h2>
          <p className="text-neutral-300">
            Slide effect: <code className="bg-neutral-800 text-red-400 px-2 py-0.5 rounded font-mono text-sm">translate-x-0</code> with smooth 700ms transition.
          </p>
        </div>
      </section>

      <div className="border-t-2 border-dashed border-neutral-700 bg-neutral-900/40 py-3 px-6 text-center">
        <span className="inline-block px-4 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-sm font-bold shadow-lg">
          ▲ 1500px Trigger Point — Ghost Exits Here ▲
        </span>
      </div>

      <section className="min-h-[900px] flex flex-col justify-center items-center px-6 text-center bg-neutral-950">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Safe Zone (&gt; 1500px)</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-300">The Ghost Has Retreated</h2>
          <p className="text-neutral-400">Past 1500px, the ghost slides back to the right out of view.</p>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';

/**
 * PeekabooGhost Component
 * 
 * A React / Next.js component featuring a scroll-triggered ghost animation.
 * - Hidden off-screen right by default (`translate-x-full`)
 * - Slides into viewport when scrollY is between 800px and 1500px (`translate-x-0`)
 * - Slides back out if scrollY < 800px or > 1500px
 * - Cleaned up on unmount to prevent memory leaks
 */
export default function PeekabooGhostDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      setScrollY(Math.round(currentScrollY));

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Trigger condition: visible between 800px and 1500px
          if (currentScrollY >= 800 && currentScrollY <= 1500) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-red-700 selection:text-white">
      {/* Real-time Scroll Indicator HUD for easy testing */}
      <aside aria-label="Scroll Status Monitor" className="fixed top-4 left-4 z-40 bg-black/80 backdrop-blur-md border border-neutral-800 rounded-xl px-4 py-3 shadow-2xl flex flex-col gap-1 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">Current Scroll Y:</span>
          <span className="font-mono font-bold text-red-400">{scrollY}px</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">Ghost Status:</span>
          {isVisible ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-950/80 text-red-300 border border-red-700 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              PEEKING (800px - 1500px)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800">
              <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
              HIDDEN ({scrollY < 800 ? 'Scroll down to 800px' : 'Past 1500px'})
            </span>
          )}
        </div>
      </aside>

      {/* =========================================================================
          PEEKABOO GHOST OVERLAY (Fixed Bottom-Right)
          ========================================================================= */}
      <div
        className={`fixed bottom-0 right-0 z-50 pointer-events-none select-none transition-transform duration-700 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isVisible}
      >
        <div className="relative group">
          {/* Subtle red eerie glow behind ghost */}
          <div
            className={`absolute -inset-4 bg-red-600/20 blur-2xl rounded-full transition-opacity duration-1000 ${
              isVisible ? 'opacity-80' : 'opacity-0'
            }`}
          />

          {/* Ghost Image from /public/ghost-transparent.png with bottom smooth feathering */}
          <img
            src="/ghost-transparent.png"
            alt="Peekaboo Ghost"
            className="relative w-56 sm:w-72 md:w-88 lg:w-96 max-h-[85vh] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] [mask-image:linear-gradient(to_top,transparent_0%,rgba(0,0,0,0.4)_4%,black_16%,black_100%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,rgba(0,0,0,0.4)_4%,black_16%,black_100%)]"
          />

          {/* Bottom ambient shadow/mist to ground the ghost smoothly */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* =========================================================================
          MOCK LONG-SCROLLING PAGE CONTENT (For Testing)
          ========================================================================= */}

      {/* Hero Section (0 - 800px) */}
      <header className="min-h-[800px] flex flex-col justify-center items-center text-center px-6 relative border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-wider text-neutral-400 bg-neutral-800/60 border border-neutral-700 mb-6">
          Scroll-Triggered Ghost Effect
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
          Experience The <span className="text-red-600 underline decoration-red-900">Peekaboo Ghost</span> Animation
        </h1>
        <p className="mt-6 text-neutral-400 max-w-xl text-base sm:text-lg leading-relaxed">
          Scroll down past <span className="text-red-400 font-semibold font-mono">800px</span> to witness the ghost slide into the viewport. Scroll beyond <span className="text-red-400 font-semibold font-mono">1500px</span> or back to top to watch it vanish.
        </p>
        <div className="mt-12 flex flex-col items-center gap-3 animate-bounce text-neutral-500">
          <span className="text-xs uppercase tracking-widest">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </header>

      {/* 800px Threshold Marker */}
      <div className="relative border-t-2 border-dashed border-red-600/70 bg-red-950/20 py-3 px-6 text-center">
        <span className="inline-block px-4 py-1 rounded-md bg-red-900/60 border border-red-600 text-red-200 font-mono text-sm font-bold shadow-lg">
          ▼ 800px Trigger Point — Ghost Starts Peeking Here ▼
        </span>
      </div>

      {/* Active Zone (800px - 1500px) */}
      <section className="min-h-[700px] flex flex-col justify-center items-center px-6 text-center relative bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950">
        <div className="max-w-2xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">Haunted Zone (800px - 1500px)</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-neutral-100">
            Look to the Bottom-Right Corner
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            The ghost has smoothly animated into frame from the right edge with a 700ms ease-in-out transition. Interactions on this page are not blocked because the ghost wrapper has <code className="bg-neutral-800 text-red-400 px-2 py-0.5 rounded font-mono text-sm">pointer-events-none</code>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-6">
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <h3 className="font-semibold text-neutral-200">Smooth CSS Transition</h3>
              <p className="text-xs text-neutral-400 mt-1">Uses Tailwind classes `transition-transform duration-700 ease-in-out`.</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <h3 className="font-semibold text-neutral-200">Safe Cleanup</h3>
              <p className="text-xs text-neutral-400 mt-1">Scroll event listeners are cleaned up properly in `useEffect` returns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 1500px Threshold Marker */}
      <div className="relative border-t-2 border-dashed border-neutral-700 bg-neutral-900/40 py-3 px-6 text-center">
        <span className="inline-block px-4 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-sm font-bold shadow-lg">
          ▲ 1500px Trigger Point — Ghost Exits Here ▲
        </span>
      </div>

      {/* Below 1500px Zone */}
      <section className="min-h-[900px] flex flex-col justify-center items-center px-6 text-center bg-neutral-950">
        <div className="max-w-2xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Post-Haunt Zone (&gt; 1500px)</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-200">
            The Ghost Vanishes Back Into the Dark
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Because scroll position has exceeded 1500px, the ghost has returned to <code className="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded font-mono text-sm">translate-x-full</code> off-screen.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 1100, behavior: 'smooth' })}
            className="mt-4 px-6 py-3 rounded-xl bg-red-700 hover:bg-red-600 active:scale-95 transition font-semibold text-white shadow-lg shadow-red-950 pointer-events-auto"
          >
            Jump Back to Haunted Zone (1100px)
          </button>
        </div>
      </header>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-10 text-center text-xs text-neutral-500">
        <p>Peekaboo Ghost Component • Built with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}

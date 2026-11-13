'use client';

import React, { useState, useEffect } from 'react';

/**
 * PeekabooGhost Component
 * 
 * Scroll-triggered ghost animation using Tailwind CSS:
 * - Hidden off-screen right by default (`translate-x-full`)
 * - Slides in smoothly when scrolled past top hero (`scrollY >= 500px`)
 * - Tucks away smoothly when approaching the bottom of the page (`distFromBottom < 650px`)
 * - Edge-decontaminated transparent ghost with smooth bottom dissolve
 */
export default function PeekabooGhostDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [distFromBottom, setDistFromBottom] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const currentDistFromBottom = docHeight - (currentScrollY + winHeight);

      setScrollY(Math.round(currentScrollY));
      setDistFromBottom(Math.round(currentDistFromBottom));

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show when scrolled past Hero (500px) and NOT near bottom of the website (< 650px)
          const isNearBottom = currentDistFromBottom < 650;
          if (currentScrollY >= 500 && !isNearBottom) {
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
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-red-700 selection:text-white">
      {/* Real-time Scroll HUD */}
      <aside aria-label="Scroll Status Monitor" className="fixed top-4 left-4 z-40 bg-black/85 backdrop-blur-md border border-neutral-800 rounded-xl px-4 py-3 shadow-2xl flex flex-col gap-1 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">Scroll Y:</span>
          <span className="font-mono font-bold text-red-400">{scrollY}px</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">Dist to Bottom:</span>
          <span className="font-mono font-bold text-neutral-300">{distFromBottom}px</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400">Ghost:</span>
          {isVisible ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-950/80 text-red-300 border border-red-700 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              PEEKING
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800">
              <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
              HIDDEN ({scrollY < 500 ? 'At Top' : 'Near Bottom'})
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
        <div className="relative">
          {/* Subtle eerie ambient glow */}
          <div
            className={`absolute top-[10%] left-[5%] right-[5%] bottom-[20%] bg-red-600/20 blur-3xl rounded-full transition-opacity duration-1000 ${
              isVisible ? 'opacity-70' : 'opacity-0'
            }`}
          />

          {/* Ghost Image with de-fringed edges and bottom feathering */}
          <img
            src="/ghost-transparent.png"
            alt="Peekaboo Ghost"
            className="relative w-56 sm:w-72 md:w-80 lg:w-92 max-h-[82vh] object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)] [mask-image:linear-gradient(to_top,transparent_0%,rgba(0,0,0,0.5)_4%,black_16%,black_100%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,rgba(0,0,0,0.5)_4%,black_16%,black_100%)]"
          />
        </div>
      </div>

      {/* Mock Long Page */}
      <header className="min-h-[700px] flex flex-col justify-center items-center text-center px-6 relative border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
          Peekaboo Ghost <span className="text-red-600">Animation</span>
        </h1>
        <p className="mt-4 text-neutral-400 max-w-xl text-base sm:text-lg">
          เลื่อนลงมาเกิน 500px ผีจะโผล่ และเมื่อเลื่อนลงไปใกล้ท้ายเว็บ ผีจะหุบกลับออกไปโดยอัตโนมัติ
        </p>
      </header>

      {/* Content Section (Ghost Visible Here) */}
      <section className="min-h-[1400px] flex flex-col justify-center items-center px-6 text-center bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950">
        <h2 className="text-3xl sm:text-4xl font-bold">โซนเนื้อหาเว็บ (ผีโผล่ที่ขวาล่าง)</h2>
        <p className="text-neutral-400 mt-4 max-w-md">
          สังเกตว่าขอบของตัวผีไม่มีคราบขาว/ขอบหยักแล้ว และไม่มีกล่องมืดมาบดบังหน้าเว็บ
        </p>
      </section>

      {/* Bottom Section (Ghost Tucks Away Here) */}
      <footer className="min-h-[700px] flex flex-col justify-center items-center px-6 text-center border-t border-neutral-800 bg-black">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-300">ด้านล่างสุดของเว็บ (ผีหุบกลับไปแล้ว)</h2>
        <p className="text-neutral-500 mt-2">เมื่อเข้าใกล้ท้ายเว็บ ผีจะสไลด์เก็บตัวกลับออกไปทันที</p>
      </footer>
    </div>
  );
}

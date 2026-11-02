import React from 'react';
import { Download, Play, ShieldCheck, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onDownloadClick: () => void;
  onSimulateClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDownloadClick, onSimulateClick }) => {
  return (
    <section id="overview" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 mb-4">
              <span>Android Mobile App &amp; Arcade Suite</span>
              <span aria-hidden="true">·</span>
              <span>Release v2.4.1</span>
              <span aria-hidden="true">·</span>
              <span>100% Privacy-First</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-6 text-balance">
              Master your daily focus. Recharge with instant flow.
            </h1>

            {/* App Short Description */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mb-8">
              <strong className="text-neutral-900 dark:text-white font-semibold">AuraPulse</strong> is a lightweight, distraction-free Android productivity companion that tracks daily focus habits without cloud surveillance. It includes <strong className="text-neutral-900 dark:text-white font-semibold">Pulse Orbit</strong>, an integrated neon rhythm arcade game engineered for mindful 2-minute cognitive breaks.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onDownloadClick}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 dark:bg-cyan-400 dark:hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-98 whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Download APK (v2.4.1)</span>
              </button>

              <button
                onClick={onSimulateClick}
                className="flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-neutral-700 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl transition-all whitespace-nowrap"
              >
                <Play className="w-4 h-4 text-cyan-500" />
                <span>Try Live Simulator</span>
              </button>
            </div>

            {/* Key Value Points (Clean unboxed list) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 w-full text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct APK installation</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Zero tracker SDKs</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Android 8.0 to 14+</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Focal Carrier with Realistic Device Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-[340px] sm:max-w-[380px] w-full">
              {/* Outer frame styling */}
              <div className="relative rounded-[40px] p-2 bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 shadow-2xl shadow-cyan-500/10 border border-neutral-300 dark:border-neutral-700">
                <div className="relative rounded-[34px] overflow-hidden bg-neutral-950 aspect-[9/16] border border-neutral-800">
                  <img
                    src="/src/assets/images/aurapulse_app_mockup_1793616248311.jpg"
                    alt="AuraPulse Mobile App Interface showing Daily Focus, Habit Streaks, and Flow Meters"
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                  {/* Subtle top phone notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full pointer-events-none" />
                </div>
              </div>

              {/* Floating companion game teaser badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-800 shrink-0 border border-neutral-700">
                  <img
                    src="/src/assets/images/pulse_orbit_game_screen_1793616248962.jpg"
                    alt="Pulse Orbit Mini Arcade Game preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Pulse Orbit Arcade</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Included inside APK bundle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

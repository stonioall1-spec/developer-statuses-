import React from 'react';
import { Clock, Shield, Gamepad2, BatteryCharging, Lock, Zap } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
            Engineering Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Engineered for calm, deep attention
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            AuraPulse avoids the dopamine traps of typical productivity apps: no social feeds, no unsolicited cloud pings, and no battery-draining background trackers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Deep Work Flow (Span 7) */}
          <div className="md:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-3">
                <Clock className="w-4 h-4" />
                <span>01. FLOW ENGINE</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                Distraction-Free Focus Timing
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                Customizable Pomodoro and Flow intervals calibrated to natural ultradian rhythms. Built-in binaural auditory pulses gently signal interval transitions without loud disruptive alarms.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="block text-neutral-400 text-[11px]">Intervals</span>
                <span className="font-semibold text-neutral-900 dark:text-white">25m / 50m / Custom</span>
              </div>
              <div>
                <span className="block text-neutral-400 text-[11px]">Audio</span>
                <span className="font-semibold text-neutral-900 dark:text-white">Pure Sine &amp; Pink Noise</span>
              </div>
              <div>
                <span className="block text-neutral-400 text-[11px]">Battery Impact</span>
                <span className="font-semibold text-emerald-500">&lt; 0.8% per hour</span>
              </div>
            </div>
          </div>

          {/* Card 2: Companion Arcade Game (Span 5) */}
          <div className="md:col-span-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all overflow-hidden relative">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-500 mb-3">
                <Gamepad2 className="w-4 h-4" />
                <span>02. BRAIN RESET ARCADE</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                Pulse Orbit Mini Game
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                When cognitive fatigue strikes, endless social media feeds drain more energy. Pulse Orbit provides a fast, tactile 2-minute rhythm session to reset working memory.
              </p>
            </div>

            <div className="mt-4 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 max-h-36">
              <img
                src="/src/assets/images/pulse_orbit_game_screen_1793616248962.jpg"
                alt="Pulse Orbit Game interface preview"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Card 3: 100% Local Encrypted Storage (Span 5) */}
          <div className="md:col-span-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 mb-3">
                <Lock className="w-4 h-4" />
                <span>03. HARDENED PRIVACY</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                Local-First SQLite Architecture
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Your daily habits, timestamps, and notes never touch an external server. The app functions completely offline in airplane mode with full cryptographic backup exports.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/60 dark:border-neutral-800 text-xs">
              <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-neutral-600 dark:text-neutral-300">
                AES-256 local database encryption on device
              </span>
            </div>
          </div>

          {/* Card 4: Developer Craftsmanship & Performance (Span 7) */}
          <div className="md:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-500 mb-3">
                <Zap className="w-4 h-4" />
                <span>04. NATIVE EFFICIENCY</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                Zero Bloat Native Android Build
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                Written with strict performance budgets: starts in under 120ms, compiles to a lightweight 24.8MB APK package, and requests only the minimum necessary OS permissions.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="block text-neutral-400 text-[11px]">Cold Startup</span>
                <span className="font-semibold text-neutral-900 dark:text-white">~115 ms</span>
              </div>
              <div>
                <span className="block text-neutral-400 text-[11px]">RAM Footprint</span>
                <span className="font-semibold text-neutral-900 dark:text-white">&lt; 38 MB</span>
              </div>
              <div>
                <span className="block text-neutral-400 text-[11px]">Tracking SDKs</span>
                <span className="font-semibold text-cyan-500">0 (Strictly Zero)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

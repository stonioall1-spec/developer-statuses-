import React from 'react';
import { Download, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme, onOpenDownload }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 group-hover:scale-125 transition-transform"></span>
          <span>AuraPulse</span>
        </a>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <a
            href="#overview"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Overview
          </a>
          <a
            href="#features"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Features
          </a>
          <a
            href="#downloads"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0 font-medium text-cyan-600 dark:text-cyan-400"
          >
            APK Download
          </a>
          <a
            href="#simulator"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Web Simulator
          </a>
          <a
            href="#privacy"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Privacy Policy
          </a>
          <a
            href="#contact"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            Developer Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action & theme switch */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle visual theme"
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenDownload}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 dark:bg-cyan-400 dark:hover:bg-cyan-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK</span>
          </button>
        </div>
      </div>
    </header>
  );
};

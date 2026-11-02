import React from 'react';
import { ArrowUp, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-100 dark:border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
              <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                AuraPulse Mobile &amp; Pulse Orbit
              </span>
            </div>
            <p className="text-xs text-neutral-500 max-w-md">
              Official mobile development portal by Stonio Mobile Development. Independent Android software engineered with zero telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600 dark:text-neutral-400">
            <a href="#overview" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Overview
            </a>
            <a href="#features" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#downloads" className="hover:text-neutral-900 dark:hover:text-white transition-colors font-medium text-cyan-600 dark:text-cyan-400">
              Download APK
            </a>
            <a href="#simulator" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Simulator
            </a>
            <a href="#privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>&copy; {new Date().getFullYear()} Stonio Mobile Development. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:stonio.all1@gmail.com"
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>stonio.all1@gmail.com</span>
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

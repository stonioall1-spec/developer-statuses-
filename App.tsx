import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ApkDownloadSection } from './components/ApkDownloadSection';
import { AppSimulator } from './components/AppSimulator';
import { Features } from './components/Features';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { APK_PACKAGES, downloadApk } from './utils/apkDownloader';
import { Download, Sparkles, X } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [showMobileBanner, setShowMobileBanner] = useState<boolean>(true);
  const [isQuickDownloading, setIsQuickDownloading] = useState<boolean>(false);

  useEffect(() => {
    // Initial theme setup
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleDownloadMainApk = async () => {
    try {
      setIsQuickDownloading(true);
      const mainPkg = APK_PACKAGES[0]; // AuraPulse Mobile
      await downloadApk(mainPkg);
      setTimeout(() => setIsQuickDownloading(false), 1200);
    } catch (e) {
      console.error(e);
      setIsQuickDownloading(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors selection:bg-cyan-500/20 selection:text-cyan-600 dark:selection:text-cyan-300">
      {/* Navigation Header */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenDownload={() => scrollToSection('downloads')}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onDownloadClick={() => scrollToSection('downloads')}
          onSimulateClick={() => scrollToSection('simulator')}
        />

        <Features />

        <ApkDownloadSection />

        <AppSimulator />

        <PrivacyPolicy />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky APK Download Bar (Capped <= 15% height, dismissible) */}
      {showMobileBanner && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-neutral-900/95 dark:bg-neutral-900/95 text-white backdrop-blur-md border-t border-neutral-800 flex items-center justify-between gap-3 shadow-2xl">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 text-neutral-950 flex items-center justify-center font-bold text-xs shrink-0">
              APK
            </div>
            <div className="truncate">
              <span className="block text-xs font-bold truncate">AuraPulse v2.4.1</span>
              <span className="block text-[10px] text-neutral-400">24.8 MB · Direct Sideload</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDownloadMainApk}
              disabled={isQuickDownloading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs rounded-lg transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isQuickDownloading ? 'Saving...' : 'Get APK'}</span>
            </button>
            <button
              onClick={() => setShowMobileBanner(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

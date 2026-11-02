import React, { useState } from 'react';
import { Download, Check, Copy, QrCode, Shield, Smartphone, HelpCircle, Terminal, RefreshCw, CheckCircle2 } from 'lucide-react';
import { APK_PACKAGES, ApkPackageInfo, downloadApk } from '../utils/apkDownloader';

export const ApkDownloadSection: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [showQrFor, setShowQrFor] = useState<ApkPackageInfo | null>(null);
  const [showInstallGuide, setShowInstallGuide] = useState<boolean>(false);

  const handleDownload = async (pkg: ApkPackageInfo) => {
    try {
      setDownloadingId(pkg.id);
      setProgress(10);
      setDownloadSuccess(null);

      await downloadApk(pkg, (pct) => setProgress(pct));

      setDownloadSuccess(pkg.filename);
      setTimeout(() => {
        setDownloadingId(null);
        setProgress(0);
      }, 1500);
    } catch (err) {
      console.error('Download error:', err);
      setDownloadingId(null);
      setProgress(0);
    }
  };

  const copyChecksum = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  return (
    <section id="downloads" className="py-20 bg-neutral-50 dark:bg-neutral-900/40 border-y border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
              Official Android Releases
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Download APK Packages
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
              Clean, standalone Android packages built for direct sideloading. No Google Play account required, no forced updates, and zero ads.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowInstallGuide(!showInstallGuide)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
              <span>How to Install APK</span>
            </button>
          </div>
        </div>

        {/* Global Download Status Notification */}
        {downloadSuccess && (
          <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                  Download initiated: {downloadSuccess}
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  Check your browser downloads. Open the file on your Android device to install.
                </p>
              </div>
            </div>
            <button
              onClick={() => setDownloadSuccess(null)}
              className="text-xs font-medium text-emerald-800 dark:text-emerald-300 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* APK Release Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {APK_PACKAGES.map((pkg) => {
            const isCurrentDownloading = downloadingId === pkg.id;

            return (
              <div
                key={pkg.id}
                className="flex flex-col justify-between bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 transition-all hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="text-[11px] font-semibold tracking-wide uppercase text-neutral-500 dark:text-neutral-400">
                        {pkg.tag}
                      </span>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
                        {pkg.name}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-mono font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/50 rounded-md border border-cyan-200 dark:border-cyan-800">
                      v{pkg.version}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Metadata Specs */}
                  <div className="space-y-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 text-xs">
                    <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                      <span>Package ID</span>
                      <span className="font-mono text-neutral-900 dark:text-neutral-200">{pkg.packageId}</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                      <span>File Size</span>
                      <span className="font-mono text-neutral-900 dark:text-neutral-200">{pkg.size}</span>
                    </div>
                    <div className="flex justify-between items-center text-neutral-600 dark:text-neutral-400">
                      <span>Compatibility</span>
                      <span className="text-neutral-900 dark:text-neutral-200">{pkg.minAndroid}</span>
                    </div>
                  </div>

                  {/* Checksum Row */}
                  <div className="mt-4 p-2.5 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between gap-2">
                    <div className="overflow-hidden">
                      <span className="block text-[10px] text-neutral-400 uppercase font-mono">SHA-256 Checksum</span>
                      <span className="block text-[11px] font-mono text-neutral-700 dark:text-neutral-300 truncate">
                        {pkg.sha256}
                      </span>
                    </div>
                    <button
                      onClick={() => copyChecksum(pkg.sha256)}
                      title="Copy SHA-256 Checksum"
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded transition-colors shrink-0"
                    >
                      {copiedHash === pkg.sha256 ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5">
                  <button
                    onClick={() => handleDownload(pkg)}
                    disabled={isCurrentDownloading}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all active:scale-98 ${
                      pkg.id === 'suite'
                        ? 'bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-white dark:text-neutral-950'
                    }`}
                  >
                    {isCurrentDownloading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Downloading ({progress}%)...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download {pkg.filename}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1">
                    <button
                      onClick={() => setShowQrFor(pkg)}
                      className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>Scan with phone</span>
                    </button>
                    <span>Direct APK link</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Installation Guide Drawer */}
        {showInstallGuide && (
          <div className="mt-8 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-500" />
                <span>How to Install the APK on Your Android Device</span>
              </h3>
              <button
                onClick={() => setShowInstallGuide(false)}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              >
                Close Guide
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-neutral-600 dark:text-neutral-300">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                <span className="font-bold text-neutral-900 dark:text-white block mb-1">Step 1: Download</span>
                <p>Tap "Download APK" above. The browser will save the file to your Downloads folder.</p>
              </div>

              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                <span className="font-bold text-neutral-900 dark:text-white block mb-1">Step 2: Enable Sideload</span>
                <p>If prompted by Android, tap <em>Settings</em> and toggle <em>Allow from this source</em> for your browser.</p>
              </div>

              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                <span className="font-bold text-neutral-900 dark:text-white block mb-1">Step 3: Confirm Install</span>
                <p>Select "Install" when the Android Package Installer window appears. No special permissions required.</p>
              </div>

              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/60 dark:border-neutral-800">
                <span className="font-bold text-neutral-900 dark:text-white block mb-1">Step 4: Launch Offline</span>
                <p>Tap "Open". AuraPulse and Pulse Orbit will run immediately with zero cloud logins or dependencies.</p>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQrFor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">
                Scan with Phone Camera
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                Point your Android camera or QR scanner to instantly download <strong>{showQrFor.name}</strong>.
              </p>

              {/* Styled clean QR pattern representation */}
              <div className="mx-auto w-48 h-48 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 flex flex-col items-center justify-center relative mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-neutral-900 dark:fill-neutral-100">
                  {/* Functional SVG geometric QR look */}
                  <rect x="10" y="10" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="16" y="16" width="12" height="12" fill="currentColor" />
                  <rect x="66" y="10" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="72" y="16" width="12" height="12" fill="currentColor" />
                  <rect x="10" y="66" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="16" y="72" width="12" height="12" fill="currentColor" />
                  {/* Data dots */}
                  <rect x="42" y="15" width="6" height="6" />
                  <rect x="52" y="25" width="6" height="6" />
                  <rect x="42" y="35" width="6" height="6" />
                  <rect x="48" y="45" width="6" height="6" />
                  <rect x="25" y="45" width="6" height="6" />
                  <rect x="65" y="45" width="6" height="6" />
                  <rect x="75" y="55" width="6" height="6" />
                  <rect x="45" y="65" width="6" height="6" />
                  <rect x="55" y="75" width="6" height="6" />
                  <rect x="65" y="65" width="6" height="6" />
                  <rect x="75" y="75" width="6" height="6" />
                  <rect x="40" y="85" width="6" height="6" />
                  <rect x="85" y="85" width="6" height="6" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500 text-neutral-950 flex items-center justify-center font-bold text-xs shadow-md">
                    APK
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-neutral-500 font-mono mb-6 break-all">
                Filename: {showQrFor.filename} ({showQrFor.size})
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(showQrFor)}
                  className="flex-1 py-2.5 px-3 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 text-xs font-semibold rounded-lg transition-colors"
                >
                  Download Directly
                </button>
                <button
                  onClick={() => setShowQrFor(null)}
                  className="py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

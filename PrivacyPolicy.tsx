import React, { useState } from 'react';
import { ShieldCheck, Search, Copy, Check, FileText, Lock, EyeOff, HelpCircle } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedPolicy, setCopiedPolicy] = useState(false);
  const [viewMode, setViewMode] = useState<'plain' | 'legal'>('plain');

  const policySections = [
    {
      id: 'collection',
      title: '1. Information Collection & Storage',
      plain:
        'AuraPulse and Pulse Orbit are designed on a zero-knowledge, local-first architecture. All your focus timers, habit completion logs, streaks, and game scores are stored exclusively in an encrypted SQLite database on your physical device. We do not transmit or store your personal routines on our or any third-party servers.',
      legal:
        'AuraPulse ("the Application") operates on a decentralized, on-device data persistence paradigm. The Application does not collect, record, process, or transmit personally identifiable information (PII) including, but not limited to, legal names, physical addresses, IP addresses, device serial numbers, or biometric telemetry. All user-generated artifacts (habit definitions, interval timers, streak records, notes, and session logs) are serialized and persisted strictly within application-sandboxed local physical memory using standard AES-256 database encryption provided by the Android OS framework.'
    },
    {
      id: 'permissions',
      title: '2. Device Permissions Requested',
      plain:
        'We only request 3 standard Android permissions: (1) Notifications to alert you when your focus timer finishes; (2) Vibration for tactile haptic feedback in the companion rhythm game; (3) Storage access only when you explicitly tap "Export JSON Backup". We never access your camera, microphone, contacts, location, or photos.',
      legal:
        'In strict compliance with Google Play Developer Policy and Android 14 Runtime Permission standards, the Application requests only the minimal necessary system privileges: (a) android.permission.POST_NOTIFICATIONS: Utilized solely for scheduling localized alarm alerts upon completion of user-initiated focus intervals; (b) android.permission.VIBRATE: Utilized for real-time haptic actuator feedback during orbital rhythm interactions; (c) android.permission.READ_EXTERNAL_STORAGE / MANAGE_DOCUMENTS: Invoked strictly via user-directed Storage Access Framework (SAF) intent whenever the user requests a local JSON or CSV data backup export. The Application does not declare nor utilize location, telephonic, audio recording, camera, or contact directory permissions.'
    },
    {
      id: 'third-party',
      title: '3. Third-Party SDKs & Telemetry',
      plain:
        'We have completely eliminated advertising networks, marketing trackers, and analytics SDKs from both AuraPulse and the Pulse Orbit game. There are no Google Analytics, Firebase Analytics, Meta Pixel, or third-party ad banners inside the APK.',
      legal:
        'The compiled APK binaries (com.stonio.aurapulse and com.stonio.pulseorbit) are free of third-party advertising SDKs, behavioral telemetry frameworks, cross-app tracking libraries, or affiliate tracking cookies. The Application does not sell, rent, monetize, or disclose user data to data brokers, advertising consortiums, or commercial aggregators.'
    },
    {
      id: 'retention',
      title: '4. Data Retention, Portability & Deletion Rights',
      plain:
        'You own 100% of your data. You can export a full JSON backup of your records at any time. If you uninstall the app or clear app data in Android Settings, all records are permanently deleted from your device instantly.',
      legal:
        'In accordance with Article 17 of the GDPR ("Right to Erasure") and the California Consumer Privacy Act (CCPA), users maintain absolute sovereignty over their data. Because data is stored in the application\'s isolated private sandbox, users can trigger complete permanent erasure at any time via Android OS Settings > Apps > AuraPulse > Clear Storage / Data, or by uninstalling the APK package. No remnants, identifiers, or backups persist on developer infrastructure.'
    },
    {
      id: 'children',
      title: '5. Children\'s Privacy (COPPA / GDPR-K)',
      plain:
        'Our app does not collect personal data from anyone, including children under 13 (or under 16 in the EU). It is safe and family-friendly for all ages.',
      legal:
        'The Application is compliant with the Children\'s Online Privacy Protection Act (COPPA) and General Data Protection Regulation provisions regarding minors (GDPR-K). Because the Application does not solicit, gather, or transmit any personally identifiable information, it poses zero tracking hazard to minors.'
    },
    {
      id: 'contact-officer',
      title: '6. Data Protection Officer & Developer Contact',
      plain:
        'If you have any questions, suggestions, or concerns regarding your privacy or data safety, you can email developer Stonio directly at stonio.all1@gmail.com.',
      legal:
        'For inquiries, compliance verifications, or regulatory notices concerning this Privacy Policy, please contact the lead developer and designated Data Protection Controller directly via email at stonio.all1@gmail.com.'
    }
  ];

  const filteredSections = policySections.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.plain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.legal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyFullMarkdown = () => {
    const md = `# Privacy Policy for AuraPulse & Pulse Orbit
Effective Date: November 2, 2026
Developer Contact: stonio.all1@gmail.com

${policySections.map((s) => `## ${s.title}\n\n${s.legal}\n`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopiedPolicy(true);
    setTimeout(() => setCopiedPolicy(false), 2500);
  };

  return (
    <section id="privacy" className="py-20 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Google Play &amp; App Store Compliant</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Privacy Policy
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Last updated: November 2, 2026 · Official developer disclosure for <span className="text-neutral-900 dark:text-white font-medium">AuraPulse Mobile</span> and <span className="text-neutral-900 dark:text-white font-medium">Pulse Orbit Arcade</span>.
          </p>
        </div>

        {/* Policy Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 mb-8">
          {/* Mode Switcher */}
          <div className="inline-flex items-center gap-1 p-1 bg-white dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs w-full sm:w-auto">
            <button
              onClick={() => setViewMode('plain')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'plain'
                  ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Plain English Summary</span>
            </button>
            <button
              onClick={() => setViewMode('legal')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'legal'
                  ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Legal Compliance</span>
            </button>
          </div>

          {/* Search Input & Copy Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search policy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={copyFullMarkdown}
              title="Copy policy to clipboard for Play Console"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors whitespace-nowrap shrink-0"
            >
              {copiedPolicy ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPolicy ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-6">
          {filteredSections.map((section) => (
            <div
              key={section.id}
              className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-3">
                {section.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {viewMode === 'plain' ? section.plain : section.legal}
              </p>
            </div>
          ))}

          {filteredSections.length === 0 && (
            <div className="text-center py-12 text-sm text-neutral-500">
              No matching privacy policy clauses found for "{searchTerm}".
            </div>
          )}
        </div>

        {/* Direct DPO Contact Box */}
        <div className="mt-8 p-5 bg-neutral-50 dark:bg-neutral-900/60 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-neutral-900 dark:text-white block">
              Have a privacy or data security question?
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Direct email to the developer and DPO: <a href="mailto:stonio.all1@gmail.com" className="text-cyan-600 dark:text-cyan-400 font-medium underline">stonio.all1@gmail.com</a>
            </span>
          </div>

          <a
            href="mailto:stonio.all1@gmail.com?subject=Privacy%20Inquiry%20-%20AuraPulse%20Mobile"
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap text-center"
          >
            Email Privacy Lead
          </a>
        </div>
      </div>
    </section>
  );
};

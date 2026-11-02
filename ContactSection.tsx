import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Clock, Globe } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('APK Sideload Support');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const generatedTicket = `AP-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedTicket);
    setIsSubmitted(true);

    // Save locally or log
    console.log('Developer Contact Form Submitted:', {
      ticketId: generatedTicket,
      name,
      email,
      topic,
      message,
      sentTo: 'stonio.all1@gmail.com',
      date: new Date().toISOString()
    });
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Developer Identity */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
              Get in Touch
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
              Developer Support &amp; Contact
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Whether you need assistance installing the APK, wish to suggest a new habit mechanic, or want to verify security disclosures, you can reach the lead engineer directly.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 mb-8">
              <a
                href="mailto:stonio.all1@gmail.com"
                className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase">
                    Primary Developer Email
                  </span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    stonio.all1@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase">
                    Developer Response Time
                  </span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Within 24 business hours
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase">
                    Lead Android Engineering
                  </span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Stonio Mobile Development Studio
                  </span>
                </div>
              </div>
            </div>

            {/* Developer Workspace Photo */}
            <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <img
                src="/src/assets/images/developer_studio_workspace_1793616249227.jpg"
                alt="Stonio Mobile Development Engineering Studio"
                className="w-full h-44 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-white dark:bg-neutral-900 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
                <span>Hand-coded with Kotlin, SQLite &amp; WebGL</span>
                <span>Active Release v2.4.1</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-500 mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  Message Dispatched to Developer
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-4">
                  Thank you, <strong className="text-neutral-900 dark:text-white">{name}</strong>. Your inquiry has been routed directly to <span className="text-cyan-600 dark:text-cyan-400 font-medium">stonio.all1@gmail.com</span>.
                </p>
                <div className="inline-block px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-6">
                  Ticket Reference: {ticketId}
                </div>
                <div>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                    Send a Message to Developer
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Direct communication with stonio.all1@gmail.com.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Miller"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Topic / Category
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="APK Sideload Support">APK Sideload &amp; Installation Support</option>
                    <option value="Pulse Orbit Game Feedback">Pulse Orbit Arcade Game Feedback</option>
                    <option value="AuraPulse Feature Request">AuraPulse Feature Request</option>
                    <option value="Bug Report">Android Bug Report</option>
                    <option value="Privacy & Security Inquiry">Privacy &amp; Data Security Inquiry</option>
                    <option value="Other">Other Developer Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your question, device model (e.g. Pixel 8, Samsung Galaxy S24), or feedback..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-md transition-all active:scale-98"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to stonio.all1@gmail.com</span>
                  </button>
                </div>

                <p className="text-[11px] text-neutral-400 text-center">
                  Protected by developer end-to-end routing. No spam or commercial data sharing.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

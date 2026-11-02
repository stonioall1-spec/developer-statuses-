import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check, Flame, Sparkles, Volume2, VolumeX, Smartphone, Gamepad2 } from 'lucide-react';

export const AppSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'app' | 'game'>('app');

  // --- APP STATE ---
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [habits, setHabits] = useState([
    { id: 1, title: 'Write Core System Architecture', time: '8:00 AM', done: true, streak: 14 },
    { id: 2, title: 'Mindful Breathing Routine', time: '11:30 AM', done: true, streak: 28 },
    { id: 3, title: 'Focus Sprint Block 2', time: '2:00 PM', done: false, streak: 8 },
    { id: 4, title: 'Evening Knowledge Review', time: '6:30 PM', done: false, streak: 12 },
  ]);

  // Audio synthesizer helper for clean sound without external mp3s
  const playBeep = (freq: number = 440, duration: number = 0.08) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // AudioContext unavailable
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            playBeep(880, 0.3);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => {
    playBeep(520, 0.05);
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    playBeep(330, 0.05);
    setIsTimerRunning(false);
    setTimerSeconds(25 * 60);
  };

  const toggleHabit = (id: number) => {
    playBeep(660, 0.06);
    setHabits(
      habits.map((h) =>
        h.id === id
          ? { ...h, done: !h.done, streak: !h.done ? h.streak + 1 : Math.max(1, h.streak - 1) }
          : h
      )
    );
  };

  const completedCount = habits.filter((h) => h.done).length;
  const completionRate = Math.round((completedCount / habits.length) * 100);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- GAME STATE ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameScore, setGameScore] = useState<number>(0);
  const [gameCombo, setGameCombo] = useState<number>(0);
  const [hitFeedback, setHitFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab !== 'game') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let radius = 40;
    const targetRadius = 90;
    let speed = 1.2;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw Orbit Center Core
      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#06b6d4';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Target Hit Ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, targetRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw Outer Guide Ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, targetRadius + 40, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Expanding Pulse Ring
      radius += speed;
      if (radius > targetRadius + 45) {
        radius = 20;
        setGameCombo(0);
      }

      const closeness = Math.abs(radius - targetRadius);
      const isPerfect = closeness < 8;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = isPerfect ? '#10b981' : closeness < 18 ? '#06b6d4' : '#a855f7';
      ctx.lineWidth = isPerfect ? 4 : 2;
      ctx.shadowBlur = isPerfect ? 20 : 6;
      ctx.shadowColor = isPerfect ? '#10b981' : '#06b6d4';
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeTab]);

  const handleGameTap = () => {
    playBeep(750, 0.08);
    const points = 120 + gameCombo * 15;
    setGameScore((prev) => prev + points);
    setGameCombo((prev) => prev + 1);
    setHitFeedback('PERFECT! + ' + points);
    setTimeout(() => setHitFeedback(null), 800);
  };

  return (
    <section id="simulator" className="py-20 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
            Try Before Sideloading
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Interactive In-Browser Simulator
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Experience both the AuraPulse productivity companion and the companion arcade game right here in your browser.
          </p>

          {/* Segmented Mode Selector */}
          <div className="inline-flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl mt-6 border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab('app')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'app'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>AuraPulse Mobile</span>
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'game'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-500" />
              <span>Pulse Orbit Game</span>
            </button>
          </div>
        </div>

        {/* Simulator Device Frame */}
        <div className="max-w-md mx-auto">
          <div className="relative rounded-[36px] p-4 bg-neutral-100 dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-800 shadow-2xl">
            {/* Audio toggle in simulator */}
            <div className="flex items-center justify-between mb-3 px-2 text-xs text-neutral-500">
              <span className="font-mono text-[11px]">Android 14 Host Simulation</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 transition-colors"
                title="Toggle Web Audio"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-500" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{soundEnabled ? 'Audio ON' : 'Audio OFF'}</span>
              </button>
            </div>

            {/* Screen Inner */}
            <div className="rounded-[28px] overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-5 min-h-[520px] flex flex-col justify-between">
              {activeTab === 'app' ? (
                <>
                  {/* APP SCREEN */}
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-base font-bold text-neutral-900 dark:text-white">Today's Flow</h4>
                        <span className="text-[11px] text-neutral-400">Encrypted Local SQLite</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                        <span>{completionRate}%</span>
                      </div>
                    </div>

                    {/* Pomodoro Focus Timer Display */}
                    <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200/70 dark:border-neutral-800 text-center mb-5">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                        Deep Work Focus Block
                      </span>
                      <div className="text-4xl font-mono font-bold tracking-tight text-neutral-900 dark:text-white tabular-nums mb-3">
                        {formatTimer(timerSeconds)}
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={toggleTimer}
                          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isTimerRunning
                              ? 'bg-amber-400 text-neutral-950'
                              : 'bg-cyan-400 hover:bg-cyan-300 text-neutral-950'
                          }`}
                        >
                          {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          <span>{isTimerRunning ? 'Pause' : 'Start Focus'}</span>
                        </button>
                        <button
                          onClick={resetTimer}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                          title="Reset Timer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Interactive Habit Checklist */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                        <span>Daily Routines</span>
                        <span className="text-neutral-400 font-normal">{completedCount} of {habits.length} Done</span>
                      </div>
                      <div className="space-y-2">
                        {habits.map((habit) => (
                          <div
                            key={habit.id}
                            onClick={() => toggleHabit(habit.id)}
                            className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                              habit.done
                                ? 'bg-cyan-50/50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-800/60'
                                : 'bg-neutral-50 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors ${
                                  habit.done
                                    ? 'bg-cyan-500 text-neutral-950'
                                    : 'border border-neutral-300 dark:border-neutral-700'
                                }`}
                              >
                                {habit.done && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span
                                className={`text-xs ${
                                  habit.done
                                    ? 'line-through text-neutral-400 dark:text-neutral-500'
                                    : 'text-neutral-900 dark:text-neutral-200 font-medium'
                                }`}
                              >
                                {habit.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] font-mono text-amber-500 dark:text-amber-400">
                              <Flame className="w-3 h-3 fill-amber-500/20" />
                              <span>{habit.streak}d</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900 text-center text-[10px] text-neutral-400">
                    Offline &amp; Encrypted · Changes saved to local browser storage
                  </div>
                </>
              ) : (
                <>
                  {/* COMPANION GAME SCREEN */}
                  <div className="flex flex-col items-center justify-between h-full">
                    {/* Game Header */}
                    <div className="w-full flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Pulse Orbit</span>
                        </h4>
                        <span className="text-[10px] text-neutral-400">Rhythm Mind-Reset</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono font-bold text-cyan-500 tabular-nums">
                          {gameScore.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono">COMBO: x{gameCombo}</span>
                      </div>
                    </div>

                    {/* Playable Canvas */}
                    <div className="relative my-3">
                      <canvas
                        ref={canvasRef}
                        width={280}
                        height={260}
                        className="rounded-2xl bg-neutral-900 cursor-pointer shadow-inner border border-neutral-800"
                        onClick={handleGameTap}
                      />
                      {hitFeedback && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xs text-emerald-400 font-mono pointer-events-none animate-bounce">
                          {hitFeedback}
                        </div>
                      )}
                    </div>

                    {/* Game Instructions & Tap Button */}
                    <div className="w-full text-center">
                      <button
                        onClick={handleGameTap}
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-neutral-950 font-bold rounded-xl text-xs shadow-md transition-all active:scale-95 mb-2"
                      >
                        TAP ORBIT IN SYNC
                      </button>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        Tap when the expanding pulse ring aligns with the white target orbit.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { 
  Wifi, 
  Volume2, 
  VolumeX, 
  Battery, 
  Calendar as CalendarIcon, 
  Moon, 
  Sun, 
  Bell, 
  Sliders,
  ChevronUp,
  Check
} from 'lucide-react';
import { playSound, setSoundEnabled, getSoundEnabled } from '../../utils/sound';

export default function SystemTray({ 
  isDarkMode, 
  onToggleDarkMode, 
  onShowDesktop 
}) {
  const [time, setTime] = useState(new Date());
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [volume, setVolume] = useState(80);
  const [soundOn, setSoundOn] = useState(getSoundEnabled());

  const quickSettingsRef = useRef(null);
  const calendarRef = useRef(null);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close popups on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (quickSettingsRef.current && !quickSettingsRef.current.contains(e.target) && !e.target.closest('#system-tray-btn')) {
        setShowQuickSettings(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(e.target) && !e.target.closest('#clock-tray-btn')) {
        setShowCalendar(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) playSound('success');
  };

  const formattedTime = time.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const formattedDate = time.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });

  const fullDayDate = time.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex items-center h-full text-slate-200 select-none relative">
      {/* Quick Settings Group (Wifi, Sound, Battery) */}
      <button
        id="system-tray-btn"
        onClick={() => {
          playSound('click');
          setShowQuickSettings(!showQuickSettings);
          setShowCalendar(false);
        }}
        className={`flex items-center gap-2 h-9 px-2.5 rounded-lg hover:bg-white/10 transition cursor-pointer text-slate-300 hover:text-white ${
          showQuickSettings ? 'bg-white/15 text-white' : ''
        }`}
      >
        <Wifi size={14} className="text-emerald-400" />
        {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} className="text-rose-400" />}
        <Battery size={14} className="text-blue-400" />
      </button>

      {/* Clock & Date */}
      <button
        id="clock-tray-btn"
        onClick={() => {
          playSound('click');
          setShowCalendar(!showCalendar);
          setShowQuickSettings(false);
        }}
        className={`flex flex-col items-end justify-center h-9 px-2 rounded-lg hover:bg-white/10 transition cursor-pointer leading-tight text-right ${
          showCalendar ? 'bg-white/15 text-white' : ''
        }`}
      >
        <span className="text-[11px] font-medium tracking-tight font-mono">{formattedTime}</span>
        <span className="text-[10px] text-slate-400 font-mono">{formattedDate}</span>
      </button>

      {/* Show Desktop Peek Bar (Far right strip) */}
      <div
        onClick={() => {
          playSound('minimize');
          onShowDesktop();
        }}
        title="Tampilkan Desktop"
        className="w-1.5 h-6 mx-1 my-auto rounded-full hover:bg-blue-400 transition cursor-pointer bg-white/20 hover:w-2"
      />

      {/* Quick Settings Flyout */}
      {showQuickSettings && (
        <div
          ref={quickSettingsRef}
          className="fixed bottom-14 right-3 z-50 w-80 rounded-2xl glass-startmenu p-4 shadow-2xl text-xs space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-150 overflow-hidden"
        >
          <div className="glass-specular-top" />
          <div className="flex items-center justify-between pb-1 border-b border-white/10">
            <span className="font-bold text-white text-xs uppercase tracking-wider">Aksi Cepat</span>
            <Sliders size={14} className="text-slate-300" />
          </div>

          {/* Quick Toggles Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-3 rounded-xl flex items-center gap-3 transition cursor-pointer border ${
                soundOn 
                  ? 'bg-blue-600/80 border-blue-400 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white/10 hover:bg-white/15 border-white/15 text-slate-200'
              }`}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <div className="text-left">
                <span className="font-semibold block leading-tight">Audio FX</span>
                <span className="text-[10px] opacity-80">{soundOn ? 'Aktif' : 'Mute'}</span>
              </div>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => {
                playSound('click');
                onToggleDarkMode();
              }}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center gap-3 text-slate-200 transition cursor-pointer"
            >
              {isDarkMode ? <Moon size={16} className="text-purple-300" /> : <Sun size={16} className="text-amber-300" />}
              <div className="text-left">
                <span className="font-semibold block leading-tight text-white">Mode Tema</span>
                <span className="text-[10px] text-slate-300">{isDarkMode ? 'Dark' : 'Light'}</span>
              </div>
            </button>
          </div>

          {/* Volume Slider */}
          <div className="space-y-1.5 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between text-[11px] text-slate-200">
              <span className="flex items-center gap-1.5">
                <Volume2 size={13} className="text-blue-300" /> Volume Suara
              </span>
              <span className="font-mono">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-blue-400 h-1.5 bg-white/20 rounded-lg cursor-pointer"
            />
          </div>

          {/* Battery Status */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-200">
            <span className="flex items-center gap-1.5">
              <Battery size={13} className="text-emerald-400" /> Baterai & Daya
            </span>
            <span className="text-emerald-300 font-medium">100% Terisi Penuh (AC)</span>
          </div>
        </div>
      )}

      {/* Calendar & Notification Flyout */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className="fixed bottom-14 right-3 z-50 w-80 rounded-2xl glass-startmenu p-4 shadow-2xl text-xs space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-150 overflow-hidden"
        >
          <div className="glass-specular-top" />
          {/* Header */}
          <div className="pb-3 border-b border-white/10">
            <span className="text-sm font-bold text-white block capitalize">{fullDayDate}</span>
            <span className="text-xs text-blue-300 font-mono mt-0.5 block">{formattedTime}</span>
          </div>

          {/* Calendar Grid Representation */}
          <div className="space-y-2">
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-300 uppercase">
              <span>Min</span><span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                const isToday = day === time.getDate();
                return (
                  <div
                    key={day}
                    className={`h-7 flex items-center justify-center rounded-lg text-xs transition ${
                      isToday
                        ? 'bg-blue-500/80 text-white font-bold border border-blue-300 shadow-md shadow-blue-500/40'
                        : 'text-slate-200 hover:bg-white/15'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Portfolio Notifications */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-semibold text-white uppercase tracking-wider flex items-center gap-1">
                <Bell size={12} className="text-blue-300" /> Notifikasi
              </span>
              <span className="text-[10px] opacity-75">Baru saja</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md space-y-1">
              <span className="font-semibold text-white block">Selamat datang di Portofolio Glass OS!</span>
              <p className="text-[11px] text-slate-200 leading-normal m-0">
                Tema Frosted Glass aktif dengan efek transmisi cahaya, refleksi permukaan, dan blur latar.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  Palette, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Info, 
  Check, 
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { playSound, setSoundEnabled, getSoundEnabled } from '../../utils/sound';

export default function SettingsApp({ 
  currentWallpaper, 
  onSelectWallpaper, 
  isDarkMode, 
  onToggleDarkMode,
  accentColor,
  onChangeAccentColor 
}) {
  const { wallpapers, personal } = portfolioData;
  const [activeTab, setActiveTab] = useState('personalization');
  const [soundOn, setSoundOn] = useState(getSoundEnabled());

  const accentColors = [
    { name: 'Windows Blue', value: '#0078d4' },
    { name: 'Emerald Green', value: '#10b981' },
    { name: 'Purple Velvet', value: '#8b5cf6' },
    { name: 'Rose Sunset', value: '#f43f5e' },
    { name: 'Amber Gold', value: '#f59e0b' },
  ];

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playSound('success');
    }
  };

  return (
    <div className="h-full flex bg-slate-950/20 text-slate-200 select-text overflow-hidden backdrop-blur-sm">
      {/* Sidebar Navigation */}
      <div className="w-48 sm:w-56 p-3 bg-white/5 border-r border-white/10 flex flex-col gap-1 shrink-0 backdrop-blur-md">
        <div className="px-3 py-3 mb-2 flex items-center gap-2 border-b border-white/10">
          <Monitor size={18} className="text-blue-300" />
          <span className="text-xs font-bold text-white tracking-wide uppercase drop-shadow-sm">Pengaturan OS</span>
        </div>

        <button
          onClick={() => { playSound('click'); setActiveTab('personalization'); }}
          className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition cursor-pointer text-left ${
            activeTab === 'personalization' 
              ? 'bg-blue-600/80 text-white border border-blue-400/40 shadow-md' 
              : 'hover:bg-white/10 text-slate-300'
          }`}
        >
          <Palette size={15} /> Personalisasi
        </button>

        <button
          onClick={() => { playSound('click'); setActiveTab('system'); }}
          className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition cursor-pointer text-left ${
            activeTab === 'system' 
              ? 'bg-blue-600/80 text-white border border-blue-400/40 shadow-md' 
              : 'hover:bg-white/10 text-slate-300'
          }`}
        >
          <Info size={15} /> Tentang Sistem
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7">
        {activeTab === 'personalization' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white m-0 mb-1 drop-shadow-sm">Personalisasi Desktop</h2>
              <p className="text-xs text-slate-300 m-0">Kustomisasi wallpaper, audio sound effect, dan aksen warna</p>
            </div>

            {/* Wallpaper Selection */}
            <div className="p-5 rounded-2xl glass-card space-y-3 relative overflow-hidden">
              <div className="glass-specular-top" />
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                Pilih Latar Belakang (Wallpaper)
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {wallpapers.map((wp) => (
                  <div
                    key={wp.id}
                    onClick={() => {
                      playSound('click');
                      onSelectWallpaper(wp);
                    }}
                    className={`group relative rounded-xl overflow-hidden aspect-video cursor-pointer border-2 transition-all ${
                      currentWallpaper?.id === wp.id 
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20 scale-102' 
                        : 'border-white/10 hover:border-white/40'
                    }`}
                  >
                    <img 
                      src={wp.url} 
                      alt={wp.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[11px] font-medium text-white truncate">
                        {wp.name}
                      </span>
                    </div>
                    {currentWallpaper?.id === wp.id && (
                      <span className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow">
                        <Check size={12} />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Toggle */}
            <div className="p-4 rounded-2xl glass-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/20">
                  {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white m-0">Windows Sound Effects</h4>
                  <p className="text-[11px] text-slate-300 m-0">Efek suara Web Audio sintetis saat klik dan buka jendela</p>
                </div>
              </div>
              <button
                onClick={toggleSound}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer border ${
                  soundOn 
                    ? 'bg-blue-600/90 border-blue-400 text-white shadow-md' 
                    : 'glass-btn text-slate-200'
                }`}
              >
                {soundOn ? 'Aktif' : 'Mati'}
              </button>
            </div>

            {/* Accent Color Picker */}
            <div className="p-4 rounded-2xl glass-card space-y-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                Warna Aksen Windows
              </label>
              <div className="flex flex-wrap gap-3">
                {accentColors.map(color => (
                  <button
                    key={color.value}
                    onClick={() => {
                      playSound('click');
                      onChangeAccentColor?.(color.value);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition ${
                      accentColor === color.value 
                        ? 'border-white bg-white/20 text-white shadow-lg' 
                        : 'border-white/10 glass-btn text-slate-200'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full shadow-md" 
                      style={{ backgroundColor: color.value }} 
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="max-w-2xl space-y-5">
            <div>
              <h2 className="text-lg font-bold text-white m-0 mb-1 drop-shadow-sm">Spesifikasi Sistem</h2>
              <p className="text-xs text-slate-300 m-0">Informasi lingkungan perangkat dan arsitektur portofolio</p>
            </div>

            <div className="p-5 rounded-2xl glass-card space-y-3 text-xs relative overflow-hidden">
              <div className="glass-specular-top" />
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-white/10">
                <span className="text-slate-300">Device Name</span>
                <span className="col-span-2 font-mono text-white font-semibold">PORTFOLIO-WIN11-PRO</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-white/10">
                <span className="text-slate-300">Engineer</span>
                <span className="col-span-2 text-white font-semibold">{personal.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-white/10">
                <span className="text-slate-300">Processor</span>
                <span className="col-span-2 text-slate-200">Problem Solving Neural Architecture @ 4.2 GHz</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-white/10">
                <span className="text-slate-300">Installed RAM</span>
                <span className="col-span-2 text-slate-200">32.0 GB (31.8 GB usable)</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-white/10">
                <span className="text-slate-300">Operating System</span>
                <span className="col-span-2 text-slate-200">Windows 11 Portfolio Glass Edition 24H2</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-white/10">
                <span className="text-slate-300">Frontend Engine</span>
                <span className="col-span-2 text-blue-300 font-mono">React 19 + Vite 8 + Tailwind CSS v4</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5">
                <span className="text-slate-300">Glass System</span>
                <span className="col-span-2 text-emerald-300 font-mono">Frosted Aero & Acrylic Mica Blur</span>
              </div>
            </div>

            <div className="p-4 rounded-xl glass-card border-blue-400/30 text-xs text-slate-200">
              💡 <strong>Tips Interaksi:</strong> Anda dapat membuka beberapa jendela sekaligus, menyeret (drag) jendela, me-maximize, me-minimize ke taskbar, serta mengklik kanan pada desktop untuk memunculkan menu konteks!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

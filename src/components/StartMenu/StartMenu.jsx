import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  Search, 
  Power, 
  User, 
  FolderGit2, 
  Cpu, 
  FileText, 
  Terminal, 
  Settings, 
  Trash2, 
  Gamepad2, 
  ScrollText,
  ExternalLink,
  Download,
  RotateCw,
  LogOut,
  Sparkles
} from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function StartMenu({ 
  isOpen, 
  onClose, 
  onOpenApp, 
  onRestartSystem 
}) {
  const { personal, projects } = portfolioData;
  const [search, setSearch] = useState('');
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('#taskbar-start-btn')) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pinnedApps = [
    { id: 'about', name: 'About Me', icon: User, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 'projects', name: 'Projects', icon: FolderGit2, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 'skills', name: 'Tech Stack', icon: Cpu, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 'experience', name: 'Experience', icon: ScrollText, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 'notepad', name: 'Notepad', icon: FileText, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'text-slate-300', bg: 'bg-slate-500/10' },
    { id: 'minesweeper', name: 'Minesweeper', icon: Gamepad2, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { id: 'recycle', name: 'Recycle Bin', icon: Trash2, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  const filteredApps = pinnedApps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      ref={menuRef}
      className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-[560px] h-[580px] rounded-2xl glass-startmenu shadow-2xl flex flex-col overflow-hidden text-slate-100 select-none animate-in fade-in slide-in-from-bottom-5 duration-150"
    >
      {/* Specular top glare */}
      <div className="glass-specular-top" />

      {/* Search Bar */}
      <div className="p-5 pb-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ketik untuk mencari aplikasi, proyek, atau keahlian..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-white placeholder-slate-300/70 focus:outline-none transition"
            autoFocus
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-6">
        {/* Pinned Apps Header */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Aplikasi Tersemat
            </span>
            <span className="text-[11px] text-slate-300">Semua Aplikasi &gt;</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {filteredApps.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    playSound('open');
                    onOpenApp(app.id);
                    onClose();
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-white/15 hover:border-white/20 transition-all cursor-pointer group border border-transparent"
                >
                  <div className={`p-3 rounded-2xl ${app.bg} ${app.color} mb-1.5 shadow-md border border-white/10 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-medium text-slate-100 group-hover:text-white truncate max-w-full">
                    {app.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recommended Files & Links */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Direkomendasikan
            </span>
            <span className="text-[11px] text-slate-300">Aktivitas Terkini</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div 
              onClick={() => {
                playSound('open');
                onOpenApp('projects');
                onClose();
              }}
              className="p-2.5 rounded-xl glass-card flex items-center gap-3 cursor-pointer transition group"
            >
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/20 shrink-0">
                <FolderGit2 size={16} />
              </div>
              <div className="truncate">
                <span className="text-xs font-semibold text-white block truncate group-hover:text-blue-300">
                  {projects[0]?.title || 'CloudNexus SaaS'}
                </span>
                <span className="text-[11px] text-slate-300 block truncate">
                  Proyek Unggulan Terkini
                </span>
              </div>
            </div>

            <div 
              onClick={() => {
                playSound('open');
                onOpenApp('about');
                onClose();
              }}
              className="p-2.5 rounded-xl glass-card flex items-center gap-3 cursor-pointer transition group"
            >
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/20 shrink-0">
                <Download size={16} />
              </div>
              <div className="truncate">
                <span className="text-xs font-semibold text-white block truncate group-hover:text-emerald-300">
                  Curriculum Vitae (CV)
                </span>
                <span className="text-[11px] text-slate-300 block truncate">
                  Dokumen resume profil
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Profile & Power Footer */}
      <div className="p-4 bg-white/5 border-t border-white/15 flex items-center justify-between relative shrink-0">
        <div 
          onClick={() => {
            playSound('open');
            onOpenApp('about');
            onClose();
          }}
          className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer max-w-[280px]"
        >
          <img
            src={personal.avatar}
            alt={personal.name}
            className="w-9 h-9 rounded-full object-cover border border-blue-400"
          />
          <div className="truncate">
            <span className="text-xs font-bold text-white block truncate leading-tight">
              {personal.name}
            </span>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Siap Bekerja
            </span>
          </div>
        </div>

        {/* Power Button */}
        <div className="relative">
          <button
            onClick={() => {
              playSound('click');
              setShowPowerMenu(!showPowerMenu);
            }}
            className="w-9 h-9 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            title="Daya & Sistem"
          >
            <Power size={18} />
          </button>

          {showPowerMenu && (
            <div className="absolute right-0 bottom-12 w-44 rounded-xl bg-slate-900 border border-white/15 p-1.5 shadow-2xl backdrop-blur-2xl text-xs space-y-0.5 z-50">
              <button
                onClick={() => {
                  playSound('startup');
                  setShowPowerMenu(false);
                  onRestartSystem();
                  onClose();
                }}
                className="w-full px-3 py-2 rounded-lg hover:bg-blue-600 text-left flex items-center gap-2 text-slate-200 hover:text-white transition cursor-pointer"
              >
                <RotateCw size={14} className="text-blue-400" />
                <span>Restart Portfolio OS</span>
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  setShowPowerMenu(false);
                  alert('Sistem berada dalam mode siaga (Sleep). Klik apa saja untuk melanjutkan!');
                  onClose();
                }}
                className="w-full px-3 py-2 rounded-lg hover:bg-blue-600 text-left flex items-center gap-2 text-slate-200 hover:text-white transition cursor-pointer"
              >
                <LogOut size={14} className="text-amber-400" />
                <span>Mode Siaga (Sleep)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import SystemTray from './SystemTray';
import { 
  Search, 
  User, 
  FolderGit2, 
  Cpu, 
  FileText, 
  Terminal, 
  Settings, 
  Gamepad2,
  Trash2,
  ScrollText
} from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function Taskbar({
  openWindows,
  activeWindowId,
  onToggleWindow,
  isStartOpen,
  onToggleStart,
  onOpenApp,
  isDarkMode,
  onToggleDarkMode,
  onShowDesktop
}) {
  const defaultPinned = [
    { id: 'about', title: 'About Me', icon: User, color: 'text-blue-400' },
    { id: 'projects', title: 'Projects', icon: FolderGit2, color: 'text-indigo-400' },
    { id: 'skills', title: 'Tech Stack', icon: Cpu, color: 'text-purple-400' },
    { id: 'experience', title: 'Experience', icon: ScrollText, color: 'text-emerald-400' },
    { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'text-cyan-400' },
    { id: 'notepad', title: 'Notepad', icon: FileText, color: 'text-amber-400' },
    { id: 'settings', title: 'Settings', icon: Settings, color: 'text-slate-300' },
    { id: 'minesweeper', title: 'Minesweeper', icon: Gamepad2, color: 'text-rose-400' },
  ];

  const handleStartClick = () => {
    playSound('click');
    onToggleStart();
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 z-40 glass-taskbar flex items-center justify-between px-3 select-none">
      {/* Specular top glare */}
      <div className="glass-specular-top" />

      {/* Left empty spacer for perfect center balance */}
      <div className="w-16 hidden sm:block" />

      {/* Centered App Icons & Start Button */}
      <div className="flex items-center gap-1.5 mx-auto">
        {/* Windows 11 Start Button */}
        <button
          id="taskbar-start-btn"
          onClick={handleStartClick}
          title="Start"
          className={`group w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isStartOpen
              ? 'bg-white/25 border border-white/30 shadow-lg backdrop-blur-md'
              : 'hover:bg-white/15 hover:border hover:border-white/20 active:scale-90'
          }`}
        >
          {/* Windows 11 4-square grid logo with subtle glow */}
          <div className="grid grid-cols-2 gap-0.5 p-1 group-hover:scale-105 transition-transform drop-shadow-[0_0_8px_rgba(0,164,239,0.5)]">
            <span className="w-2 h-2 rounded-[2px] bg-[#00a4ef]" />
            <span className="w-2 h-2 rounded-[2px] bg-[#00a4ef]" />
            <span className="w-2 h-2 rounded-[2px] bg-[#00a4ef]" />
            <span className="w-2 h-2 rounded-[2px] bg-[#00a4ef]" />
          </div>
        </button>

        {/* Windows Search Bar Button */}
        <button
          onClick={() => {
            playSound('click');
            onToggleStart();
          }}
          title="Search"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/15 hover:border hover:border-white/20 transition active:scale-90 cursor-pointer"
        >
          <Search size={18} />
        </button>

        <div className="h-5 w-px bg-white/20 mx-1 hidden sm:block" />

        {/* Pinned & Running Apps */}
        {defaultPinned.map((app) => {
          const isOpen = openWindows.some(w => w.id === app.id);
          const isActive = activeWindowId === app.id;
          const Icon = app.icon;

          return (
            <button
              key={app.id}
              onClick={() => {
                playSound('click');
                onToggleWindow(app.id);
              }}
              title={app.title}
              className={`group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-white/20 border border-white/30 text-white shadow-md backdrop-blur-md'
                  : isOpen
                  ? 'bg-white/10 hover:bg-white/15 border border-white/15 text-slate-100'
                  : 'hover:bg-white/10 hover:border hover:border-white/15 text-slate-300 hover:text-white'
              } active:scale-90`}
            >
              <div className="group-hover:-translate-y-0.5 transition-transform">
                <Icon size={19} className={app.color} />
              </div>

              {/* Running indicator bar / dot */}
              {isOpen && (
                <span
                  className={`absolute bottom-1 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-4 h-1 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]'
                      : 'w-1.5 h-1 bg-white/60'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* System Tray (Right) */}
      <div className="flex items-center">
        <SystemTray
          isDarkMode={isDarkMode}
          onToggleDarkMode={onToggleDarkMode}
          onShowDesktop={onShowDesktop}
        />
      </div>
    </footer>
  );
}

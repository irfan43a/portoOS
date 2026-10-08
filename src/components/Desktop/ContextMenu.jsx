import React, { useEffect, useRef } from 'react';
import { 
  RefreshCw, 
  Palette, 
  Terminal, 
  FileText, 
  Layers, 
  Info,
  LayoutGrid
} from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function ContextMenu({ 
  position, 
  onClose, 
  onOpenApp, 
  onRefreshDesktop,
  onAutoArrangeIcons
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  const handleAction = (callback) => {
    playSound('click');
    callback();
    onClose();
  };

  // Adjust position so it doesn't overflow screen
  const menuWidth = 220;
  const menuHeight = 310;
  const x = Math.min(position.x, window.innerWidth - menuWidth - 10);
  const y = Math.min(position.y, window.innerHeight - menuHeight - 10);

  return (
    <div
      ref={menuRef}
      style={{ left: `${x}px`, top: `${y}px` }}
      className="fixed z-50 w-56 rounded-xl glass-startmenu p-1.5 shadow-2xl text-xs text-slate-100 select-none animate-in fade-in zoom-in-95 duration-100 overflow-hidden"
    >
      <div className="glass-specular-top" />
      <div className="space-y-0.5">
        <button
          onClick={() => handleAction(onRefreshDesktop)}
          className="w-full px-3 py-1.5 rounded-lg hover:bg-blue-600/80 hover:text-white flex items-center gap-2.5 transition cursor-pointer text-left"
        >
          <RefreshCw size={14} className="text-blue-300" />
          <span>Refresh Desktop</span>
        </button>

        {onAutoArrangeIcons && (
          <button
            onClick={() => handleAction(onAutoArrangeIcons)}
            className="w-full px-3 py-1.5 rounded-lg hover:bg-blue-600/80 hover:text-white flex items-center gap-2.5 transition cursor-pointer text-left"
          >
            <LayoutGrid size={14} className="text-emerald-300" />
            <span>Ratakan Posisi Ikon (Grid)</span>
          </button>
        )}

        <div className="h-px bg-white/10 my-1" />

        <button
          onClick={() => handleAction(() => onOpenApp('settings'))}
          className="w-full px-3 py-1.5 rounded-lg hover:bg-blue-600/80 hover:text-white flex items-center gap-2.5 transition cursor-pointer text-left"
        >
          <Palette size={14} className="text-purple-300" />
          <span>Ganti Wallpaper & Tema</span>
        </button>

        <button
          onClick={() => handleAction(() => onOpenApp('terminal'))}
          className="w-full px-3 py-1.5 rounded-lg hover:bg-blue-600/80 hover:text-white flex items-center gap-2.5 transition cursor-pointer text-left"
        >
          <Terminal size={14} className="text-cyan-300" />
          <span>Buka di Windows Terminal</span>
        </button>

        <button
          onClick={() => handleAction(() => onOpenApp('notepad'))}
          className="w-full px-3 py-1.5 rounded-lg hover:bg-blue-600/80 hover:text-white flex items-center gap-2.5 transition cursor-pointer text-left"
        >
          <FileText size={14} className="text-amber-300" />
          <span>Buat Catatan / Hubungi Saya</span>
        </button>

        <div className="h-px bg-white/10 my-1" />

        <button
          onClick={() => handleAction(() => onOpenApp('projects'))}
          className="w-full px-3 py-1.5 rounded-lg hover:bg-blue-600/80 hover:text-white flex items-center gap-2.5 transition cursor-pointer text-left"
        >
          <Layers size={14} className="text-blue-300" />
          <span>Jelajahi Proyek Portofolio</span>
        </button>

        <button
          onClick={() => handleAction(() => onOpenApp('about'))}
          className="w-full px-3 py-1.5 rounded-lg hover:bg-blue-600/80 hover:text-white flex items-center gap-2.5 transition cursor-pointer text-left"
        >
          <Info size={14} className="text-indigo-300" />
          <span>Tentang Portofolio OS</span>
        </button>
      </div>
    </div>
  );
}

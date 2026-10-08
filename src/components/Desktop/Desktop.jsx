import React, { useState, useEffect, useCallback } from 'react';
import DesktopIcon from './DesktopIcon';
import ContextMenu from './ContextMenu';
import { 
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

const DESKTOP_ICONS = [
  { id: 'about', title: 'About Me', icon: User, color: 'text-blue-300' },
  { id: 'projects', title: 'Projects', icon: FolderGit2, color: 'text-indigo-300' },
  { id: 'skills', title: 'Tech Stack', icon: Cpu, color: 'text-purple-300' },
  { id: 'experience', title: 'Experience', icon: ScrollText, color: 'text-emerald-300' },
  { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'text-cyan-300' },
  { id: 'notepad', title: 'Notepad', icon: FileText, color: 'text-amber-300' },
  { id: 'minesweeper', title: 'Minesweeper', icon: Gamepad2, color: 'text-rose-300' },
  { id: 'settings', title: 'Settings', icon: Settings, color: 'text-slate-200' },
  { id: 'recycle', title: 'Recycle Bin', icon: Trash2, color: 'text-rose-400' },
];

export default function Desktop({
  onOpenApp,
  wallpaper,
  onRefreshDesktop,
  isRefreshing
}) {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  // Calculate clean grid coordinates for icons
  const calculateDefaultPositions = useCallback(() => {
    const positions = {};
    const availableHeight = typeof window !== 'undefined' ? window.innerHeight - 100 : 700;
    const maxRows = Math.max(3, Math.floor(availableHeight / 110));

    DESKTOP_ICONS.forEach((icon, i) => {
      const col = Math.floor(i / maxRows);
      const row = i % maxRows;
      positions[icon.id] = {
        x: 20 + col * 105,
        y: 20 + row * 110,
      };
    });
    return positions;
  }, []);

  // Icon positions state with localStorage persistence
  const [iconPositions, setIconPositions] = useState(() => {
    try {
      const saved = localStorage.getItem('desktop_icon_positions_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return calculateDefaultPositions();
  });

  // Update a single icon's position
  const handleUpdateIconPosition = (id, newPos) => {
    setIconPositions(prev => {
      const updated = { ...prev, [id]: newPos };
      try {
        localStorage.setItem('desktop_icon_positions_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Re-align all icons into neat grid
  const handleAutoArrangeIcons = () => {
    playSound('open');
    const resetPositions = calculateDefaultPositions();
    setIconPositions(resetPositions);
    try {
      localStorage.setItem('desktop_icon_positions_v1', JSON.stringify(resetPositions));
    } catch {}
  };

  const handleDesktopClick = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('desktop-overlay')) {
      setSelectedIcon(null);
      if (contextMenu) setContextMenu(null);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    playSound('click');
    setContextMenu({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <main
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      className={`relative w-full h-[calc(100vh-48px)] overflow-hidden select-none transition-opacity duration-300 ${
        isRefreshing ? 'opacity-50' : 'opacity-100'
      }`}
      style={{
        backgroundImage: `url(${wallpaper.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background Overlay for depth */}
      <div className="absolute inset-0 bg-slate-950/20 backdrop-brightness-95 pointer-events-none desktop-overlay" />

      {/* Freely Draggable Desktop Icons */}
      {DESKTOP_ICONS.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon.icon}
          title={icon.title}
          color={icon.color}
          position={iconPositions[icon.id] || { x: 20, y: 20 }}
          onPositionChange={(pos) => handleUpdateIconPosition(icon.id, pos)}
          isSelected={selectedIcon === icon.id}
          onSelect={() => setSelectedIcon(icon.id)}
          onClick={() => onOpenApp(icon.id)}
        />
      ))}

      {/* Desktop Watermark in Bottom Right */}
      <div className="absolute bottom-4 right-4 text-right pointer-events-none z-10 select-none">
        <p className="text-[11px] font-semibold text-white/50 m-0 drop-shadow">
          Windows 11 Glass Portfolio OS
        </p>
        <p className="text-[10px] text-white/40 font-mono m-0 drop-shadow">
          Draggable Icons • Build 24H2
        </p>
      </div>

      {/* Right Click Context Menu */}
      {contextMenu && (
        <ContextMenu
          position={contextMenu}
          onClose={() => setContextMenu(null)}
          onOpenApp={onOpenApp}
          onRefreshDesktop={onRefreshDesktop}
          onAutoArrangeIcons={handleAutoArrangeIcons}
        />
      )}
    </main>
  );
}

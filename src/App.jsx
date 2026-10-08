import React, { useState, useEffect, useCallback } from 'react';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';
import StartMenu from './components/StartMenu/StartMenu';
import WindowFrame from './components/Window/WindowFrame';

// Apps
import AboutApp from './components/Apps/AboutApp';
import ProjectsApp from './components/Apps/ProjectsApp';
import SkillsApp from './components/Apps/SkillsApp';
import ExperienceApp from './components/Apps/ExperienceApp';
import TerminalApp from './components/Apps/TerminalApp';
import NotepadApp from './components/Apps/NotepadApp';
import SettingsApp from './components/Apps/SettingsApp';
import MinesweeperApp from './components/Apps/MinesweeperApp';
import RecycleBinApp from './components/Apps/RecycleBinApp';

import { portfolioData } from './data/portfolioData';
import { playSound } from './utils/sound';

import { 
  User, 
  FolderGit2, 
  Cpu, 
  FileText, 
  Terminal, 
  Settings, 
  Gamepad2, 
  Trash2, 
  ScrollText,
  Sparkles
} from 'lucide-react';

const APP_CONFIGS = {
  about: {
    id: 'about',
    title: 'About Me - Irfan Abidin',
    icon: User,
    defaultSize: { width: 880, height: 600 },
    defaultPos: { x: 80, y: 40 },
  },
  projects: {
    id: 'projects',
    title: 'Portfolio Projects Explorer',
    icon: FolderGit2,
    defaultSize: { width: 980, height: 620 },
    defaultPos: { x: 120, y: 50 },
  },
  skills: {
    id: 'skills',
    title: 'System Specifications & Tech Stack',
    icon: Cpu,
    defaultSize: { width: 860, height: 560 },
    defaultPos: { x: 140, y: 70 },
  },
  experience: {
    id: 'experience',
    title: 'Career History & Education',
    icon: ScrollText,
    defaultSize: { width: 880, height: 580 },
    defaultPos: { x: 160, y: 60 },
  },
  terminal: {
    id: 'terminal',
    title: 'Windows PowerShell Core',
    icon: Terminal,
    defaultSize: { width: 750, height: 480 },
    defaultPos: { x: 180, y: 100 },
  },
  notepad: {
    id: 'notepad',
    title: 'Notepad - Hubungi Pengembang.txt',
    icon: FileText,
    defaultSize: { width: 680, height: 560 },
    defaultPos: { x: 200, y: 60 },
  },
  settings: {
    id: 'settings',
    title: 'Settings - Personalisasi OS',
    icon: Settings,
    defaultSize: { width: 780, height: 520 },
    defaultPos: { x: 160, y: 80 },
  },
  minesweeper: {
    id: 'minesweeper',
    title: 'Minesweeper Retro Game',
    icon: Gamepad2,
    defaultSize: { width: 380, height: 460 },
    defaultPos: { x: 260, y: 90 },
  },
  recycle: {
    id: 'recycle',
    title: 'Recycle Bin',
    icon: Trash2,
    defaultSize: { width: 640, height: 420 },
    defaultPos: { x: 220, y: 110 },
  },
};

export default function App() {
  const { wallpapers } = portfolioData;

  const [currentWallpaper, setCurrentWallpaper] = useState(wallpapers[0]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [accentColor, setAccentColor] = useState('#0078d4');

  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen width for mobile responsive auto-maximize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Open About window by default on initial boot
  useEffect(() => {
    const initialConfig = APP_CONFIGS.about;
    setOpenWindows([
      {
        ...initialConfig,
        position: initialConfig.defaultPos,
        size: initialConfig.defaultSize,
        zIndex: 10,
        isMinimized: false,
      }
    ]);
    setActiveWindowId('about');
    playSound('startup');
  }, []);

  // Open an app window
  const handleOpenApp = useCallback((appId) => {
    setIsStartOpen(false);
    const existing = openWindows.find(w => w.id === appId);

    if (existing) {
      // Already open: restore if minimized and focus
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      setOpenWindows(prev => prev.map(w => 
        w.id === appId ? { ...w, isMinimized: false, zIndex: newZ } : w
      ));
      setActiveWindowId(appId);
    } else {
      // Open new
      const config = APP_CONFIGS[appId];
      if (!config) return;
      const newZ = maxZIndex + 1;
      setMaxZIndex(newZ);
      const newWindow = {
        ...config,
        position: isMobile ? { x: 0, y: 0 } : {
          x: Math.min(window.innerWidth - 300, config.defaultPos.x + (openWindows.length % 5) * 25),
          y: Math.min(window.innerHeight - 300, config.defaultPos.y + (openWindows.length % 5) * 25),
        },
        size: config.defaultSize,
        zIndex: newZ,
        isMinimized: false,
      };
      setOpenWindows(prev => [...prev, newWindow]);
      setActiveWindowId(appId);
    }
  }, [openWindows, maxZIndex, isMobile]);

  // Focus a window
  const handleFocusWindow = useCallback((appId) => {
    if (activeWindowId === appId) return;
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setOpenWindows(prev => prev.map(w =>
      w.id === appId ? { ...w, zIndex: newZ, isMinimized: false } : w
    ));
    setActiveWindowId(appId);
  }, [activeWindowId, maxZIndex]);

  // Minimize a window
  const handleMinimizeWindow = useCallback((appId) => {
    setOpenWindows(prev => prev.map(w =>
      w.id === appId ? { ...w, isMinimized: true } : w
    ));
    if (activeWindowId === appId) {
      // Find remaining visible window with highest zIndex
      const visible = openWindows.filter(w => w.id !== appId && !w.isMinimized);
      if (visible.length > 0) {
        const top = visible.reduce((prev, curr) => curr.zIndex > prev.zIndex ? curr : prev);
        setActiveWindowId(top.id);
      } else {
        setActiveWindowId(null);
      }
    }
  }, [activeWindowId, openWindows]);

  // Close a window
  const handleCloseWindow = useCallback((appId) => {
    setOpenWindows(prev => prev.filter(w => w.id !== appId));
    if (activeWindowId === appId) {
      const remaining = openWindows.filter(w => w.id !== appId && !w.isMinimized);
      if (remaining.length > 0) {
        const top = remaining.reduce((prev, curr) => curr.zIndex > prev.zIndex ? curr : prev);
        setActiveWindowId(top.id);
      } else {
        setActiveWindowId(null);
      }
    }
  }, [activeWindowId, openWindows]);

  // Toggle window from taskbar
  const handleToggleWindow = useCallback((appId) => {
    const win = openWindows.find(w => w.id === appId);
    if (!win) {
      handleOpenApp(appId);
    } else if (win.isMinimized) {
      handleFocusWindow(appId);
    } else if (activeWindowId === appId) {
      handleMinimizeWindow(appId);
    } else {
      handleFocusWindow(appId);
    }
  }, [openWindows, activeWindowId, handleOpenApp, handleFocusWindow, handleMinimizeWindow]);

  // Show desktop (minimize all)
  const handleShowDesktop = useCallback(() => {
    setOpenWindows(prev => prev.map(w => ({ ...w, isMinimized: true })));
    setActiveWindowId(null);
    setIsStartOpen(false);
  }, []);

  // Refresh desktop animation
  const handleRefreshDesktop = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 300);
  }, []);

  // Simulated restart
  const handleRestartSystem = useCallback(() => {
    setIsRestarting(true);
    setTimeout(() => {
      setIsRestarting(false);
      setOpenWindows([]);
      handleOpenApp('about');
      playSound('startup');
    }, 2200);
  }, [handleOpenApp]);

  // Render specific app content inside window frame
  const renderAppContent = (appId) => {
    switch (appId) {
      case 'about':
        return <AboutApp onOpenApp={handleOpenApp} />;
      case 'projects':
        return <ProjectsApp />;
      case 'skills':
        return <SkillsApp />;
      case 'experience':
        return <ExperienceApp />;
      case 'terminal':
        return <TerminalApp onClose={() => handleCloseWindow('terminal')} onOpenApp={handleOpenApp} />;
      case 'notepad':
        return <NotepadApp />;
      case 'settings':
        return (
          <SettingsApp
            currentWallpaper={currentWallpaper}
            onSelectWallpaper={setCurrentWallpaper}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            accentColor={accentColor}
            onChangeAccentColor={setAccentColor}
          />
        );
      case 'minesweeper':
        return <MinesweeperApp />;
      case 'recycle':
        return <RecycleBinApp />;
      default:
        return null;
    }
  };

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Restart Overlay Screen */}
      {isRestarting && (
        <div className="fixed inset-0 z-[999] bg-[#005a9e] flex flex-col items-center justify-center text-white select-none">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6" />
          <h2 className="text-xl font-light tracking-wide m-0 mb-2">Memulai Ulang Portfolio OS...</h2>
          <p className="text-xs text-white/70 m-0">Menyiapkan konfigurasi desktop dan aplikasi...</p>
        </div>
      )}

      {/* Main Desktop Space */}
      <Desktop
        onOpenApp={handleOpenApp}
        wallpaper={currentWallpaper}
        onRefreshDesktop={handleRefreshDesktop}
        isRefreshing={isRefreshing}
      />

      {/* Window Manager Layer */}
      {openWindows.map((win) => {
        if (win.isMinimized) return null;

        return (
          <WindowFrame
            key={win.id}
            windowData={win}
            isActive={activeWindowId === win.id}
            onFocus={() => handleFocusWindow(win.id)}
            onClose={() => handleCloseWindow(win.id)}
            onMinimize={() => handleMinimizeWindow(win.id)}
            isMobile={isMobile}
          >
            {renderAppContent(win.id)}
          </WindowFrame>
        );
      })}

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenApp={handleOpenApp}
        onRestartSystem={handleRestartSystem}
      />

      {/* Bottom Taskbar */}
      <Taskbar
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onToggleWindow={handleToggleWindow}
        isStartOpen={isStartOpen}
        onToggleStart={() => setIsStartOpen(!isStartOpen)}
        onOpenApp={handleOpenApp}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onShowDesktop={handleShowDesktop}
      />
    </div>
  );
}

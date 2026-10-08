import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Minus, Square, X, Copy } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function WindowFrame({
  windowData,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  children,
  isMobile
}) {
  const { id, title, icon: Icon, isMaximized } = windowData;

  const [position, setPosition] = useState(windowData.position || { x: 50, y: 50 });
  const [size, setSize] = useState(windowData.size || { width: 780, height: 520 });
  const [maximized, setMaximized] = useState(isMaximized || isMobile);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, startPosX: 0, startPosY: 0 });

  const titleBarRef = useRef(null);

  // Responsive mobile auto maximize
  useEffect(() => {
    if (isMobile) {
      setMaximized(true);
    }
  }, [isMobile]);

  const handlePointerDown = (e) => {
    onFocus();
    // Only allow drag from titlebar and not from buttons
    if (e.target.closest('button') || maximized) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startPosX: position.x,
      startPosY: position.y
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    const newX = Math.max(10, Math.min(window.innerWidth - 100, dragStartRef.current.startPosX + deltaX));
    const newY = Math.max(10, Math.min(window.innerHeight - 100, dragStartRef.current.startPosY + deltaY));

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const toggleMaximize = (e) => {
    e?.stopPropagation();
    playSound('click');
    setMaximized(!maximized);
  };

  return (
    <div
      onClick={onFocus}
      style={{
        zIndex: windowData.zIndex,
        ...(maximized
          ? {
              left: 0,
              top: 0,
              width: '100vw',
              height: 'calc(100vh - 48px)', // above taskbar
              borderRadius: 0,
            }
          : {
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: `${Math.min(size.width, window.innerWidth - 40)}px`,
              height: `${Math.min(size.height, window.innerHeight - 80)}px`,
              borderRadius: '12px',
            }),
      }}
      className={`absolute flex flex-col overflow-hidden transition-all duration-150 select-none glass-window ${
        maximized ? '' : 'rounded-2xl'
      } ${
        isActive 
          ? 'ring-1 ring-white/30 shadow-2xl shadow-black/80' 
          : 'ring-1 ring-white/10 opacity-95'
      }`}
    >
      {/* Specular Top Glare */}
      <div className="glass-specular-top" />

      {/* Title Bar */}
      <div
        ref={titleBarRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={toggleMaximize}
        className={`h-10 px-3 flex items-center justify-between select-none border-b transition-colors cursor-default ${
          isActive 
            ? 'bg-white/10 border-white/20' 
            : 'bg-white/5 border-white/10'
        }`}
      >
        {/* App Title & Icon */}
        <div className="flex items-center gap-2.5 overflow-hidden">
          {Icon && (
            <div className="p-1 rounded-lg bg-white/10 text-blue-300 border border-white/15 shadow-sm shrink-0">
              <Icon size={15} />
            </div>
          )}
          <span className="text-xs font-semibold text-white/90 drop-shadow-sm truncate">
            {title}
          </span>
        </div>

        {/* Windows Controls (Minimize, Maximize, Close) */}
        <div className="flex items-center h-full -mr-3">
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound('minimize');
              onMinimize();
            }}
            title="Minimize"
            className="w-11 h-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/15 transition cursor-pointer"
          >
            <Minus size={13} />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={toggleMaximize}
            title={maximized ? "Restore" : "Maximize"}
            className="w-11 h-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/15 transition cursor-pointer"
          >
            {maximized ? <Copy size={12} className="rotate-90" /> : <Square size={12} />}
          </button>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound('click');
              onClose();
            }}
            title="Close"
            className="w-12 h-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-rose-600/90 transition cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 relative overflow-hidden bg-slate-950/40 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
}

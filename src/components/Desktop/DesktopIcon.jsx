import React, { useState, useRef, useEffect } from 'react';
import { playSound } from '../../utils/sound';

export default function DesktopIcon({
  icon: Icon,
  title,
  onClick,
  isSelected,
  onSelect,
  position,
  onPositionChange,
  color = 'text-blue-300'
}) {
  const [pos, setPos] = useState(position || { x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragDataRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });
  const hasMovedRef = useRef(false);

  // Sync external position changes (like Auto Arrange / Reset)
  useEffect(() => {
    if (position && !isDragging) {
      setPos(position);
    }
  }, [position, isDragging]);

  const handlePointerDown = (e) => {
    // Only left click / touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    
    e.stopPropagation();
    onSelect();

    setIsDragging(true);
    hasMovedRef.current = false;
    dragDataRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: pos.x,
      initialY: pos.y
    };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - dragDataRef.current.startX;
    const dy = e.clientY - dragDataRef.current.startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMovedRef.current = true;
    }

    // Keep within desktop boundaries
    const maxX = Math.max(20, window.innerWidth - 95);
    const maxY = Math.max(20, window.innerHeight - 150);

    const newX = Math.max(10, Math.min(maxX, dragDataRef.current.initialX + dx));
    const newY = Math.max(10, Math.min(maxY, dragDataRef.current.initialY + dy));

    setPos({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    if (hasMovedRef.current) {
      playSound('click');
      onPositionChange?.(pos);
    } else {
      // It was a click, not a drag
      playSound('click');
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    playSound('open');
    onClick();
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        touchAction: 'none'
      }}
      className={`absolute group flex flex-col items-center justify-center p-2 rounded-2xl select-none cursor-pointer w-20 sm:w-24 text-center transition-shadow ${
        isDragging
          ? 'z-30 scale-105 shadow-2xl opacity-90 cursor-grabbing'
          : 'z-10'
      } ${
        isSelected
          ? 'bg-white/20 border border-white/40 shadow-xl backdrop-blur-md'
          : 'hover:bg-white/10 hover:border-white/20 border border-transparent'
      }`}
    >
      <div className={`relative mb-1.5 p-3 rounded-2xl glass-desktop-icon transition-transform ${
        isDragging ? 'scale-110 shadow-2xl' : 'group-hover:scale-110'
      }`}>
        {/* Specular glass reflection */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl pointer-events-none" />
        <Icon size={28} className={color} />
      </div>
      <span className="text-[11px] sm:text-xs font-medium text-white tracking-wide leading-tight line-clamp-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] pointer-events-none">
        {title}
      </span>
    </div>
  );
}

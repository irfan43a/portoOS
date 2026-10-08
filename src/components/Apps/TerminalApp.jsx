import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Terminal as TerminalIcon, ShieldAlert } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function TerminalApp({ onClose, onOpenApp }) {
  const { personal, skills, projects, experiences } = portfolioData;

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Windows PowerShell [Version 10.0.22631.3007]\n(c) Microsoft Corporation. All rights reserved.\n\nKetik `help` untuk melihat daftar perintah yang tersedia.'
    }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isMatrixMode]);

  const handleCommand = (cmdText) => {
    const rawCmd = cmdText.trim();
    if (!rawCmd) return;

    setCommandHistory(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const parts = rawCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';

    switch (command) {
      case 'help':
        output = 
`Perintah yang tersedia:
  help            - Tampilkan daftar perintah bantuan
  about / bio     - Tampilkan informasi ringkas developer
  skills          - Tampilkan keahlian teknis (Tech Stack)
  projects        - Tampilkan daftar proyek portofolio
  experience      - Tampilkan riwayat karier profesional
  contact         - Tampilkan informasi email dan media sosial
  neofetch        - Tampilkan spesifikasi sistem & profil developer
  clear / cls     - Bersihkan layar terminal
  open <app>      - Buka aplikasi (about, projects, skills, notepad, settings)
  matrix          - Aktifkan / matikan animasi mode matrix
  whoami          - Tampilkan identitas pengguna saat ini
  date            - Tampilkan tanggal dan waktu lokal
  echo <teks>     - Cetak teks ke terminal
  sudo <cmd>      - Akses hak akses administrator
  exit            - Tutup jendela terminal`;
        break;

      case 'about':
      case 'bio':
        output = 
`[PROFILE]
Nama     : ${personal.name}
Role     : ${personal.title}
Lokasi   : ${personal.location}
Status   : ${personal.status}

Bio:
${personal.bio}`;
        break;

      case 'skills':
        output = 
`[FRONTEND]
${skills.frontend?.map(s => `  • ${s.name.padEnd(28)} [${'#'.repeat(Math.floor(s.level / 10))}${' '.repeat(10 - Math.floor(s.level / 10))}] ${s.level}%`).join('\n') || ''}

[BACKEND & DATABASE]
${skills.backend?.map(s => `  • ${s.name.padEnd(28)} [${'#'.repeat(Math.floor(s.level / 10))}${' '.repeat(10 - Math.floor(s.level / 10))}] ${s.level}%`).join('\n') || ''}

[TOOLS & COMPUTER NETWORKING]
${skills.toolsNetworking?.map(s => `  • ${s.name.padEnd(28)} [${'#'.repeat(Math.floor(s.level / 10))}${' '.repeat(10 - Math.floor(s.level / 10))}] ${s.level}%`).join('\n') || ''}`;
        break;

      case 'projects':
        output = projects.map((p, idx) => 
`[${idx + 1}] ${p.title} (${p.category})
    Deskripsi : ${p.description}
    Teknologi : ${p.tags.join(', ')}
    Demo      : ${p.demoUrl}
`).join('\n');
        break;

      case 'experience':
        output = experiences.map(e => 
`* ${e.role} @ ${e.company} (${e.period})
  Lokasi: ${e.location}
  Detail: ${e.description}
  Stack : ${e.technologies.join(', ')}
`).join('\n');
        break;

      case 'contact':
        output = 
`[CONTACT INFORMATION]
Nama     : ${personal.name}
Telepon  : ${personal.phone}
WhatsApp : ${personal.whatsappUrl}
Email    : ${personal.email}
LinkedIn : ${personal.linkedin}
GitHub   : ${personal.github}
Lokasi   : ${personal.location}`;
        break;

      case 'neofetch':
        output = 
`       _.-;;-._          User: visitor@portfolio-pc
'-..-'|   ||   |         OS: Windows 11 Fluent Edition
'-..-'|_.-;;-._|         Kernel: React 19 / Vite 8
'-..-'|   ||   |         Shell: PowerShell Core 7.4
'-..-'|_.-''-._|         Uptime: 99.99% Online
                         Developer: ${personal.name}
                         Focus: Frontend Development (React / TS / Next)
                         Company: IDX Consulting (IT Consultant)
                         Terminal Theme: PowerShell Modern Dark
                         Memory: 16384MB / 32768MB (42% used)`;
        break;

      case 'matrix':
        setIsMatrixMode(!isMatrixMode);
        output = isMatrixMode ? 'Mode Matrix dinonaktifkan.' : 'Mode Matrix diaktifkan! Entering the cyberspace...';
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        return;

      case 'open':
        if (args.length === 0) {
          output = 'Gunakan: open <app_name> (contoh: open projects, open notepad, open about, open skills, open settings)';
        } else {
          const appName = args[0].toLowerCase();
          if (['about', 'projects', 'skills', 'experience', 'notepad', 'settings', 'minesweeper', 'recycle'].includes(appName)) {
            playSound('open');
            onOpenApp?.(appName);
            output = `Membuka aplikasi '${appName}'...`;
          } else {
            output = `Aplikasi '${appName}' tidak ditemukan. Tersedia: about, projects, skills, notepad, settings, minesweeper.`;
          }
        }
        break;

      case 'whoami':
        output = 'visitor\\guest_recruiter (Security Clearance: Level 5 - Full Portfolio Access)';
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'echo':
        output = args.join(' ');
        break;

      case 'sudo':
        output = 'Access Granted: Anda memiliki otorisasi penuh untuk merekrut atau berkolaborasi dengan developer ini! 🚀';
        break;

      case 'exit':
        onClose?.();
        return;

      default:
        output = `'${command}' tidak dikenali sebagai perintah internal atau eksternal. Ketik 'help' untuk panduan.`;
        break;
    }

    setHistory(prev => [
      ...prev,
      { type: 'cmd', text: `PS C:\\Users\\Visitor> ${rawCmd}` },
      { type: 'output', text: output }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      playSound('click');
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <div 
      className={`h-full flex flex-col font-mono text-xs sm:text-sm select-text ${
        isMatrixMode 
          ? 'bg-black/90 text-emerald-400' 
          : 'bg-black/40 text-slate-200 backdrop-blur-xl'
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal tab bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 text-slate-200 border border-white/15 shadow-sm">
            <TerminalIcon size={13} className="text-blue-300" />
            <span className="text-[11px] font-semibold">PowerShell Core</span>
          </div>
          <span className="text-[11px] text-slate-400">v7.4 Glass Edition</span>
        </div>
        <div className="text-[11px] text-slate-300">
          Administrator: Windows Terminal
        </div>
      </div>

      {/* Terminal content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {history.map((item, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed">
            {item.type === 'cmd' ? (
              <span className="text-yellow-400 font-semibold">{item.text}</span>
            ) : item.type === 'system' ? (
              <span className="text-slate-400">{item.text}</span>
            ) : (
              <span className={isMatrixMode ? 'text-emerald-400' : 'text-slate-300'}>
                {item.text}
              </span>
            )}
          </div>
        ))}

        {/* Current Prompt */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-blue-400 font-semibold shrink-0">PS C:\Users\Visitor&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm p-0 m-0"
            autoFocus
            spellCheck={false}
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

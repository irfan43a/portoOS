import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  FileText, 
  Send, 
  Download, 
  CheckCircle, 
  Copy, 
  Mail, 
  MessageSquareQuote,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/sound';

export default function NotepadApp() {
  const { personal } = portfolioData;

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Diskusi Peluang Kerja & Kolaborasi');
  const [message, setMessage] = useState(
`Halo ${personal.name},

Saya tertarik dengan portofolio Anda dan ingin mendiskusikan peluang kolaborasi terkait pengembangan sistem / aplikasi web.

Mari kita jadwalkan waktu untuk berdiskusi lebih lanjut!

Salam hangat,`
  );

  const [status, setStatus] = useState(null); // 'sending' | 'sent'

  const handleSend = (e) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) {
      playSound('error');
      alert('Mohon lengkapi Nama, Email, dan Pesan sebelum mengirim.');
      return;
    }

    playSound('success');
    setStatus('sent');

    // Confetti explosion
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    // Open mailto link
    const mailto = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Dari: ${senderName} (${senderEmail})\n\n${message}`
    )}`;
    window.open(mailto, '_blank');
  };

  const handleSaveFile = () => {
    playSound('click');
    const fullNote = 
`CATATAN KONTAK / PESAN
Kepada: ${personal.name} (${personal.email})
Dari: ${senderName || 'Pengunjung Portofolio'} <${senderEmail || 'n/a'}>
Subjek: ${subject}
Tanggal: ${new Date().toLocaleString()}

PESAN:
${message}
`;
    const blob = new Blob([fullNote], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pesan_Untuk_${personal.name.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyEmail = () => {
    playSound('click');
    navigator.clipboard.writeText(personal.email);
    alert(`Email ${personal.email} berhasil disalin ke clipboard!`);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950/30 text-slate-200 font-sans select-text overflow-hidden backdrop-blur-md">
      {/* Menu Bar */}
      <div className="flex items-center gap-4 px-3 py-1.5 bg-white/5 border-b border-white/10 text-xs text-slate-300 select-none shrink-0">
        <span className="hover:text-white cursor-pointer px-2 py-0.5 rounded-lg hover:bg-white/10 transition" onClick={handleSaveFile}>
          File (Simpan .txt)
        </span>
        <span className="hover:text-white cursor-pointer px-2 py-0.5 rounded-lg hover:bg-white/10 transition" onClick={handleCopyEmail}>
          Salin Email
        </span>
        <a 
          href={personal.whatsappUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="text-emerald-300 hover:text-emerald-200 cursor-pointer px-2 py-0.5 rounded-lg hover:bg-white/10 transition flex items-center gap-1"
        >
          <MessageCircle size={12} /> WhatsApp ({personal.phone})
        </a>
        <span className="hover:text-white cursor-pointer px-2 py-0.5 rounded-lg hover:bg-white/10 transition hidden sm:inline">
          Format (Word Wrap: On)
        </span>
      </div>

      {/* Main Notepad Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Header Note Info */}
          <div className="p-3.5 rounded-2xl glass-card flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-300 shrink-0" />
              <span>Email tujuan: <strong className="text-white drop-shadow-sm">{personal.email}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={personal.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="px-2.5 py-1 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white text-[11px] font-medium flex items-center gap-1.5 cursor-pointer transition border border-emerald-400/30 shadow-sm"
              >
                <MessageCircle size={13} /> Chat WhatsApp
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 rounded-xl glass-btn text-slate-200 text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <Copy size={12} /> Salin Email
              </button>
            </div>
          </div>

          {status === 'sent' && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 backdrop-blur-md">
              <CheckCircle size={16} className="shrink-0 text-emerald-400" />
              <span>Email client Anda telah dibuka dengan draf pesan ini. Terima kasih telah menghubungi!</span>
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                  Email Anda *
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="budi@company.com"
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs text-white focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                Subjek Pesan
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subjek email..."
                className="w-full px-3 py-2 rounded-xl glass-input text-xs text-white focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1 flex items-center justify-between">
                <span>Isi Pesan (Notepad Editor)</span>
                <span className="text-[10px] text-slate-400 lowercase font-mono">
                  {message.length} karakter
                </span>
              </label>
              <textarea
                rows={9}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3.5 rounded-2xl glass-input text-xs text-white font-mono leading-relaxed focus:outline-none resize-none shadow-inner"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleSaveFile}
                className="px-4 py-2 rounded-xl glass-btn text-slate-200 text-xs font-medium flex items-center gap-2 transition cursor-pointer"
              >
                <Download size={14} /> Unduh sebagai Catatan (.txt)
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 border border-blue-400/40 shadow-lg shadow-blue-600/30 transition cursor-pointer"
              >
                <Send size={14} /> Kirim Pesan
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notepad Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-blue-600/60 backdrop-blur-md border-t border-white/10 text-white text-[11px] font-mono select-none shrink-0">
        <div className="flex items-center gap-4">
          <span>Ln {message.split('\n').length}, Col {message.length}</span>
          <span>100%</span>
          <span>Windows (CRLF)</span>
        </div>
        <div>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}

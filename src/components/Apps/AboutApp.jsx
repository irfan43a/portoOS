import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  Mail, 
  MapPin, 
  Download, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Coffee,
  Code,
  MessageCircle,
  Phone
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons/SocialIcons';
import { playSound } from '../../utils/sound';

export default function AboutApp({ onOpenApp }) {
  const { personal, experiences, education, skills } = portfolioData;

  const handleDownloadCV = () => {
    playSound('click');
    const skillsList = [
      ...skills.frontend.map(s => s.name),
      ...skills.backend.map(s => s.name),
      ...skills.toolsNetworking.map(s => s.name)
    ].join(', ');

    const blob = new Blob([
      `============================================================\n` +
      `CURRICULUM VITAE - ${personal.name.toUpperCase()}\n` +
      `============================================================\n\n` +
      `Posisi/Peran: ${personal.title}\n` +
      `Telepon / WhatsApp: ${personal.phone} (${personal.whatsappUrl})\n` +
      `Email: ${personal.email}\n` +
      `LinkedIn: ${personal.linkedin}\n` +
      `Domisili: ${personal.location}\n\n` +
      `------------------------------------------------------------\n` +
      `RINGKASAN PROFIL\n` +
      `------------------------------------------------------------\n` +
      `${personal.bio}\n\n` +
      `------------------------------------------------------------\n` +
      `KEAHLIAN UTAMA & TECH STACK\n` +
      `------------------------------------------------------------\n` +
      `${skillsList}\n\n` +
      `------------------------------------------------------------\n` +
      `PENGALAMAN KERJA\n` +
      `------------------------------------------------------------\n` +
      experiences.map(e => `[${e.period}] ${e.role} - ${e.company} (${e.location})\n${e.description}\n`).join('\n') +
      `\n------------------------------------------------------------\n` +
      `PENDIDIKAN\n` +
      `------------------------------------------------------------\n` +
      education.map(ed => `[${ed.period}] ${ed.degree} - ${ed.institution}\n${ed.description}\n`).join('\n') +
      `\n============================================================\n` +
      `Dokumen dibuat melalui Windows 11 Portfolio - ${personal.name}\n` +
      `============================================================\n`
    ], { type: 'text/plain;charset=utf-8' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_${personal.name.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full overflow-y-auto p-6 text-slate-200 select-text">
      {/* Top Banner Profile */}
      <div className="relative rounded-2xl p-6 glass-card mb-6 shadow-2xl overflow-hidden">
        <div className="glass-specular-top" />
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative group">
            <img 
              src={personal.avatar} 
              alt={personal.name} 
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-white/30 shadow-xl shadow-blue-500/20 transition-transform group-hover:scale-105"
            />
            <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 font-bold p-1 rounded-full border-2 border-slate-900 shadow">
              <Sparkles size={16} />
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {personal.status}
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight m-0 mb-1 drop-shadow-sm">
              {personal.name}
            </h1>
            <p className="text-blue-300 font-medium text-sm sm:text-base m-0 mb-2">
              {personal.title}
            </p>
            <p className="text-slate-300 text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-1 m-0">
              <MapPin size={14} className="text-rose-400 shrink-0" />
              {personal.location}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-4">
              <button 
                onClick={handleDownloadCV}
                className="px-4 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm flex items-center gap-2 border border-blue-400/40 shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
              >
                <Download size={16} />
                Unduh CV / Resume
              </button>
              <a 
                href={personal.whatsappUrl} 
                target="_blank" 
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="px-3.5 py-2 rounded-xl bg-emerald-600/85 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium flex items-center gap-2 border border-emerald-400/40 shadow-lg shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              {onOpenApp && (
                <button 
                  onClick={() => { playSound('open'); onOpenApp('notepad'); }}
                  className="px-4 py-2 rounded-xl glass-btn text-slate-100 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Mail size={16} className="text-blue-300" />
                  Kirim Pesan
                </button>
              )}
              <a 
                href={personal.github} 
                target="_blank" 
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="p-2 rounded-xl glass-btn text-slate-200 transition-all hover:text-white"
                title="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a 
                href={personal.linkedin} 
                target="_blank" 
                rel="noreferrer"
                onClick={() => playSound('click')}
                className="p-2 rounded-xl glass-btn text-blue-300 transition-all hover:text-white"
                title="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {personal.stats.map((stat, i) => (
          <div 
            key={i} 
            className="p-4 rounded-xl glass-card text-center transition-all group"
          >
            <div className="text-xl sm:text-2xl font-extrabold text-blue-300 drop-shadow-[0_0_12px_rgba(147,197,253,0.5)]">
              {stat.value}
            </div>
            <div className="text-[11px] sm:text-xs text-slate-300 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Bio Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-5">
          <div className="p-5 rounded-2xl glass-card">
            <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-3">
              <Coffee size={18} className="text-amber-400" />
              Tentang Saya
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed mb-3">
              {personal.bio}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Saya senang memecahkan masalah kompleks dengan pendekatan arsitektur yang bersih, modular, dan terukur. Selalu bersemangat mempelajari teknologi baru dan menerapkannya dalam produk nyata yang memberikan dampak positif.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-card">
            <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-purple-300" />
              Prinsip Kerja & Filosofi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 size={16} className="text-blue-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Clean & Maintainable Code</span>
                  <span className="text-xs text-slate-300">Kode yang mudah dibaca dan dikembangkan oleh tim.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 size={16} className="text-blue-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Performance First</span>
                  <span className="text-xs text-slate-300">Optimasi waktu loading dan efisiensi konsumsi memori.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 size={16} className="text-blue-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Pixel Perfection</span>
                  <span className="text-xs text-slate-300">Ketelitian visual dan mikrointeraksi antarmuka pengguna.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 size={16} className="text-blue-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Continuous Learning</span>
                  <span className="text-xs text-slate-300">Eksplorasi ekosistem AI, modern web stack, dan cloud.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl glass-card">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Informasi Kontak
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-300 block mb-0.5">Telepon & WhatsApp</span>
                <a href={personal.whatsappUrl} target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline font-mono">
                  {personal.phone}
                </a>
              </div>
              <div>
                <span className="text-slate-300 block mb-0.5">Email</span>
                <a href={`mailto:${personal.email}`} className="text-blue-300 hover:underline font-mono">
                  {personal.email}
                </a>
              </div>
              <div>
                <span className="text-slate-300 block mb-0.5">LinkedIn</span>
                <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-blue-300 hover:underline font-mono">
                  linkedin.com/in/irfanabidin43/
                </a>
              </div>
              <div>
                <span className="text-slate-300 block mb-0.5">Domisili</span>
                <span className="text-slate-200">{personal.location}</span>
              </div>
              <div>
                <span className="text-slate-300 block mb-0.5">Status Ketersediaan</span>
                <span className="text-emerald-300 font-medium">Open to Opportunities (IDX Consulting / Freelance)</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card text-center border-blue-400/30">
            <Briefcase size={28} className="mx-auto text-blue-300 mb-2" />
            <h4 className="text-white text-sm font-semibold mb-1">Mencari Kolaborasi?</h4>
            <p className="text-xs text-slate-300 mb-3">
              Siap membantu merealisasikan ide aplikasi web modern Anda!
            </p>
            {onOpenApp && (
              <button
                onClick={() => { playSound('open'); onOpenApp('projects'); }}
                className="w-full py-2 px-3 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-medium border border-blue-400/40 shadow transition cursor-pointer"
              >
                Lihat Proyek Saya
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

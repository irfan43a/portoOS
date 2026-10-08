import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ScrollText
} from 'lucide-react';

export default function ExperienceApp() {
  const { experiences, education, certifications } = portfolioData;

  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-950/20 text-slate-200 select-text backdrop-blur-sm">
      {/* Top Banner */}
      <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl glass-card relative overflow-hidden">
        <div className="glass-specular-top" />
        <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/20">
          <ScrollText size={22} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white m-0 drop-shadow-sm">Riwayat Pengalaman & Rekam Jejak</h2>
          <p className="text-xs text-slate-300 m-0">Catatan karier profesional, perjalanan akademik, dan sertifikasi keahlian</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work Experience Timeline (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-2">
            <Briefcase size={16} className="text-emerald-300" />
            Pengalaman Kerja
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-emerald-400 before:via-blue-400 before:to-purple-400">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="relative p-5 rounded-2xl glass-card transition-all group overflow-hidden"
              >
                <div className="glass-specular-top" />
                {/* Timeline node */}
                <span className="absolute -left-[27px] top-6 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-emerald-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors m-0 drop-shadow-sm">
                    {exp.role}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-mono font-medium flex items-center gap-1 shadow-sm">
                    <Calendar size={11} /> {exp.period}
                  </span>
                </div>

                <div className="text-xs text-slate-300 font-medium mb-3 flex items-center gap-2">
                  <span className="text-blue-300 font-semibold">{exp.company}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin size={11} className="text-rose-400" /> {exp.location}
                  </span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed mb-3">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                  {exp.technologies.map(tech => (
                    <span 
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-white/10 text-[11px] text-slate-200 border border-white/10 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications (1 col) */}
        <div className="space-y-6">
          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <GraduationCap size={16} className="text-blue-300" />
              Pendidikan
            </h3>

            {education.map((edu, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl glass-card relative overflow-hidden"
              >
                <div className="glass-specular-top" />
                <h4 className="text-sm font-bold text-white mb-1 drop-shadow-sm">{edu.degree}</h4>
                <div className="text-xs text-blue-300 font-medium mb-1">{edu.institution}</div>
                <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2">
                  <span>{edu.period}</span>
                  <span className="text-emerald-300 font-bold">{edu.grade}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed m-0 border-t border-white/10 pt-2">
                  {edu.highlights}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award size={16} className="text-amber-300" />
              Sertifikasi Profesional
            </h3>

            <div className="space-y-2.5">
              {certifications.map((cert, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl glass-card flex items-start gap-2.5"
                >
                  <CheckCircle2 size={15} className="text-amber-300 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-100 block leading-tight">
                      {cert.name}
                    </span>
                    <span className="text-[10px] text-slate-300 font-mono mt-0.5 block">
                      Tahun: {cert.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  FolderGit2, 
  ExternalLink, 
  Search, 
  Filter, 
  Layers, 
  Star,
  CheckCircle,
  Eye
} from 'lucide-react';
import { GithubIcon } from '../Icons/SocialIcons';
import { playSound } from '../../utils/sound';

export default function ProjectsApp() {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(projects.map(p => p.category))];
    return cats;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="h-full flex flex-col bg-slate-950/20 text-slate-200 select-text overflow-hidden backdrop-blur-sm">
      {/* Top Bar / Filter Controls */}
      <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/20">
            <FolderGit2 size={20} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white m-0 drop-shadow-sm">Koleksi Proyek Unggulan</h2>
            <p className="text-xs text-slate-300 m-0">Daftar implementasi sistem, aplikasi web, dan tools inovatif</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari proyek atau teknologi..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder-slate-300/70 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-4 py-2.5 border-b border-white/5 bg-black/10 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
        <Filter size={14} className="text-slate-300 mr-1 shrink-0" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              playSound('click');
              setSelectedCategory(cat);
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer shrink-0 ${
              selectedCategory === cat
                ? 'bg-blue-600/90 text-white shadow-md border border-blue-400/40 shadow-blue-500/20'
                : 'glass-btn text-slate-200 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {filteredProjects.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-slate-300">
            <Layers size={40} className="mb-2 text-slate-500" />
            <p className="text-sm">Tidak ada proyek yang sesuai dengan pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl glass-card overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-white/30 hover:-translate-y-1 relative"
              >
                {/* Project Image */}
                <div className="relative h-44 overflow-hidden bg-slate-950/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {project.featured && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-blue-600/90 text-white text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-md border border-blue-400/40">
                      <Star size={11} fill="currentColor" /> FEATURED
                    </span>
                  )}

                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-slate-200 text-[10px] font-medium border border-white/20">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-2 line-clamp-1 drop-shadow-sm">
                      {project.title}
                    </h3>
                    <p className="text-slate-200 text-xs leading-relaxed line-clamp-3 mb-3">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1 mb-3">
                      {project.highlights.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-slate-200 font-mono border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                    <button
                      onClick={() => {
                        playSound('open');
                        setActiveProjectModal(project);
                      }}
                      className="flex-1 py-1.5 px-2 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-medium flex items-center justify-center gap-1.5 border border-blue-400/30 transition cursor-pointer shadow-md"
                    >
                      <Eye size={13} />
                      Detail Proyek
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => playSound('click')}
                        className="p-1.5 rounded-xl glass-btn text-slate-200 transition hover:text-white"
                        title="GitHub Repository"
                      >
                        <GithubIcon size={15} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => playSound('click')}
                        className="p-1.5 rounded-xl glass-btn text-blue-300 transition hover:text-white"
                        title="Live Demo"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {activeProjectModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-window rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200 relative">
            <div className="glass-specular-top" />
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs text-blue-300 font-semibold uppercase tracking-wider block mb-1">
                  {activeProjectModal.category}
                </span>
                <h3 className="text-lg font-bold text-white m-0 drop-shadow-sm">
                  {activeProjectModal.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  playSound('click');
                  setActiveProjectModal(null);
                }}
                className="w-7 h-7 rounded-lg glass-btn text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <img
              src={activeProjectModal.image}
              alt={activeProjectModal.title}
              className="w-full h-52 object-cover rounded-xl mb-4 border border-white/10"
            />

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {activeProjectModal.description}
            </p>

            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
              Fitur Kunci & Keunggulan:
            </h4>
            <div className="space-y-1.5 mb-4">
              {activeProjectModal.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
              Teknologi yang Digunakan:
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {activeProjectModal.tags.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-mono">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10 mt-auto">
              {activeProjectModal.githubUrl && (
                <a
                  href={activeProjectModal.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSound('click')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2 border border-white/10 transition"
                >
                  <GithubIcon size={15} /> Source Code
                </a>
              )}
              {activeProjectModal.demoUrl && (
                <a
                  href={activeProjectModal.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSound('click')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-2 transition"
                >
                  <ExternalLink size={15} /> Kunjungi Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


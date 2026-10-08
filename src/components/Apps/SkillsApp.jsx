import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  Cpu, 
  Search, 
  CheckCircle2, 
  Layers, 
  Server, 
  Terminal, 
  Wrench, 
  Flame,
  ShieldCheck
} from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function SkillsApp() {
  const { skills } = portfolioData;
  const [filterQuery, setFilterQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua Kategori', icon: Layers },
    { id: 'frontend', name: 'Frontend Engineering', icon: Flame, list: skills.frontend || [] },
    { id: 'backend', name: 'Backend & Databases', icon: Server, list: skills.backend || [] },
    { id: 'toolsNetworking', name: 'Tools, IT & Networking', icon: Wrench, list: skills.toolsNetworking || [] },
  ];

  const getFilteredItems = (list) => {
    if (!filterQuery) return list;
    return list.filter(item => 
      item.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
  };

  return (
    <div className="h-full flex flex-col bg-slate-950/20 text-slate-200 select-text overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/20">
            <Cpu size={22} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white m-0 drop-shadow-sm">System Capabilities & Tech Stack</h2>
            <p className="text-xs text-slate-300 m-0">Spesifikasi keahlian teknis dan tingkat penguasaan alat</p>
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Cari keahlian teknis..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder-slate-300/70 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-2 border-b border-white/5 bg-black/10 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
        {categories.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playSound('click');
                setActiveTab(tab.id);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? 'bg-purple-600/90 text-white shadow-md border border-purple-400/40 shadow-purple-500/20'
                  : 'glass-btn text-slate-200 hover:text-white'
              }`}
            >
              <Icon size={14} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Skills Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {categories
          .filter(cat => cat.id !== 'all')
          .filter(cat => activeTab === 'all' || activeTab === cat.id)
          .map(cat => {
            const items = getFilteredItems(cat.list);
            if (items.length === 0) return null;

            return (
              <div key={cat.id} className="p-5 rounded-2xl glass-card relative overflow-hidden">
                <div className="glass-specular-top" />
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <cat.icon size={18} className="text-purple-300" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider m-0 drop-shadow-sm">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-slate-300 ml-auto">
                    {items.length} Modules
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((skill, index) => (
                    <div 
                      key={index}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/40 hover:bg-white/10 transition-all group shadow-sm"
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-100 group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          {skill.name}
                        </span>
                        <span className="font-mono text-purple-300 font-bold drop-shadow-[0_0_8px_rgba(216,180,254,0.4)]">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Glass Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-black/40 border border-white/10 overflow-hidden p-0.5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        {/* System Diagnostics Footer Card */}
        <div className="p-4 rounded-xl glass-card border-purple-400/30 flex items-center gap-3">
          <ShieldCheck size={28} className="text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">Tech Stack Health: 100% Operational</span>
            <span className="text-slate-300">Arsitektur kode teruji, standar kode modern dengan TypeScript, ESLint, dan Best Practices.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

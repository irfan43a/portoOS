import React, { useState } from 'react';
import { Trash2, RefreshCw, FileCode, FileImage, FileText, CheckCircle2 } from 'lucide-react';
import { playSound } from '../../utils/sound';

export default function RecycleBinApp() {
  const [items, setItems] = useState([
    { id: 1, name: 'legacy_jquery_spaghetti.js', size: '240 KB', deletedDate: 'Kemarin, 22:14', type: 'code' },
    { id: 2, name: 'overcomplicated_redux_boilerplate.ts', size: '1.2 MB', deletedDate: '3 hari lalu', type: 'code' },
    { id: 3, name: 'coffee_cups_final_v2_FINAL.png', size: '4.8 MB', deletedDate: 'Minggu lalu', type: 'image' },
    { id: 4, name: 'unreproducible_heisenbug_notes.txt', size: '12 KB', deletedDate: 'Bulan lalu', type: 'text' },
    { id: 5, name: 'node_modules_accidental_commit', size: '384 MB', deletedDate: '2 bulan lalu', type: 'code' },
  ]);

  const [isEmpty, setIsEmpty] = useState(false);

  const handleEmptyBin = () => {
    playSound('error');
    if (window.confirm('Apakah Anda yakin ingin mengosongkan Recycle Bin secara permanen?')) {
      playSound('success');
      setItems([]);
      setIsEmpty(true);
    }
  };

  const handleRestore = () => {
    playSound('click');
    alert('Item direstore ke arsip kenangan masa lalu pengembang!');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'code': return <FileCode size={18} className="text-yellow-400" />;
      case 'image': return <FileImage size={18} className="text-purple-400" />;
      default: return <FileText size={18} className="text-blue-400" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950/20 text-slate-200 select-text backdrop-blur-sm">
      {/* Action Bar */}
      <div className="p-3 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Trash2 size={16} className="text-rose-400" />
          <span className="font-semibold text-white drop-shadow-sm">Recycle Bin</span>
          <span className="text-slate-300 text-[11px]">({items.length} item)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestore}
            disabled={items.length === 0}
            className="px-3 py-1.5 rounded-xl glass-btn disabled:opacity-40 text-slate-200 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={12} /> Pulihkan Semua
          </button>
          <button
            onClick={handleEmptyBin}
            disabled={items.length === 0}
            className="px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 disabled:opacity-40 text-white text-xs flex items-center gap-1.5 border border-rose-400/30 transition cursor-pointer shadow-md"
          >
            <Trash2 size={12} /> Kosongkan Recycle Bin
          </button>
        </div>
      </div>

      {/* Item List */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <CheckCircle2 size={42} className="text-emerald-400 mb-2" />
            <p className="text-sm font-medium text-white">Recycle Bin Kosong</p>
            <p className="text-xs text-slate-400">Kode bersih, bebas dari bug masa lalu!</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="grid grid-cols-12 px-3 py-1 text-[11px] font-semibold text-slate-400 border-b border-white/5 uppercase">
              <span className="col-span-6">Nama File</span>
              <span className="col-span-3">Tanggal Dihapus</span>
              <span className="col-span-3 text-right">Ukuran</span>
            </div>

            {items.map(item => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center px-3 py-2 rounded-xl hover:bg-white/5 transition text-xs border border-transparent hover:border-white/5"
              >
                <div className="col-span-6 flex items-center gap-2.5 truncate pr-2">
                  {getIcon(item.type)}
                  <span className="font-mono text-slate-200 truncate">{item.name}</span>
                </div>
                <div className="col-span-3 text-slate-400 text-[11px]">
                  {item.deletedDate}
                </div>
                <div className="col-span-3 text-right font-mono text-slate-400 text-[11px]">
                  {item.size}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

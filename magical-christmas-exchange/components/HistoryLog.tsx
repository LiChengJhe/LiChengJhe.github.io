import React from 'react';
import { DrawResult, GiftType } from '../types';
import { Ghost, Heart } from 'lucide-react';

interface HistoryLogProps {
  results: DrawResult[];
  type: GiftType;
}

const HistoryLog: React.FC<HistoryLogProps> = ({ results, type }) => {
  const Icon = type === 'ANGEL' ? Heart : Ghost;
  const colorClass = type === 'ANGEL' ? 'text-yellow-400' : 'text-red-400';
  const borderClass = type === 'ANGEL' ? 'border-yellow-400/30' : 'border-red-400/30';

  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl border ${borderClass} overflow-hidden flex flex-col h-96`}>
      <div className={`p-4 ${type === 'ANGEL' ? 'bg-yellow-900/20' : 'bg-red-900/20'} border-b ${borderClass} flex items-center gap-2`}>
        <Icon className={`w-5 h-5 ${colorClass}`} />
        <h3 className={`font-bold ${colorClass} uppercase tracking-wider`}>
          {type} Results
        </h3>
        <span className="ml-auto text-xs text-slate-400">{results.length} pairs</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-2 scroll-smooth">
        {results.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 italic text-sm">
            <p>No magic happening yet...</p>
          </div>
        ) : (
          results.slice().reverse().map((res, idx) => (
            <div 
              key={`${res.drawer}-${res.giftType}`}
              className="flex items-center justify-between p-3 bg-slate-700/40 rounded-lg animate-fade-in hover:bg-slate-700/60 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-sm text-slate-300 font-medium">{res.drawer}</span>
                <span className="text-[10px] text-slate-500 uppercase">Received</span>
              </div>
              
              <div className="flex-1 border-b border-dashed border-slate-600 mx-3 opacity-30"></div>
              
              <div className="flex flex-col items-end">
                <span className={`text-sm font-bold ${colorClass}`}>{res.receiver}</span>
                <span className="text-[10px] text-slate-500 uppercase">'s Gift</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryLog;
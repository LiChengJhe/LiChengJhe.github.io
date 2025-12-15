import React, { useState, useEffect } from 'react';
import { GiftType, GamePhase, DrawSequenceState, DrawResult, Participant } from './types';
import { PARTICIPANTS_LIST } from './constants';
import { generateDrawSequence } from './utils/gameLogic';
import Snowfall from './components/Snowfall';
import Card from './components/Card';
import HistoryLog from './components/HistoryLog';
import { Sparkles, Play, SkipForward, RotateCcw, TreePine, Ghost } from 'lucide-react';

const App: React.FC = () => {
  // Global App State
  const [activeTab, setActiveTab] = useState<GiftType>('ANGEL');
  const [angelSequence, setAngelSequence] = useState<DrawSequenceState | null>(null);
  const [devilSequence, setDevilSequence] = useState<DrawSequenceState | null>(null);
  
  const [angelResults, setAngelResults] = useState<DrawResult[]>([]);
  const [devilResults, setDevilResults] = useState<DrawResult[]>([]);

  // Derived state helper
  const currentSequence = activeTab === 'ANGEL' ? angelSequence : devilSequence;
  const isFinished = currentSequence && currentSequence.currentIndex >= currentSequence.sequence.length;
  const hasStarted = currentSequence !== null;

  // --- Actions ---

  const startPhase = (type: GiftType) => {
    const sequence = generateDrawSequence(PARTICIPANTS_LIST);
    const initialState: DrawSequenceState = {
      sequence: sequence,
      currentIndex: 0,
      isRevealed: false
    };

    if (type === 'ANGEL') {
      setAngelSequence(initialState);
      setAngelResults([]);
    } else {
      setDevilSequence(initialState);
      setDevilResults([]);
    }
  };

  const handleReveal = () => {
    if (!currentSequence || isFinished) return;

    if (activeTab === 'ANGEL') {
      setAngelSequence({ ...currentSequence, isRevealed: true });
      
      // Record result
      const drawer = currentSequence.sequence[currentSequence.currentIndex];
      // Logic: drawer takes next person in array. If last person, take first person.
      const targetIndex = (currentSequence.currentIndex + 1) % currentSequence.sequence.length;
      const target = currentSequence.sequence[targetIndex];

      setAngelResults(prev => [...prev, {
        drawer,
        receiver: target,
        giftType: 'ANGEL',
        timestamp: Date.now()
      }]);
    } else {
      setDevilSequence({ ...currentSequence, isRevealed: true });
       // Record result
       const drawer = currentSequence.sequence[currentSequence.currentIndex];
       const targetIndex = (currentSequence.currentIndex + 1) % currentSequence.sequence.length;
       const target = currentSequence.sequence[targetIndex];
 
       setDevilResults(prev => [...prev, {
         drawer,
         receiver: target,
         giftType: 'DEVIL',
         timestamp: Date.now()
       }]);
    }
  };

  const nextTurn = () => {
    if (!currentSequence) return;
    
    const nextState = {
      ...currentSequence,
      currentIndex: currentSequence.currentIndex + 1,
      isRevealed: false
    };

    if (activeTab === 'ANGEL') setAngelSequence(nextState);
    else setDevilSequence(nextState);
  };

  const resetAll = () => {
    if(confirm("Are you sure you want to reset everything? All data will be lost.")) {
      setAngelSequence(null);
      setDevilSequence(null);
      setAngelResults([]);
      setDevilResults([]);
      setActiveTab('ANGEL');
    }
  };

  // --- Render Helpers ---

  const renderActiveGame = () => {
    if (!currentSequence) {
      return (
        <div className="flex flex-col items-center justify-center h-96 animate-fade-in text-center px-4">
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-600 backdrop-blur-sm max-w-lg w-full shadow-2xl">
            <h2 className="text-3xl font-christmas text-white mb-4">
              {activeTab === 'ANGEL' ? 'Angel Gift Round' : 'Devil Gift Round'}
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              {activeTab === 'ANGEL' 
                ? "Time to exchange the Angel Gifts ($888). The magic will decide who you give your blessing to!" 
                : "Prepare for chaos! The Devil Gift round (No Limit) is about to begin. Who will you prank?"}
            </p>
            <button
              onClick={() => startPhase(activeTab)}
              className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                activeTab === 'ANGEL' 
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:shadow-yellow-500/50' 
                  : 'bg-gradient-to-r from-red-600 to-rose-700 text-white hover:shadow-red-600/50'
              }`}
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>Start Magic Draw</span>
              <div className="absolute inset-0 rounded-full bg-white/20 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      );
    }

    if (isFinished) {
      return (
        <div className="flex flex-col items-center justify-center h-96 animate-fade-in text-center">
          <div className="bg-slate-800/80 p-8 rounded-2xl border border-green-500/30 backdrop-blur-md max-w-md w-full">
            <h2 className="text-4xl font-christmas text-green-400 mb-2">Round Complete!</h2>
            <p className="text-slate-300 mb-6">All gifts have been exchanged for this round.</p>
            {activeTab === 'ANGEL' && !devilSequence ? (
              <button
                onClick={() => setActiveTab('DEVIL')}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                Go to Devil Round <SkipForward className="w-4 h-4" />
              </button>
            ) : (
              <div className="text-yellow-400 font-bold">Check the results board!</div>
            )}
          </div>
        </div>
      );
    }

    // Active Play State
    const currentDrawerName = currentSequence.sequence[currentSequence.currentIndex];
    const targetIndex = (currentSequence.currentIndex + 1) % currentSequence.sequence.length;
    const targetName = currentSequence.sequence[targetIndex];

    return (
      <div className="flex flex-col items-center animate-fade-in">
        <div className="w-full flex justify-center mb-4">
           {/* Progress Indicator */}
           <div className="px-4 py-1 bg-black/40 rounded-full text-xs font-mono text-slate-400 border border-slate-700">
             Turn {currentSequence.currentIndex + 1} of {currentSequence.sequence.length}
           </div>
        </div>

        <Card 
          isRevealed={currentSequence.isRevealed}
          type={activeTab}
          recipientName={currentDrawerName} // The person drawing
          targetName={targetName} // The gift they get
          onReveal={handleReveal}
          disabled={false}
        />

        <div className="h-16 flex items-center justify-center w-full">
          {currentSequence.isRevealed && (
            <button
              onClick={nextTurn}
              className="animate-bounce-in px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-bold transition-all flex items-center gap-2 border border-slate-500"
            >
              Next Person <Play className="w-4 h-4 fill-current" />
            </button>
          )}
          {!currentSequence.isRevealed && (
             <p className="text-slate-400 text-sm animate-pulse">
               Waiting for {currentDrawerName} to tap the card...
             </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 overflow-hidden relative selection:bg-yellow-500/30">
      <Snowfall />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(30,58,138,0.3),transparent_70%)] pointer-events-none" />

      <header className="relative z-10 pt-8 pb-6 px-4 text-center">
        <div className="inline-block p-3 rounded-full bg-slate-800/50 border border-slate-700 mb-4 backdrop-blur-sm">
           <TreePine className="w-8 h-8 text-green-400 inline-block mr-2" />
           <TreePine className="w-10 h-10 text-red-500 inline-block" />
           <TreePine className="w-8 h-8 text-green-400 inline-block ml-2" />
        </div>
        <h1 className="text-5xl md:text-6xl font-christmas glow-text mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
          Magical Gift Exchange
        </h1>
        <p className="text-slate-400 font-light tracking-widest uppercase text-sm">
          Angel & Devil Edition
        </p>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Participant List & Status */}
        <div className="lg:col-span-3 hidden lg:block">
          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden h-[calc(100vh-250px)] flex flex-col">
            <div className="p-4 bg-slate-900/50 border-b border-slate-700">
              <h3 className="font-bold text-slate-300 flex items-center gap-2">
                Participants <span className="text-xs bg-slate-700 px-2 py-0.5 rounded-full">{PARTICIPANTS_LIST.length}</span>
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
               {PARTICIPANTS_LIST.map((name, i) => {
                 // Check status based on active activeTab results
                 const results = activeTab === 'ANGEL' ? angelResults : devilResults;
                 const hasDrawn = results.some(r => r.drawer === name);
                 
                 return (
                   <div key={name} className={`px-3 py-2 rounded-lg text-sm flex items-center justify-between ${hasDrawn ? 'bg-green-900/20 text-green-400' : 'text-slate-400 hover:bg-slate-800/50'}`}>
                     <span>{i + 1}. {name}</span>
                     {hasDrawn && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />}
                   </div>
                 );
               })}
            </div>
          </div>
        </div>

        {/* Center Column: The Stage */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Phase Toggles */}
          <div className="flex p-1 bg-slate-800/80 rounded-xl mb-6 backdrop-blur-md border border-slate-700">
            <button
              onClick={() => setActiveTab('ANGEL')}
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'ANGEL' 
                  ? 'bg-yellow-500 text-slate-900 shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Angel Round
            </button>
            <button
              onClick={() => setActiveTab('DEVIL')}
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'DEVIL' 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Ghost className="w-4 h-4" /> Devil Round
            </button>
          </div>

          {/* Game Area */}
          <div className="flex-1 min-h-[500px] relative">
             {renderActiveGame()}
          </div>
          
          <div className="mt-8 text-center lg:hidden">
             {/* Mobile participant counter */}
             <p className="text-slate-500 text-xs">
               {activeTab === 'ANGEL' ? angelResults.length : devilResults.length} / {PARTICIPANTS_LIST.length} completed
             </p>
          </div>
        </div>

        {/* Right Column: Logs */}
        <div className="lg:col-span-4 space-y-6">
           <HistoryLog results={angelResults} type="ANGEL" />
           <HistoryLog results={devilResults} type="DEVIL" />
           
           <div className="pt-4 text-center">
             <button 
               onClick={resetAll}
               className="text-xs text-slate-600 hover:text-red-400 flex items-center justify-center gap-1 mx-auto transition-colors"
             >
               <RotateCcw className="w-3 h-3" /> Reset Game Data
             </button>
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;
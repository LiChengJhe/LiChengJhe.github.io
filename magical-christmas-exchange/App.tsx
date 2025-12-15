import React, { useState, useEffect } from 'react';
import { GiftType, GamePhase, DrawSequenceState, DrawResult, Participant } from './types';
import { DEFAULT_PARTICIPANTS } from './constants';
import { shuffleArray } from './utils/gameLogic';
import Snowfall from './components/Snowfall';
import Card from './components/Card';
import HistoryLog from './components/HistoryLog';
import { Sparkles, Play, SkipForward, RotateCcw, TreePine, Ghost, Plus, Trash2, Users, X } from 'lucide-react';

const App: React.FC = () => {
  // Global App State
  const [participants, setParticipants] = useState<string[]>(DEFAULT_PARTICIPANTS);
  const [newParticipantName, setNewParticipantName] = useState('');
  const [showMobileParticipants, setShowMobileParticipants] = useState(false);

  const [activeTab, setActiveTab] = useState<GiftType>('ANGEL');
  const [angelSequence, setAngelSequence] = useState<DrawSequenceState | null>(null);
  const [devilSequence, setDevilSequence] = useState<DrawSequenceState | null>(null);
  
  const [angelResults, setAngelResults] = useState<DrawResult[]>([]);
  const [devilResults, setDevilResults] = useState<DrawResult[]>([]);

  // Derived state helper
  const currentSequence = activeTab === 'ANGEL' ? angelSequence : devilSequence;
  const isGameActive = angelSequence !== null || devilSequence !== null;
  
  // The round is finished if the card is revealed AND the receiver was the first drawer (closing the loop)
  const isFinished = currentSequence?.isRevealed === true && 
                     currentSequence?.currentReceiver === currentSequence?.firstDrawer;
  
  // --- Actions ---

  const handleAddParticipant = () => {
    const trimmed = newParticipantName.trim();
    if (!trimmed) return;
    if (participants.includes(trimmed)) {
      alert("This name already exists!");
      return;
    }
    setParticipants([...participants, trimmed]);
    setNewParticipantName('');
  };

  const handleRemoveParticipant = (name: string) => {
    // Removed window.confirm to ensure action works reliably on all devices
    setParticipants(prev => prev.filter(p => p !== name));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddParticipant();
  };

  const startPhase = (type: GiftType) => {
    if (participants.length < 2) {
      alert("Need at least 2 participants to start!");
      return;
    }
    
    // We start by picking a random first drawer.
    // The rest of the chain is determined dynamically turn-by-turn.
    const shuffled = shuffleArray(participants);
    const first = shuffled[0];
    const others = shuffled.slice(1); // Everyone else is a candidate to receive

    const initialState: DrawSequenceState = {
      firstDrawer: first,
      currentDrawer: first,
      remainingCandidates: others,
      isRevealed: false,
      currentReceiver: undefined
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
    if (!currentSequence || currentSequence.isRevealed) return;

    let receiver: string;
    let nextCandidates = [...currentSequence.remainingCandidates];

    // --- DYNAMIC DRAW LOGIC ---
    // If there are candidates left (people who haven't received yet), pick one randomly.
    if (nextCandidates.length > 0) {
      const randomIndex = Math.floor(Math.random() * nextCandidates.length);
      receiver = nextCandidates[randomIndex];
      // Remove this person from the pool so they can't be drawn again
      nextCandidates.splice(randomIndex, 1);
    } else {
      // If no candidates left, the only person left to receive is the one who started (First Drawer).
      // This closes the Hamiltonian loop.
      receiver = currentSequence.firstDrawer;
    }

    const nextState: DrawSequenceState = {
      ...currentSequence,
      isRevealed: true,
      currentReceiver: receiver,
      remainingCandidates: nextCandidates
    };

    if (activeTab === 'ANGEL') {
      setAngelSequence(nextState);
      setAngelResults(prev => [...prev, {
        drawer: currentSequence.currentDrawer,
        receiver: receiver,
        giftType: 'ANGEL',
        timestamp: Date.now()
      }]);
    } else {
      setDevilSequence(nextState);
      setDevilResults(prev => [...prev, {
        drawer: currentSequence.currentDrawer,
        receiver: receiver,
        giftType: 'DEVIL',
        timestamp: Date.now()
      }]);
    }
  };

  const nextTurn = () => {
    if (!currentSequence || !currentSequence.currentReceiver) return;
    
    // If we just completed the loop, we don't advance. The render logic handles the "Finished" state.
    if (currentSequence.currentReceiver === currentSequence.firstDrawer) {
      return;
    }

    // The receiver becomes the next drawer
    const nextState: DrawSequenceState = {
      ...currentSequence,
      currentDrawer: currentSequence.currentReceiver,
      isRevealed: false,
      currentReceiver: undefined
      // remainingCandidates is preserved from the reveal step
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

  const renderParticipantListContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-slate-900/50 border-b border-slate-700">
        <h3 className="font-bold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            Participants 
            <span className="text-xs bg-slate-700 px-2 py-0.5 rounded-full">{participants.length}</span>
          </span>
          {!isGameActive && (
            <span className="text-[10px] text-green-400 font-normal uppercase tracking-wider">Editable</span>
          )}
        </h3>
        
        {/* Add Input */}
        {!isGameActive && (
          <div className="mt-3 flex gap-2">
            <input 
              type="text" 
              value={newParticipantName}
              onChange={(e) => setNewParticipantName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add name..."
              className="flex-1 bg-slate-800 border border-slate-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-yellow-500 text-white placeholder-slate-500"
            />
            <button 
              onClick={handleAddParticipant}
              disabled={!newParticipantName.trim()}
              className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-1.5 rounded-md transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
        {isGameActive && (
           <p className="mt-2 text-xs text-slate-500 italic">
             List locked during game.
           </p>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {participants.map((name, i) => {
            // Check status based on active activeTab results
            const results = activeTab === 'ANGEL' ? angelResults : devilResults;
            const hasDrawn = results.some(r => r.drawer === name);
            const isPlaying = isGameActive;

            return (
              <div key={name} className={`relative group px-3 py-2 rounded-lg text-sm flex items-center justify-between ${hasDrawn ? 'bg-green-900/20 text-green-400' : 'text-slate-400 hover:bg-slate-800/50'}`}>
                <span className="flex items-center gap-2">
                  <span className="opacity-50 w-5 text-right">{i + 1}.</span> 
                  {name}
                </span>
                
                <div className="flex items-center gap-2">
                  {hasDrawn && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />}
                  
                  {!isPlaying && (
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Direct removal without native confirm dialog to avoid mobile issues
                        handleRemoveParticipant(name);
                      }}
                      className="z-20 p-2 text-slate-400 bg-slate-700/50 hover:bg-red-500 hover:text-white rounded-md cursor-pointer transition-colors"
                      title="Remove"
                      aria-label={`Remove ${name}`}
                    >
                      <Trash2 className="w-4 h-4 pointer-events-none" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {participants.length === 0 && (
            <div className="text-center p-4 text-slate-600 text-sm italic">
              No participants yet. Add some!
            </div>
          )}
      </div>
    </div>
  );

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
              disabled={participants.length < 2}
              className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                participants.length < 2 ? 'opacity-50 cursor-not-allowed bg-slate-600 text-slate-400' :
                activeTab === 'ANGEL' 
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:shadow-yellow-500/50' 
                  : 'bg-gradient-to-r from-red-600 to-rose-700 text-white hover:shadow-red-600/50'
              }`}
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>Start Magic Draw</span>
              <div className="absolute inset-0 rounded-full bg-white/20 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            {participants.length < 2 && (
              <p className="mt-4 text-red-400 text-sm">Add at least 2 participants to start.</p>
            )}
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
    const currentResults = activeTab === 'ANGEL' ? angelResults : devilResults;
    const turnNumber = currentSequence.isRevealed ? currentResults.length : currentResults.length + 1;

    return (
      <div className="flex flex-col items-center animate-fade-in">
        <div className="w-full flex justify-center mb-4">
           {/* Progress Indicator */}
           <div className="px-4 py-1 bg-black/40 rounded-full text-xs font-mono text-slate-400 border border-slate-700">
             Turn {turnNumber} of {participants.length}
           </div>
        </div>

        <Card 
          isRevealed={currentSequence.isRevealed}
          type={activeTab}
          recipientName={currentSequence.currentDrawer} // The person drawing
          targetName={currentSequence.currentReceiver} // The gift they get
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
               Waiting for {currentSequence.currentDrawer} to tap the card...
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
        <p className="text-slate-400 font-light tracking-widest uppercase text-sm mb-4">
          Angel & Devil Edition
        </p>

        {/* Mobile Participants Button */}
        <div className="lg:hidden flex justify-center">
          <button 
            onClick={() => setShowMobileParticipants(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-full text-xs text-slate-300 border border-slate-700 backdrop-blur hover:bg-slate-700"
          >
            <Users className="w-3 h-3" />
            Manage Participants ({participants.length})
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Participant List & Status */}
        <div className="lg:col-span-3 hidden lg:block">
          <div className="bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden h-[calc(100vh-250px)]">
            {renderParticipantListContent()}
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
               {activeTab === 'ANGEL' ? angelResults.length : devilResults.length} / {participants.length} completed
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

      {/* Mobile Participants Modal */}
      {showMobileParticipants && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 flex flex-col p-6 animate-fade-in lg:hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-christmas text-white">Participants</h2>
            <button 
              onClick={() => setShowMobileParticipants(false)}
              className="p-2 bg-slate-800 rounded-full border border-slate-700"
            >
              <X className="w-6 h-6 text-slate-300" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden bg-slate-800/30 rounded-xl border border-slate-700/50">
            {renderParticipantListContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
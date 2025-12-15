import React from 'react';
import { GiftType } from '../types';
import { Gift, AlertCircle, Sparkles } from 'lucide-react';

interface CardProps {
  isRevealed: boolean;
  type: GiftType;
  recipientName?: string;
  targetName?: string; // The gift owner
  onReveal: () => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ isRevealed, type, recipientName, targetName, onReveal, disabled }) => {
  const themeColor = type === 'ANGEL' ? 'from-yellow-400 to-amber-600' : 'from-red-500 to-purple-800';
  const shadowColor = type === 'ANGEL' ? 'glow-angel' : 'glow-devil';
  const iconColor = type === 'ANGEL' ? 'text-yellow-100' : 'text-red-100';

  return (
    <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000 mx-auto my-8">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${
          isRevealed ? 'rotate-y-180' : ''
        }`}
        onClick={() => {
          if (!disabled && !isRevealed) {
            onReveal();
          }
        }}
      >
        {/* FRONT OF CARD (The "Click to Draw" side) */}
        <div 
          className={`absolute w-full h-full backface-hidden rounded-xl shadow-2xl bg-gradient-to-br ${themeColor} flex flex-col items-center justify-center border-4 border-white/20 ${shadowColor}`}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          <div className="z-10 text-center p-6">
            <h3 className="text-2xl text-white/90 font-christmas mb-2">Current Drawer</h3>
            <div className="text-4xl font-bold text-white mb-8 drop-shadow-md">{recipientName}</div>
            
            <div className="animate-bounce">
              <Gift className={`w-20 h-20 ${iconColor} mx-auto`} strokeWidth={1.5} />
            </div>
            
            <p className="mt-8 text-white/80 font-semibold tracking-wider uppercase text-sm">
              Tap to Draw {type === 'ANGEL' ? 'Angel' : 'Devil'} Gift
            </p>
          </div>
        </div>

        {/* BACK OF CARD (The Result side) */}
        <div 
          className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-2xl bg-slate-800 border-2 border-slate-600 flex flex-col items-center justify-center p-6 overflow-hidden`}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          
          <Sparkles className="w-12 h-12 text-yellow-400 mb-4 animate-spin-slow" />
          
          <h3 className="text-xl text-slate-400 font-christmas mb-2">You got the gift from</h3>
          <div className={`text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${themeColor} text-center`}>
            {targetName}
          </div>
          
          <div className="w-full h-px bg-slate-600 my-4"></div>
          
          <p className="text-slate-400 text-sm text-center">
            Next turn: <strong>{targetName}</strong> will draw next!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
export interface Participant {
  id: string;
  name: string;
}

export type GiftType = 'ANGEL' | 'DEVIL';

export interface DrawResult {
  drawer: string; // Name of the person drawing
  receiver: string; // Name of the person whose gift was drawn
  giftType: GiftType;
  timestamp: number;
}

export type GamePhase = 'SETUP' | 'PLAYING' | 'SUMMARY';

// The internal state of the draw sequence
export interface DrawSequenceState {
  sequence: string[]; // The ordered list of names (shuffled). 
  // Logic: sequence[i] draws sequence[i+1]. Last draws First.
  currentIndex: number;
  isRevealed: boolean;
}
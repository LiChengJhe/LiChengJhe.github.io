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
  firstDrawer: string; // The person who started the chain (must be the last receiver to close loop)
  currentDrawer: string; // The person currently drawing
  remainingCandidates: string[]; // Pool of participants who haven't received a gift yet (excluding firstDrawer)
  isRevealed: boolean; // Has the current drawer revealed their target?
  currentReceiver?: string; // The target, determined only when revealed
}
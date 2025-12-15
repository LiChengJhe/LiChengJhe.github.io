import { Participant } from './types';

export const DEFAULT_PARTICIPANTS: string[] = [
  "Alma Chen",
  "Anny Chang",
  "Bruce Chen",
  "Cala Huang",
  "Carl Yang",
  "Caspar Lo",
  "Danny Lai",
  "Edward Kuo",
  "Gina Chiu",
  "Hao Lin",
  "Judy Tsou",
  "Katrina Chuang",
  "Len Li",
  "Poy Chang",
  "Ted Lo",
  "Toris Sun",
  "Vivian Cheng"
];

export const getInitialParticipants = (): Participant[] => {
  return DEFAULT_PARTICIPANTS.map((name, index) => ({
    id: `p-${index}`,
    name
  }));
};
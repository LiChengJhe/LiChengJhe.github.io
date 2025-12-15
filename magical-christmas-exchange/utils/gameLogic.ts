// Fisher-Yates Shuffle
export const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Generates a closed loop sequence.
 * The logic is based on a Hamiltonian path cycle.
 * 1. Shuffle the participants completely.
 * 2. This creates an order: [A, B, C, D]
 * 3. The rule "A draws B, B draws C, C draws D, D draws A"
 *    ensures everyone draws exactly once, everyone is received exactly once,
 *    and no one draws themselves (provided count > 1).
 * 4. This also satisfies the "Interactive Chain" rule:
 *    "Start with X (A). If he draws Y (B), next turn is Y (B)."
 */
export const generateDrawSequence = (names: string[]): string[] => {
  if (names.length < 2) {
    throw new Error("Need at least 2 participants");
  }
  return shuffleArray(names);
};
export type DayIndex = 0 | 1 | 2 | 3 | 4; // Mon-Fri

export interface Slot {
  day: DayIndex;
  startMinutes: number; // minutes since midnight
  endMinutes: number;
}

export interface PersonAvailabilityRange {
  day: DayIndex;
  startMinutes: number;
  endMinutes: number; // exclusive
}

export interface Engineer {
  id: string;
  name: string;
  availability: PersonAvailabilityRange[];
}

export interface Candidate {
  id: string;
  name: string;
  preferred: PersonAvailabilityRange[];
}

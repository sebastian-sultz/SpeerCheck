import type { Engineer, Candidate } from "../types";

export const ENGINEERS: Engineer[] = [
  {
    id: "eng-1",
    name: "Eng1",
    availability: [
      { day: 0, startMinutes: 9 * 60, endMinutes: 12 * 60 }, // Mon 9-12
      { day: 2, startMinutes: 13 * 60 + 30, endMinutes: 17 * 60 } // Wed 13:30-17
    ]
  },
  {
    id: "eng-2",
    name: "Eng2",
    availability: [
      { day: 1, startMinutes: 10 * 60, endMinutes: 16 * 60 }, // Tue 10-16
      { day: 3, startMinutes: 9 * 60, endMinutes: 11 * 60 + 30 } // Thu 9-11:30
    ]
  },
  {
    id: "eng-3",
    name: "Eng3",
    availability: [
      { day: 0, startMinutes: 14 * 60, endMinutes: 18 * 60 }, // Mon 14-18
      { day: 1, startMinutes: 10 * 60, endMinutes: 16 * 60 }, // Tue 10-16
      { day: 4, startMinutes: 9 * 60, endMinutes: 12 * 60 + 30 } // Fri 9-12:30
    ]
  }
];

export const CANDIDATES: Candidate[] = [
  {
    id: "cand-1",
    name: "Ishaan Verma",
    preferred: [{ day: 1, startMinutes: 14 * 60, endMinutes: 17 * 60 }] // Tue 14-17
  },
  {
    id: "cand-2",
    name: "Priya Rao",
    preferred: [{ day: 0, startMinutes: 10 * 60 + 30, endMinutes: 12 * 60 }] // Mon 10:30-12
  }
];

import type { Slot, PersonAvailabilityRange, Engineer, DayIndex } from "../types";

export const SLOT_LENGTH = 30;
export const WORK_START = 9 * 60;
export const WORK_END = 18 * 60;

export function generateWeekSlots(): Slot[] {
  const slots: Slot[] = [];
  for (let day = 0 as DayIndex; day < 5; day++) {
    for (let m = WORK_START; m < WORK_END; m += SLOT_LENGTH) {
      slots.push({ day, startMinutes: m, endMinutes: m + SLOT_LENGTH });
    }
  }
  return slots;
}

export function rangeToSlots(range: PersonAvailabilityRange): Slot[] {
  const slots: Slot[] = [];
  for (let m = range.startMinutes; m + SLOT_LENGTH <= range.endMinutes; m += SLOT_LENGTH) {
    slots.push({ day: range.day, startMinutes: m, endMinutes: m + SLOT_LENGTH });
  }
  return slots;
}

export function personRangesToSlotKeys(ranges: PersonAvailabilityRange[]): Set<string> {
  const set = new Set<string>();
  ranges.forEach(r => rangeToSlots(r).forEach(s => set.add(slotKey(s))));
  return set;
}

export function slotKey(slot: Pick<Slot, "day" | "startMinutes">) {
  return `${slot.day}-${slot.startMinutes}`;
}

export function formatTimeFromMinutes(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${ampm}`;
}

export function dayLabel(day: number) {
  return ["Mon", "Tue", "Wed", "Thu", "Fri"][day] || "Day";
}

// Build a map: slotKey -> array of engineer ids
export function buildEngineerSlotMap(engineers: Engineer[]) {
  const map = new Map<string, string[]>();
  engineers.forEach(e => {
    rangeToSlotsForEngineer(e).forEach(s => {
      const key = slotKey(s);
      const arr = map.get(key) || [];
      arr.push(e.id);
      map.set(key, arr);
    });
  });
  return map;
}

// helper to get all slot objects for an engineer's ranges
export function rangeToSlotsForEngineer(e: Engineer): Slot[] {
  const all: Slot[] = [];
  e.availability.forEach(r => rangeToSlots(r).forEach(s => all.push(s)));
  return all;
}

// find engineers available for a given slot (by direct check)
export function findEngineersForSlot(engineers: Engineer[], slot: Slot): Engineer[] {
  return engineers.filter(eng =>
    eng.availability.some(a => a.day === slot.day && slot.startMinutes >= a.startMinutes && slot.endMinutes <= a.endMinutes)
  );
}

// compute overlaps map slotKey -> array of engineer ids but only for candidate slots
export function computeOverlaps(slots: Slot[], candidateSlotKeys: Set<string>, engineerSlotMap: Map<string, string[]>) {
  const map = new Map<string, string[]>();
  slots.forEach(s => {
    const key = slotKey(s);
    if (!candidateSlotKeys.has(key)) return;
    const engs = engineerSlotMap.get(key) || [];
    if (engs.length) map.set(key, engs.slice());
  });
  return map;
}

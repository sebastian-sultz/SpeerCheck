import {
  SLOT_LENGTH,
  WORK_START,
  WORK_END,
  generateWeekSlots,
  rangeToSlots,
  personRangesToSlotKeys,
  slotKey,
  formatTimeFromMinutes,
  dayLabel,
  buildEngineerSlotMap,
  rangeToSlotsForEngineer,
  findEngineersForSlot,
  computeOverlaps,
} from "../availability";
import type { Engineer, PersonAvailabilityRange, Slot } from "../../types";

describe("availability utils", () => {
  it("generateWeekSlots creates slots for 5 weekdays and working hours", () => {
    const slots = generateWeekSlots();
    // expected slots per day
    const slotsPerDay = (WORK_END - WORK_START) / SLOT_LENGTH;
    expect(slots.length).toBe(5 * slotsPerDay);

    // check first and last
    expect(slots[0]).toEqual({
      day: 0,
      startMinutes: WORK_START,
      endMinutes: WORK_START + SLOT_LENGTH,
    });
    expect(slots[slots.length - 1]).toEqual({
      day: 4,
      startMinutes: WORK_END - SLOT_LENGTH,
      endMinutes: WORK_END,
    });
  });

  it("rangeToSlots splits availability into 30-min chunks", () => {
    const range: PersonAvailabilityRange = {
      day: 0,
      startMinutes: 9 * 60,
      endMinutes: 11 * 60,
    };
    const slots = rangeToSlots(range);
    expect(slots).toHaveLength(4); // 2 hours → 4 slots
    expect(slots[0]).toEqual({ day: 0, startMinutes: 540, endMinutes: 570 });
    expect(slots[3]).toEqual({ day: 0, startMinutes: 630, endMinutes: 660 });
  });

  it("personRangesToSlotKeys builds unique keys", () => {
    const ranges: PersonAvailabilityRange[] = [
      { day: 1, startMinutes: 600, endMinutes: 660 },
      { day: 1, startMinutes: 660, endMinutes: 720 },
    ];
    const keys = personRangesToSlotKeys(ranges);
    expect(keys.size).toBe(4); // 2 ranges × 2 slots each
    expect(keys.has("1-600")).toBe(true);
    expect(keys.has("1-690")).toBe(true);
  });

  it("slotKey returns expected format", () => {
    expect(slotKey({ day: 2, startMinutes: 600 })).toBe("2-600");
  });

  it("formatTimeFromMinutes formats correctly", () => {
    expect(formatTimeFromMinutes(9 * 60)).toBe("9:00 AM");
    expect(formatTimeFromMinutes(12 * 60)).toBe("12:00 PM");
    expect(formatTimeFromMinutes(13 * 60 + 5)).toBe("1:05 PM");
    expect(formatTimeFromMinutes(0)).toBe("12:00 AM");
  });

  it("dayLabel maps correctly", () => {
    expect(dayLabel(0)).toBe("Mon");
    expect(dayLabel(4)).toBe("Fri");
    expect(dayLabel(7)).toBe("Day");
  });

  it("rangeToSlotsForEngineer flattens engineer availability", () => {
    const engineer: Engineer = {
      id: "eng1",
      name: "Alice",
      availability: [
        { day: 0, startMinutes: 540, endMinutes: 600 },
        { day: 1, startMinutes: 600, endMinutes: 660 },
      ],
    };
    const slots = rangeToSlotsForEngineer(engineer);
    expect(slots).toHaveLength(4);
    expect(slots[0].day).toBe(0);
    expect(slots[1].day).toBe(0);
    expect(slots[2].day).toBe(1);
    expect(slots[3].day).toBe(1);
  });

  it("buildEngineerSlotMap aggregates engineer slots", () => {
    const engineers: Engineer[] = [
      {
        id: "eng1",
        name: "Alice",
        availability: [{ day: 0, startMinutes: 540, endMinutes: 600 }],
      },
      {
        id: "eng2",
        name: "Bob",
        availability: [{ day: 0, startMinutes: 540, endMinutes: 600 }],
      },
    ];
    const map = buildEngineerSlotMap(engineers);
    const key = "0-540";
    expect(map.has(key)).toBe(true);
    expect(map.get(key)).toContain("eng1");
    expect(map.get(key)).toContain("eng2");
  });

  it("findEngineersForSlot finds only engineers available", () => {
    const engineers: Engineer[] = [
      {
        id: "eng1",
        name: "Alice",
        availability: [{ day: 0, startMinutes: 540, endMinutes: 600 }],
      },
      {
        id: "eng2",
        name: "Bob",
        availability: [{ day: 1, startMinutes: 540, endMinutes: 600 }],
      },
    ];
    const slot: Slot = { day: 0, startMinutes: 540, endMinutes: 570 };
    const result = findEngineersForSlot(engineers, slot);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("eng1");
  });

  it("computeOverlaps returns only candidate-preferred slots with engineers", () => {
    const slots: Slot[] = [
      { day: 0, startMinutes: 540, endMinutes: 570 },
      { day: 0, startMinutes: 570, endMinutes: 600 },
    ];
    const candidateSlotKeys = new Set(["0-540"]);
    const engineerSlotMap = new Map<string, string[]>([["0-540", ["eng1"]]]);
    const overlaps = computeOverlaps(slots, candidateSlotKeys, engineerSlotMap);

    expect(overlaps.size).toBe(1);
    expect(overlaps.get("0-540")).toEqual(["eng1"]);
  });
});

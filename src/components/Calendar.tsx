// src/components/Calendar.tsx
import { useMemo } from "react";
import type { Candidate, Slot } from "../types";
import { generateWeekSlots, slotKey, formatTimeFromMinutes } from "../utils/availability";
import SlotCell from "./SlotCell";

export default function Calendar({
  candidate,
  
  engineerSlotMap,
  engineerLookup,
  engineerColor,
  onCellClick
}: {
 candidate: Candidate | null;

 
  engineerSlotMap: Map<string, string[]>;
  engineerLookup: Record<string, string>;
  engineerColor: Record<string, string>;
  onCellClick: (slot: Slot, engineerIds: string[]) => void;
}) {
  const allSlots = useMemo(() => generateWeekSlots(), []);
  const timeRows = useMemo(() => Array.from(new Set(allSlots.map(s => s.startMinutes))), [allSlots]);
const candidateKeys = useMemo(() => {
  const s = new Set<string>();
  if (candidate) {
    candidate.preferred.forEach((p) => {
      for (let m = p.startMinutes; m + 30 <= p.endMinutes; m += 30) {
        s.add(`${p.day}-${m}`);
      }
    });
  }
  return s;
}, [candidate]);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-6 gap-2 mb-2">
        <div className="col-span-1" />
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map(d => (
          <div key={d} className="text-center font-medium">{d}</div>
        ))}
      </div>

      <div style={{ maxHeight: "62vh", overflow: "auto" }} className="space-y-1">
        {timeRows.map(startMinutes => (
          <div key={startMinutes} className="grid grid-cols-6 gap-2 items-center">
            {/* <-- CORRECTED: show formatted slot time here */}
            <div className="text-xs text-gray-600">{formatTimeFromMinutes(startMinutes)}</div>

            {[0,1,2,3,4].map(day => {
              const slot: Slot = { day: day as any, startMinutes, endMinutes: startMinutes + 30 };
              const key = slotKey(slot);
              const engineerIds = engineerSlotMap.get(key) || [];
const candidatePreferred = candidate ? candidateKeys.has(key) : false;
              return (
                <SlotCell
                  key={key}
                  slot={slot}
                  candidatePreferred={candidatePreferred}
                  engineerIds={engineerIds}
                  engineerLookup={engineerLookup}
                  engineerColor={engineerColor}
                  onClick={onCellClick}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import EngineerChooserModal from "./components/EngineerChooserModal";
import EngineerLegend from "./components/EngineerLegend";
import { ENGINEERS, CANDIDATES } from "./data/sample";
import type { Candidate, Engineer, Slot } from "./types";
import {personRangesToSlotKeys, buildEngineerSlotMap, slotKey, formatTimeFromMinutes, dayLabel } from "./utils/availability";

export default function App() {
  // color palette for engineers
  const colors = ["#ef476f", "#06d6a0", "#118ab2", "#ffd166", "#8a2be2"];
  const engineerColor: Record<string,string> = {};
  ENGINEERS.forEach((e, i) => engineerColor[e.id] = colors[i % colors.length]);
  const engineerLookup: Record<string,string> = {};
  ENGINEERS.forEach(e => engineerLookup[e.id] = e.name);

  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");
  const [scheduled, setScheduled] = useState<{candidate: Candidate; engineer: Engineer; slot: Slot} | null>(null);
  const [modal, setModal] = useState<{open: boolean; slot?: Slot; engineers?: Engineer[]}>({open:false});

  const candidate = useMemo(() => CANDIDATES.find(c => c.id === selectedCandidateId) || null, [selectedCandidateId]);

  // Build slot map and candidate keys
  const engineerSlotMap = useMemo(() => buildEngineerSlotMap(ENGINEERS), []);
  const candidateSlotKeys = useMemo(() => candidate ? personRangesToSlotKeys(candidate.preferred) : new Set<string>(), [candidate]);

  function handleCellClick(slot: Slot, engineerIds: string[]) {
    // Only allow scheduling if candidate is preferring this slot and at least one engineer
    const key = slotKey(slot);

    if (!candidate) return;
    
    if (!candidateSlotKeys.has(key)) {
      // not an overlapping slot; ignore or show feedback
      window.alert("Candidate not available at this slot.");
      return;
    }
    if (engineerIds.length === 1) {
      const eng = ENGINEERS.find(e => e.id === engineerIds[0])!;
      setScheduled({ candidate, engineer: eng, slot });
    } else if (engineerIds.length > 1) {
      // open chooser
      const engObjs = ENGINEERS.filter(e => engineerIds.includes(e.id));
      setModal({ open: true, slot, engineers: engObjs });
    }
  }

  function onConfirmEngineer(eng: Engineer) {
    if (!modal.slot || !candidate) return;
    setScheduled({ candidate, engineer: eng, slot: modal.slot });
    setModal({ open: false });
  }

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Candidate</label>
            <select value={selectedCandidateId} onChange={e => setSelectedCandidateId(e.target.value)} className="border px-3 py-2 rounded">
              <option value="">Choose Candidate</option>
              {CANDIDATES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <EngineerLegend items={ENGINEERS.map(e => ({ id: e.id, name: e.name, color: engineerColor[e.id] }))} />
          </div>
        </div>

        <Calendar
  candidate={candidate}   // not forced to CANDIDATES[0]
  // engineers={ENGINEERS}
  engineerSlotMap={engineerSlotMap}
  engineerLookup={engineerLookup}
  engineerColor={engineerColor}
  onCellClick={handleCellClick}
/>


        <div className="mt-6 flex justify-between items-center">
          <div>
            <h4 className="text-sm text-gray-600">Legend</h4>
            <div className="text-xs text-gray-500 mt-1">Yellow rows = candidate preferred; colored chips = engineers' availability; white clickable cells = overlap (click to schedule).</div>
          </div>

          <div>
            {scheduled ? (
              <div className="bg-green-50 border border-green-200 px-4 py-2 rounded">
                <div className="text-sm">Interview scheduled</div>
                <div className="font-medium">{scheduled.candidate.name} — {scheduled.engineer.name}</div>
                <div className="text-sm">
                  {dayLabel(scheduled.slot.day)} · {formatTimeFromMinutes(scheduled.slot.startMinutes)}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No interview scheduled</div>
            )}
          </div>
        </div>
      </div>

      {modal.open && modal.slot && modal.engineers && (
        <EngineerChooserModal
          engineers={modal.engineers}
          candidate={candidate!}
          slot={modal.slot}
          onConfirm={onConfirmEngineer}
          onClose={() => setModal({ open: false })}
          colorMap={engineerColor}
        />
      )}
    </div>
  );
}

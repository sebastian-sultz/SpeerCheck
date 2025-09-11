import type { Engineer, Candidate, Slot } from "../types";
import { formatTimeFromMinutes, dayLabel } from "../utils/availability";

export default function EngineerChooserModal({
  engineers,
  candidate,
  slot,
  onConfirm,
  onClose,
  colorMap
}: {
  engineers: Engineer[];
  candidate: Candidate;
  slot: Slot;
  onConfirm: (eng: Engineer) => void;
  onClose: () => void;
  colorMap: Record<string, string>;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-[520px] shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Choose an engineer</h3>
        <p className="text-sm mb-3">Candidate: <b>{candidate.name}</b></p>
        <p className="text-sm mb-4">Time: <b>{dayLabel(slot.day)} · {formatTimeFromMinutes(slot.startMinutes)}</b></p>

        <div className="grid grid-cols-1 gap-2">
          {engineers.map(e => (
            <button key={e.id} onClick={() => onConfirm(e)} className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50">
              <span style={{ background: colorMap[e.id] }} className="w-4 h-4 rounded-full inline-block border" />
              <div className="text-left">
                <div className="font-medium">{e.name}</div>
                <div className="text-xs text-gray-500">Assigned interview</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
        </div>
      </div>
    </div>
  );
}

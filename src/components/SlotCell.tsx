import React from "react";
import type { Slot } from "../types";
import { formatTimeFromMinutes } from "../utils/availability";

export default function SlotCell({
  slot,
  candidatePreferred,
  engineerIds,
  engineerLookup,
  engineerColor,
  onClick
}: {
  slot: Slot;
  candidatePreferred: boolean;
  engineerIds: string[];
  engineerLookup: Record<string, string>;
  engineerColor: Record<string, string>;
  onClick: (slot: Slot, engineerIds: string[]) => void;
}) {
  const hasEngineers = engineerIds.length > 0;
  const isOverlap = candidatePreferred && hasEngineers;

  // background only yellow if candidatePreferred is true
  const baseBg = candidatePreferred
    ? "bg-yellow-100"
    : hasEngineers
    ? "bg-white"
    : "bg-gray-50";

  const clickableClass = isOverlap ? "cursor-pointer hover:shadow-lg" : "";

  return (
    <div
      role={isOverlap ? "button" : undefined}
      tabIndex={isOverlap ? 0 : -1}
      onClick={() => isOverlap && onClick(slot, engineerIds)}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && isOverlap) {
          onClick(slot, engineerIds);
        }
      }}
      className={`p-2 border rounded min-h-[56px] flex flex-col items-center justify-center transition ${baseBg} ${clickableClass}`}
    >
      {/* engineers */}
      <div className="flex gap-1 mb-1 flex-wrap justify-center">
        {engineerIds.slice(0, 3).map((id) => (
          <span
            key={id}
            title={engineerLookup[id]}
            style={{ background: engineerColor[id] }}
            className="text-[10px] px-2 py-0.5 rounded-full text-white"
          >
            {engineerLookup[id].split(" ")[0]}
          </span>
        ))}
        {engineerIds.length > 3 && (
          <span className="text-xs text-gray-600">
            +{engineerIds.length - 3}
          </span>
        )}
      </div>

      {/* status */}
      <div className="text-xs text-gray-700">
        {candidatePreferred
          ? hasEngineers
            ? `${engineerIds.length} avail`
            : "Candidate only"
          : hasEngineers
          ? "Engineer available"
          : "-"}
      </div>

      {/* hidden time for screen readers */}
      <div className="sr-only">
        {formatTimeFromMinutes(slot.startMinutes)}
      </div>
    </div>
  );
}

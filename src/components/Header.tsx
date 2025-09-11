import React from "react";

export default function Header() {
  return (
    <header className="max-w-6xl mx-auto py-6 px-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">SpeerCheck — Live Interview Scheduler</h1>
        <p className="text-sm text-gray-500">Select a candidate, view engineer availability, and schedule 30-min interviews.</p>
      </div>
    </header>
  );
}

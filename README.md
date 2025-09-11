##SpeerCheck – Interview Scheduler

SpeerCheck is a live interview scheduling tool built for recruiters at Speer.
It helps match candidates’ preferred availability with engineers’ working hours and makes scheduling interviews quick and reliable.

#🚀 Live Demo

Deployed App on Vercel/Netlify

✨ Features

📅 Weekly calendar view (Mon–Fri, 9 AM – 6 PM) with 30-min slots

👤 Candidate selection with preferred availability ranges

👨‍💻 Engineer availability overlayed on the same calendar

🔎 Automatic calculation of overlapping slots between candidate + engineers

✅ One-click interview scheduling with confirmation message

🎨 Desktop-first, clean, and recruiter-friendly UI

🧪 Unit tests for core scheduling logic (availability calculation, overlaps, slot mapping)

🛠️ Tech Stack

React + TypeScript

Vite for fast bundling

TailwindCSS for styling

Jest + ts-jest for unit tests

Netlify/Vercel for deployment

📂 Project Structure
src/
  components/       // UI components like Calendar and SlotCell
  data/             // Sample candidate & engineer availability
  utils/            // Core scheduling logic (availability, overlaps, slot mapping)
  types/            // TypeScript types
  __tests__/        // Unit tests for utils

🧪 Running Tests
# install dependencies
npm install

# run test suite
npm run test


The tests focus on availability logic, ensuring slot generation, overlaps, and engineer matching work as expected.

🎯 Design Decisions

Logic separated from UI → All scheduling logic lives in utils/availability.ts, making it testable and maintainable.

Calendar-first UI → Recruiters can see candidate + engineer overlaps instantly.

Unit-tested logic → Instead of testing only the UI, tests validate the real scheduling logic.

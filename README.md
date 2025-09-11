
# SpeerCheck – Interview Scheduler

SpeerCheck is a **live interview scheduling tool** built for recruiters at Speer.  
It helps match candidates’ preferred availability with engineers’ working hours, making scheduling **quick, reliable, and hassle-free**.

---

## 🚀 Live Demo  
Deployed App: [Vercel/Netlify Link](#)

---

## ✨ Features  

- 📅 **Weekly calendar view** (Mon–Fri, 9 AM – 6 PM) with 30-min slots  
- 👤 **Candidate selection** with preferred availability ranges  
- 👨‍💻 **Engineer availability overlayed** on the same calendar  
- 🔎 **Automatic calculation** of overlapping slots between candidate & engineers  
- ✅ **One-click interview scheduling** with confirmation message  
- 🎨 **Desktop-first, clean, and recruiter-friendly UI**  
- 🧪 **Unit tests** for core scheduling logic (availability calculation, overlaps, slot mapping)  

---

## 🛠️ Tech Stack  

- ⚛️ **React + TypeScript**  
- ⚡ **Vite** for fast bundling  
- 🎨 **TailwindCSS** for styling  
- 🧪 **Jest + ts-jest** for unit testing  
- ☁️ **Netlify / Vercel** for deployment  

---

## 📂 Project Structure  

```

src/
components/       # UI components (Calendar, SlotCell, etc.)
data/             # Sample candidate & engineer availability
utils/            # Core scheduling logic (availability, overlaps, slot mapping)
types/            # TypeScript type definitions
**tests**/        # Unit tests for scheduling logic

````

---

## 🧪 Running Tests  

```bash
# Install dependencies
npm install

# Run test suite
npm run test
````

The test suite focuses on **availability logic**, ensuring:

* Slot generation works correctly
* Overlaps are computed accurately
* Engineer matching is validated

---

## 🎯 Design Decisions

* **Logic separated from UI** → All scheduling logic lives in `utils/availability.ts`, making it **testable & maintainable**
* **Calendar-first UI** → Recruiters can see **candidate + engineer overlaps instantly**
* **Unit-tested logic** → Instead of only UI tests, the **real scheduling logic is validated**

---


Do you also want me to make a **badges section** (like build status, license, tech logos, coverage % etc.) at the top of this README to make it look even more GitHub-ready?


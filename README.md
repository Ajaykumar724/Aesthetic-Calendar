🔗 Live Demo: [Aesthetic Calendar](https://aesthetic-calendar.netlify.app/)
# Aesthetic Calendar (Vite + React)

A small interactive calendar component inspired by a wall calendar design. Built with React + Vite.

Features
- Wall-calendar aesthetic with hero image and month notes
- Day-range selection (start, end, in-between states)
- Notes for the month and notes attached to a selected date range
- Responsive layout (collapses for mobile)
- Client-side persistence using `localStorage`

How to run locally

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

Open the dev server URL shown by Vite.

Notes for submission
- I chose React with Vite for this project as requested.
- To record a short demo, use any screen recorder to show the day-range selection, notes saving, and responsive behavior.
- To deploy, run `npm run build` and host the `dist` output (Vercel or Netlify work well).

Files of interest
- `src/components/Calendar.jsx` — main interactive component
- `src/styles.css` — component and layout styles

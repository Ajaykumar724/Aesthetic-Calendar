import React from 'react'
import useImageTheme from '../hooks/useImageTheme'

export default function CalendarHeader({ viewDate, year, monthNote, setMonthNote, saveMonthNote, onPrev, onNext, clearSelection }) {
  const urls = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80", // mountains
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1350&q=80", // desert
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1350&q=80", // travel
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1350&q=80", // aurora
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80", // ocean
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1350&q=80", // forest road
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1350&q=80", // lake
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1350&q=80", // valley
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1350&q=80", // snowy trees
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1350&q=80", // waterfall
];

  const imgUrl = useImageTheme(urls, 5000)

  return (
    <>
      <div className="hero">
        <div className="hero-image" style={{ backgroundImage: `url(${imgUrl})` }} />
        <div className="hero-meta">
          <div className="month-title">{viewDate.toLocaleString(undefined, { month: 'long' })} <span className="year">{year}</span></div>
          <div className="notes-mini">
            <label>Notes</label>
            <textarea value={monthNote} onChange={e => setMonthNote(e.target.value)} placeholder="General notes for the month" />
            <button className="btn" onClick={saveMonthNote}>Save Month Note</button>
          </div>
        </div>
      </div>

      <div className="controls">
        <button className="btn" onClick={onPrev} aria-label="Previous month">◀</button>
        <div className="month-label">{viewDate.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
        <button className="btn" onClick={onNext} aria-label="Next month">▶</button>
        <div className="spacer" />
        <button className="btn ghost" onClick={clearSelection}>Clear</button>
        <button className="btn ghost" onClick={typeof onFlip === 'function' ? onFlip : undefined}>Flip</button>
      </div>
    </>
  )
}

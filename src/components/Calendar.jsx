import React, { useState, useEffect, useMemo } from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import { toDateKey, isSameDay, clamp, getMonthMatrix } from '../utils/dateUtils'
import { loadMonthNote, saveMonthNote as storageSaveMonthNote, loadRangeNote, saveRangeNote as storageSaveRangeNote } from '../utils/storageUtils'
import { getHolidays } from '../utils/holidays'

export default function Calendar() {
  const [flipped, setFlipped] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [monthNote, setMonthNote] = useState('')
  const [rangeNote, setRangeNote] = useState('')

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const matrix = useMemo(() => getMonthMatrix(year, month), [year, month])

  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`

  useEffect(() => {
    setMonthNote(loadMonthNote(monthKey))
    if (start && end) setRangeNote(loadRangeNote(monthKey, start, end))
  }, [monthKey])

  useEffect(() => {
    if (start && end) setRangeNote(loadRangeNote(monthKey, start, end))
    else setRangeNote('')
  }, [start, end, monthKey])

  function onPrev() {
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  }
  function onNext() {
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))
  }

  function clickDay(day) {
    day = clamp(day)
    if (!start || (start && end)) {
      setStart(day)
      setEnd(null)
    } else {
      // start exists, end is null
      if (day < start) {
        // swap to new start
        setStart(day)
      } else if (isSameDay(day, start)) {
        setEnd(day)
      } else {
        setEnd(day)
      }
    }
  }

  function inRange(d) {
    if (!start) return false
    if (start && !end) return isSameDay(d, start)
    return (d >= start && d <= end)
  }

  function saveMonthNote() {
    storageSaveMonthNote(monthKey, monthNote)
    alert('Month note saved (localStorage)')
  }

  function saveRangeNote() {
    if (!start || !end) { alert('Select a start and end date first.'); return }
    storageSaveRangeNote(monthKey, start, end, rangeNote)
    alert('Range note saved (localStorage)')
  }

  function clearSelection() { setStart(null); setEnd(null); setRangeNote('') }

  return (
    <div className="calendar-shell">
      <div className={`calendar-card ${flipped ? 'flipped' : ''}`}>
        <CalendarHeader
          viewDate={viewDate}
          year={year}
          monthNote={monthNote}
          setMonthNote={setMonthNote}
          saveMonthNote={saveMonthNote}
          onPrev={onPrev}
          onNext={onNext}
          clearSelection={clearSelection}
          onFlip={()=>setFlipped(f=>!f)}
        />

        <CalendarGrid
          matrix={matrix}
          month={month}
          start={start}
          end={end}
          clickDay={clickDay}
          inRange={inRange}
          holidays={getHolidays(year)}
        />

        <div className="range-note">
          <label>Selected Range Note</label>
          <textarea value={rangeNote} onChange={e => setRangeNote(e.target.value)} placeholder="Attach a note to the selected range" />
          <div className="actions">
            <button className="btn" onClick={saveRangeNote}>Save Range Note</button>
            <div className="hint">Tip: tap start then end to select a range.</div>
          </div>
        </div>

      </div>
    </div>
  )
}

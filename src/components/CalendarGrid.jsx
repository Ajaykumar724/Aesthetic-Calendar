import React from 'react'
import DayCell from './DayCell'
import { toDateKey } from '../utils/dateUtils'

const isSameDay = (a,b) => a && b && toDateKey(a) === toDateKey(b)

export default function CalendarGrid({matrix, month, start, end, clickDay, inRange, holidays={}}){
  return (
    <div className="grid-wrap">
      <div className="weeknames">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(w=> <div key={w} className="wk">{w}</div>)}
      </div>
      <div className="grid">
        {matrix.map((week, wi)=> (
          <div key={wi} className="week">
            {week.map((d,di)=>{
              const muted = d.getMonth() !== month
              const isStart = isSameDay(d, start)
              const isEnd = isSameDay(d, end)
              const inrange = inRange(d) && !isStart && !isEnd
              const isWeekend = d.getDay() === 0 || d.getDay() === 6
              const key = toDateKey(d)
              const holiday = holidays[key]
              return (
                <DayCell
                  key={di}
                  day={d}
                  muted={muted}
                  isStart={isStart}
                  isEnd={isEnd}
                  inRange={inrange}
                  isWeekend={isWeekend}
                  holiday={holiday}
                  onClick={()=>clickDay(d)}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

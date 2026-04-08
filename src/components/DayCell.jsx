import React from 'react'

export default function DayCell({day, muted, isStart, isEnd, inRange, isWeekend, holiday, onClick}){
  const cls = ['day']
  if(muted) cls.push('muted')
  if(isStart) cls.push('start')
  if(isEnd) cls.push('end')
  if(inRange) cls.push('inrange')
  if(isWeekend) cls.push('weekend')
  if(holiday) cls.push('holiday')
  return (
    <div className={cls.join(' ')} onClick={onClick} title={holiday || ''}>
      <div className="date-num">{day.getDate()}</div>
      {holiday && <div className="holiday-badge" aria-hidden>{/* visual marker */}</div>}
    </div>
  )
}

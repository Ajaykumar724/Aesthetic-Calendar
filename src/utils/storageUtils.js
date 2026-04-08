import { toDateKey } from './dateUtils'

export function loadMonthNote(monthKey){
  return localStorage.getItem(`calendar:notes:${monthKey}`) || ''
}

export function saveMonthNote(monthKey, note){
  localStorage.setItem(`calendar:notes:${monthKey}`, note)
}

export function loadRanges(monthKey){
  return JSON.parse(localStorage.getItem(`calendar:ranges:${monthKey}`) || '[]')
}

export function loadRangeNote(monthKey, start, end){
  const ranges = loadRanges(monthKey)
  const key = `${toDateKey(start)}_${toDateKey(end)}`
  const r = ranges.find(r=>r.k===key)
  return r ? r.n : ''
}

export function saveRangeNote(monthKey, start, end, note){
  const ranges = loadRanges(monthKey)
  const key = `${toDateKey(start)}_${toDateKey(end)}`
  const idx = ranges.findIndex(r=>r.k===key)
  if(idx >= 0) ranges[idx].n = note
  else ranges.push({k:key, n:note})
  localStorage.setItem(`calendar:ranges:${monthKey}`, JSON.stringify(ranges))
}

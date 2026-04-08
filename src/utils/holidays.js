// Minimal holiday data provider (extend as needed)
export function getHolidays(year){
  // sample holidays; real app would fetch/locale-aware list
  const map = {}
  // US Independence Day
  map[`${year}-07-04`] = 'Independence Day'
  // New Year's Day
  map[`${year}-01-01`] = "New Year's Day"
  // Christmas
  map[`${year}-12-25`] = 'Christmas'
  return map
}

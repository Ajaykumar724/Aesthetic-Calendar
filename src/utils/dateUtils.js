export const toDateKey = (dt) => dt.toISOString().slice(0, 10)
export const isSameDay = (a, b) => a && b && toDateKey(a) === toDateKey(b)
export const clamp = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

export function getMonthMatrix(year, month) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const matrix = []
  let startDay = first.getDay()
  startDay = (startDay + 6) % 7
  let cur = new Date(first)
  cur.setDate(cur.getDate() - startDay)
  while (matrix.length < 6) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cur))
      cur.setDate(cur.getDate() + 1)
    }
    matrix.push(week)
    if (cur > last && matrix.length >= 5) break
  }
  return matrix
}

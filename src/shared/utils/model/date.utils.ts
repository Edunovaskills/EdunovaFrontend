export function getTimezoneOffset() {
  const date = new Date()
  const offsetInMinutes = date.getTimezoneOffset()

  // Convert minutes to hours and minutes
  const hours = Math.floor(Math.abs(offsetInMinutes) / 60)
  const minutes = Math.abs(offsetInMinutes) % 60

  // Format to a string
  const sign = offsetInMinutes > 0 ? '-' : '+'
  const formattedOffset = `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

  return formattedOffset
}

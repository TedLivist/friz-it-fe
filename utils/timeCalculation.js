export const timeCalculation = (now, deadline) => {
  console.log('My time')

  // console.log('date now in milliseconds', now)
  // console.log('date now in seconds', now/1000)

  console.log(new Date(now))
  console.log(new Date(deadline))

  // console.log(new Date(Math.abs(new Date(now) - new Date(deadline))))

  const difference = deadline - now
  console.log('diff', difference)
  const isPast = difference < 0
  console.log('past?', isPast)
  const absoluteDiff = Math.abs(difference)

  const seconds = Math.floor(absoluteDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30.44)
  const years = Math.floor(days / 365.25)

  let timeQuote = ''

  if(years > 0) {
    timeQuote = `${years}y ${months % 12}mo ${Math.floor(days % 30.44)}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`
  } else if (months > 0) {
    timeQuote = `${months}mo ${Math.floor(days % 30.44)}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`
  } else if (days > 0) {
    timeQuote = `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`
  } else if (hours > 0) {
    timeQuote = `${hours}h ${minutes % 60}m ${seconds % 60}s`
  } else if (minutes > 0) {
    timeQuote = `${minutes}m ${seconds % 60}s`
  } else {
    timeQuote = `${seconds}s`
  }

  console.log(timeQuote)
}

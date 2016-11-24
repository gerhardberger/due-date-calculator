const ONE_HOUR_MS = 60 * 60 * 1000
const START_HOUR = 9
const END_HOUR = 17

function isWeekend (startDate) {
  const currentDay = startDate.getDay()
  return (currentDay === 6) || (currentDay === 0)
}

function reduceHours (startDate, remainingTime) {
  const startTime = +startDate

  if (isWeekend(startDate)) {
    const nextDay = new Date(startTime + 24 * ONE_HOUR_MS)
    return reduceHours(nextDay, remainingTime)
  }

  const endTime = startDate.setHours(END_HOUR, 0, 0, 0)
  const difference = endTime - startTime

  if (difference >= remainingTime) {
    return new Date(startTime + remainingTime)
  }

  const nextDay = new Date(endTime +
    (24 - (END_HOUR - START_HOUR)) * ONE_HOUR_MS)
  return reduceHours(nextDay, remainingTime - difference)
}

module.exports = (submitDate, turnaround) => {
  if (!(submitDate instanceof Date)) {
    throw new Error('Submit date must be instance of Date')
  }

  if (turnaround !== parseInt(turnaround, 10)) {
    throw new Error('Turnaround must be integer')
  }

  const remainingTime = turnaround * ONE_HOUR_MS

  return reduceHours(submitDate, remainingTime)
}

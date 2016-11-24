const test = require('ava')
const dueDateCalculator = require('../')

test('wrong submit date type', t => {
  t.throws(() => dueDateCalculator('foo', 0),
    'Submit date must be instance of Date')
  t.throws(() => dueDateCalculator(123, 0),
    'Submit date must be instance of Date')
  t.throws(() => dueDateCalculator(false, 0),
    'Submit date must be instance of Date')
})

test('wrong turnaround type', t => {
  const d = new Date()

  t.throws(() => dueDateCalculator(d, 'foo'), 'Turnaround must be integer')
  t.throws(() => dueDateCalculator(d, false), 'Turnaround must be integer')
  t.throws(() => dueDateCalculator(d, { a: 'b' }),
    'Turnaround must be integer')
  t.throws(() => dueDateCalculator(d, 1.23), 'Turnaround must be integer')
})

test('same day ending', t => {
  const submitDate = new Date('2016-11-24T12:40:00')
  const turnaround = 2

  const d = dueDateCalculator(submitDate, turnaround)
  const r = new Date('2016-11-24T14:40:00')

  t.is(+d, +r)
})

test('just barely not same day ending', t => {
  const submitDate = new Date('2016-11-24T16:10:00')
  const turnaround = 1

  const d = dueDateCalculator(submitDate, turnaround)
  const r = new Date('2016-11-25T09:10:00')

  t.is(+d, +r)
})

test('between two working days', t => {
  const submitDate = new Date('2016-11-24T12:40:00')
  const turnaround = 9

  const d = dueDateCalculator(submitDate, turnaround)
  const r = new Date('2016-11-25T13:40:00')

  t.is(+d, +r)
})

test('friday to monday', t => {
  const submitDate = new Date('2016-11-25T12:40:00')
  const turnaround = 10

  const d = dueDateCalculator(submitDate, turnaround)
  const r = new Date('2016-11-28T14:40:00')

  t.is(+d, +r)
})

test('multiple weeks', t => {
  const submitDate = new Date('2016-11-24T12:40:00')
  const turnaround = 16 * 8 + 3

  const d = dueDateCalculator(submitDate, turnaround)
  const r = new Date('2016-12-16T15:40:00')

  t.is(+d, +r)
})

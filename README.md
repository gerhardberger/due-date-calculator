# Due Date Calculator

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![Build Status](https://travis-ci.org/gerhardberger/due-date-calculator.svg?branch=master)](https://travis-ci.org/gerhardberger/due-date-calculator)

Calculate due dates of bug reports with certain turnaround time.

``` js
const dueDateCalculator = require('due-date-calculator')

const submitDate = new Date('2016-11-22T14:40:00')
const turnaround = 16

console.log(dueDateCalculator(submitDate, turnaround))
// returns 2016.11.24. 14:40
```

## install

```
$ npm i due-date-calculator
```

## usage

#### `dueDateCalculator(submitDate, turnaround)`

- submitDate, `Date` - the submission date of the bug report, **required**
- turnaround, `Number` - the turnaround time of the bug report in *working
  hours*, **required**

Calculates the date, when the bug should be resolved.

## test

```
$ npm test
```

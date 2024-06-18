import {formatCurrency} from '../script/utility/money.js'

console.log('test suite: formatCurrency')

console.log('Convert cents to dollar')

// automated testing
if (formatCurrency(2095) == 20.95) { //basic test case
  console.log('passed') 
} else {
  console.log('failed')
}

console.log('round up')

if (formatCurrency(2095.5) == 20.96) { //edge test case
  console.log('passed') 
} else {
  console.log('failed')
}

console.log('works with 0.00')

if (formatCurrency(0) == 0.00) { //edge test case
  console.log('passed') 
} else {
  console.log('failed')
}

console.log('round down')

if (formatCurrency(2095.45) == 20.95) { //edge test case
  console.log('passed') 
} else {
  console.log('failed')
}
var dataset = require("./dataset.json");

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;

hundredThousandairs = dataset.bankBalances.filter(function(element) {
  return element.amount > 100000;
});

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;

sumOfBankBalances = dataset.bankBalances.reduce(function(total, element) {
  return total + parseInt(element.amount);
}, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */

var sumOfInterests = null;

sumOfInterests = dataset.bankBalances
  // 1) Filter out WI, IL, WY, OH, GA, DE
  .filter(function(element) {
    return (
      element.state === "WI" ||
      element.state === "IL" ||
      element.state === "WY" ||
      element.state === "OH" ||
      element.state === "GA" ||
      element.state === "DE"
    );
  })
  // 2) Map 18.9% onto each amount
  .map(function(element) {
    return {
      amount: Math.round(parseInt(element.amount) * 0.189),
      state: element.state
    };
  })
  // 3) Reduce all amounts into a single sum
  .reduce(function(total, element) {
    return total + element.amount;
  }, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

    {'HI': '100000',
     'OR': '200000',
     'WA': '150000'}

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */

var stateSums = {};

stateSums = dataset.bankBalances.reduce(function(accumulator, element) {
  if (element.state in accumulator) {
    accumulator[element.state] += Math.round(element.amount);
  } else {
    accumulator[element.state] = Math.round(element.amount);
  }
  return accumulator;
}, {});

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var sumOfHighInterests = null;

sumOfHighInterests = Object.entries(
  dataset.bankBalances
    // 1) Filter out WI, IL, WY, OH, GA, DE
    .filter(function(element) {
      return (
        element.state !== "WI" &&
        element.state !== "IL" &&
        element.state !== "WY" &&
        element.state !== "OH" &&
        element.state !== "GA" &&
        element.state !== "DE"
      );
    })
    // 2) Reduce each state to a single sum
    .reduce(function(accumulator, element) {
      if (element.state in accumulator) {
        accumulator[element.state] += Math.round(element.amount);
      } else {
        accumulator[element.state] = Math.round(element.amount);
      }
      return accumulator;
    }, {})
)
  // 3) Map 18.9% onto each state sum
  // (and convert back to an array of objects)
  .map(function(element) {
    let object = {
      amount: Math.round(parseInt(element[1]) * 0.189),
      state: element[0]
    };
    return object;
  })
  // 4) Filter out the interest values that are 50,000 or less
  .filter(function(element) {
    return element.amount > 50000;
  })
  // 5) Reduce the interest values to a single sum
  .reduce(function(total, element) {
    return total + parseInt(element.amount);
  }, 0);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

lowerSumStates = Object.entries(
  dataset.bankBalances.reduce(function(accumulator, element) {
    if (element.state in accumulator) {
      accumulator[element.state] += Math.round(element.amount);
    } else {
      accumulator[element.state] = Math.round(element.amount);
    }
    return accumulator;
  }, {})
)
  .filter(function(element) {
    return element[1] < 1000000;
  })
  .map(function(element) {
    return element[0];
  });

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

higherStateSums = Object.entries(
  // hash table
  dataset.bankBalances.reduce(function(accumulator, element) {
    if (element.state in accumulator) {
      accumulator[element.state] += Math.round(element.amount);
    } else {
      accumulator[element.state] = Math.round(element.amount);
    }
    return accumulator;
  }, {})
)
  .filter(function(element) {
    return element[1] > 1000000;
  })
  .reduce(function(total, element) {
    return total + parseInt(element[1]);
  }, 0);

console.log(higherStateSums);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;

module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};

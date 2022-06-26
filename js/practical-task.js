"use strict";

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
function secondsToDate(seconds) {
  const date = new Date(2020, 5, 1, 0, 0, 0.00202);

  date.setSeconds(date.getSeconds() + seconds);

  return date;
}

/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
  return (decimal >>> 0).toString(2);
}

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 3
 *      'T', 'test it' -> 3
 */
function substringOccurrencesCounter(substring, text) {
  const regex = new RegExp(substring, "gi");

  return (text.match(regex) || []).length;
}

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {
  const lettersByOccurrences = new Map();
  const letters = [...string];
  let result = string;

  letters.forEach((letter) => {
    const occurrences = lettersByOccurrences.get(letter);

    lettersByOccurrences.set(letter, occurrences ? occurrences + 1 : 1);
  });
  lettersByOccurrences.forEach((occurrences, letter) => {
    if (occurrences == 1) {
      result = result.replace(new RegExp(letter, "g"), letter + letter);
    }
  });

  return result;
}

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {
  return () => {
    return str;
  };
}

/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
  const rodA = [];
  const rodB = [];
  const rodC = [];

  for (let i = disks; i > 0; i--) {
    rodA.push(i);
  }

  function move(n, source, target, auxiliary) {
    if (n > 0) {
      move(n - 1, source, auxiliary, target);
      target.push(source.pop());
      move(n - 1, auxiliary, target, source);
    }
  }

  move(disks, rodA, rodC, rodB);
}

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
  const result = [];

  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix1[i].length; j++) {
      for (let k = 0; k < matrix1[i].length; k++) {
        result[i][j] =
          (result[i][j] ? result[i][j] : 0) + matrix1[i][k] * matrix2[k][j];
      }
    }
  }

  return result;
}

/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(2)(3)(5)(4)(6)(0).get()  ➞ "hello!"
 */
function gather(str) {
  const letters = [];
  const indexes = [];

  const inner = (str) => {
    letters.push(str);

    const order = (index) => {
      indexes.push(index);

      const get = () => {
        const result = [];

        for (let i = 0; i <= indexes.length && i <= letters.length; i++) {
          result[indexes[i]] = letters[i];
        }

        return result.join("");
      };

      order.get = get;

      return order;
    };

    inner.order = order;

    return inner;
  };

  return inner(str);
}

module.exports = {
  secondsToDate,
  toBase2Converter,
  substringOccurrencesCounter,
  repeatingLitters,
  redundant,
  towerHanoi,
  matrixMultiplication,
  gather,
};

const tasks = require("./practical-task");

describe("Practical task", () => {
  it.each([
    [31536000, new Date(2021, 5, 1)],
    [0, new Date(2020, 5, 1)],
    [86400, new Date(2020, 5, 2)],
  ])("converts seconds (%p) expecting a date (%p)", (seconds, result) => {
    expect(tasks.secondsToDate(seconds)).toStrictEqual(result);
  });

  it.each([
    [5, "101"],
    [10, "1010"],
    [-26710, "11111111111111111001011110101010"],
  ])("converts %p to binary expecting %p", (decimal, result) => {
    expect(tasks.toBase2Converter(decimal)).toBe(result);
  });

  it.each([
    ["a", "test it", 0],
    ["t", "test it", 3],
    ["T", "test it", 3],
  ])(
    "counts number of occurrences (%p) in %p expecting %p times",
    (substring, text, result) => {
      expect(tasks.substringOccurrencesCounter(substring, text)).toBe(result);
    }
  );

  it.each([
    ["Hello", "HHeelloo"],
    ["Hello world", "HHeello  wworrldd"],
  ])(
    "repeats non-recurring characters in %p expecting %p",
    (string, result) => {
      expect(tasks.repeatingLitters(string)).toBe(result);
    }
  );

  it.each([["apple"], ["pear"], [""]])(
    "returns a function that returns str (%p)",
    (string) => {
      expect(tasks.redundant(string)()).toBe(string);
    }
  );

  it.each([[4]])("solves Tower of Hanoi with %p disks problem", (disks) => {
    tasks.towerHanoi(disks);
  });

  it.each([
    [
      [
        [1, 2, 3],
        [3, 2, 3],
        [6, 2, 2],
      ],
      [
        [6, 2, 3],
        [1, 1, 1],
        [2, 4, 1],
      ],
      [
        [14, 16, 8],
        [26, 20, 14],
        [42, 22, 22],
      ],
    ],
    [
      [
        [2, 2],
        [2, 3],
      ],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [4, 4],
        [5, 5],
      ],
    ],
  ])(
    "multiplies two matrices %o and %o expecting %o",
    (matrix1, matrix2, result) => {
      expect(tasks.matrixMultiplication(matrix1, matrix2)).toStrictEqual(
        result
      );
    }
  );

  test("orders letters according to specified positions", () => {
    expect(tasks.gather("a")("b")("c").order(1)(2)(3).get()).toBe("abc");
    expect(tasks.gather("a")("b")("c").order(2)(1)(0).get()).toBe("cba");
    expect(
      tasks.gather("e")("l")("o")("l")("!")("h").order(2)(3)(5)(4)(6)(0).get()
    ).toBe("hello!");
  });
});

const {
   createCountObject,
   getMode,
   getMean,
   getMedian,
   convertToArrayOfNumbers,
} = require('./models');

describe('getMean function', function () {
   test('1. get the mean', function () {
      expect(getMean([1, -1, 2, 2])).toEqual(1);
   });
   test('2. get the mean of an empty array', function () {
      expect(getMean([])).toEqual(0);
   });
});

describe('getMedian function', function () {
   test('1. get the median if an even amount of numbers', function () {
      expect(getMedian([1, -1, 2, 4, 7, 5])).toEqual(3);
   });
   test('2. get the median if an odd amount of numbers', function () {
      expect(getMedian([1, -1, 2, 4, 2])).toEqual(2);
   });
});

describe('getMode function', function () {
   test('1. get the mode', function () {
      expect(getMode([1, 2, 3, 4, 1, 2, 3, 4, 1, 2])).toEqual(1);
   });
});

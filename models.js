// Functions

// creates an object that counts how many times a number showed up in the provided array
// example[1, 2, 2, 3] | output = {1:1, 2:2, 3:1}
function createCountObject(arr) {
   return arr.reduce(function (acc, next) {
      acc[next] = (acc[next] || 0) + 1;
      return acc;
   }, {});
}

// get the mean from a provided array
function getMean(nums) {
   if (nums.length === 0) return 0;
   console.log(nums);
   // reduce(callback, initialVal) | initialValue: optional value to initialize the acc (if not provided, the first element of the array is used as the initial accumulator value)
   // callback(accumulator, currentVal) | keeps track of the accumulated result

   // let nums = [1, 2, 3, 4];
   // First iteration:                 Second iteration:
   // acc = 1 (initial value)          acc = 3 (result from first)
   // cur = 2                          cur = 3
   // acc + cur = 3                    acc + cur = 6

   return (
      nums.reduce(function (acc, currentVal) {
         return acc + currentVal;
      }) / nums.length
   );
}

// get the median from a provided array
function getMedian(nums) {
   nums.sort((a, b) => a - b); //sorts in ascending order
   // nums.sort((a, b) => b - a); // descending

   let median;
   let middleIndex = Math.floor(nums.length / 2);

   if (nums.length % 2 === 0) {
      // if the provided nums length is even, then take the two middle numbers and divide them by two
      median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
   } else {
      // if the provided nums length is odd, then the median is just the middle index
      median = nums[middleIndex];
   }
   return median;
}

// get the mode from a provided array
function getMode(arr) {
   let frequencyObj = createCountObject(arr); // using the countObject function to get an Object
   let temp = 0; // initializing temp and mostFrequent variable
   let mostFrequent;

   for (let key in frequencyObj) {
      // frequencyObj = {1:1, 2:2, 3:1}
      // for each key (1,2,3) | if the value, obj[key], (1,2,1) is greater than temp, then make it the mostFrequent
      if (frequencyObj[key] > temp) {
         mostFrequent = key;
         temp = frequencyObj[key]; // temp is now the current value for the next run through the loop
      }
   }

   return +mostFrequent; //+ converts the value to a number because keys in an object are always strings
}

function convertToArrayOfNumbers(stringsArr) {
   let result = []; // initializing

   for (let i = 0; i < stringsArr.length; i++) {
      let strToNum = Number(stringsArr[i]); //for each i, converts string to a number | Number("42") > 42

      if (Number.isNaN(strToNum)) {
         // if the number is NaN, return an error
         return new Error(
            `The value '${stringsArr[i]}' at index ${i} is not a valid number`
         );
      }

      result.push(strToNum); // if a number, push to the result array
   }
   return result; // return the array of valid numbers
}

module.exports = {
   createCountObject,
   getMean,
   getMedian,
   getMode,
   convertToArrayOfNumbers,
};

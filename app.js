const express = require('express');
const ExpressError = require('./expressError');
const {
   createCountObject,
   getMode,
   getMean,
   getMedian,
   convertToArrayOfNumbers,
} = require('./models');

const app = express();
app.use(express.json()); //parse JSON
app.use(express.urlencoded({ extended: true })); //parse form data

app.get('/', (request, response) => {
   response.send('Landing page');
});

// NOTE: query syntax | /mean?nums=1,3,5,7 | request.query = { nums: '1,3,5,7' } | returns as a string

app.get('/mean', (request, response) => {
   if (!request.query.nums) {
      throw new ExpressError(
         "You must pass a query key of 'nums' with a comma-separated list of numbers",
         400
      );
   }
   let requestNums = request.query.nums.split(','); //converts into an array of strings ['1','3','5','7']
   let nums = convertToArrayOfNumbers(requestNums); //converts to an array of numbers   [1, 3, 5, 7]
   if (nums instanceof Error) {
      // if the convert function results in an error (error handling within the function), then we can display that error
      throw new ExpressError(nums.message);
   }

   //result if no error is thrown | return as a JSON object
   let result = {
      operation: 'mean',
      result: getMean(nums),
   };

   return response.send(result);
});

app.get('/median', (request, response) => {
   if (!request.query.nums) {
      throw new ExpressError(
         "You must pass a query key of 'nums' with a comma-separated list of numbers",
         400
      );
   }
   let requestNums = request.query.nums.split(',');
   let nums = convertToArrayOfNumbers(requestNums);
   if (nums instanceof Error) {
      throw new ExpressError(nums.message);
   }

   let result = {
      operation: 'median',
      result: getMedian(nums),
   };

   return response.send(result);
});

app.get('/mode', (request, response) => {
   if (!request.query.nums) {
      throw new ExpressError(
         "You must pass a query key of 'nums' with a comma-separated list of numbers",
         400
      );
   }
   let requestNums = request.query.nums.split(',');
   let nums = convertToArrayOfNumbers(requestNums);
   if (nums instanceof Error) {
      throw new ExpressError(nums.message);
   }

   let result = {
      operation: 'mode',
      result: getMode(nums),
   };

   return response.send(result);
});

// **Error handler
app.use((request, response, next) => {
   const error = new ExpressError('Page Not Found', 404);
   next(error); //whatever is passed into next() will be passed as the first param in the error handler function (below) | catch(error)
});

// **Error handler | put right before app.listen() | app.use() | on every request, i want you to do this
app.use(function (error, request, response, next) {
   // express knows its an errorhandler because of the 4 params
   let status = error.status || 500; // the default status is 500 Internal Server Error
   let message = error.message;

   // set the status and alert the user
   return response.status(status).json({
      error: { message, status },
   });
});

// **END**
app.listen(3000, function () {
   console.log('App starting on port 3000');
});

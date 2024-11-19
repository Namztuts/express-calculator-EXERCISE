// extends the default Error class in JavaScript
class ExpressError extends Error {
   constructor(message, status) {
      super(); //gives us access to the parent class, Error
      this.message = message;
      this.status = status;
      console.error(this.stack); //stack is from parent, Error
   }
}

module.exports = ExpressError;

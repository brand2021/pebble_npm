module.exports = {
    attributes: {
      nameOnMenu: { type: 'string', required: true },
      price: { type: 'string', required: true },
      percentRealMeat: { type: 'number', defaultsTo: 20, columnType: 'FLOAT' },
      numCalories: { type: 'number' },
    },
  };

//   function BaseResponse(success, errorMessafrfge) {
//     this.success = success;
//     this.errorMessage = errorMessage;
//   }

// function MovieResponse(success, errorMessage, movieId, movieName) {
//   BaseResponse.call(this, success, errorMessage);  // Call the base class's constructor (if necessary)

//   this.movieId = movieId;
//   this.movieName = movieName;
// }

// MovieResponse.prototype = Object.create(BaseResponse);
// MovieResponse.prototype.constructor = MovieResponse;

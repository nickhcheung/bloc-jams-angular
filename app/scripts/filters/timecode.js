(function(){
  /*
  * @function timecode
  * @desc Filter function we use to return a duration (in seconds) into MM:SS format
  * @param {number}
  * @return {string} the concatenation of numbers in our desired format
  */
  function timecode(){
    return function(seconds){

      if(Number.isNaN(seconds)){
        return "00:00";
      };

      var output = buzz.toTimer(seconds);

      return output;
    };
  };

  angular
    .module("blocJams")
    .filter("timecode", timecode);
})();

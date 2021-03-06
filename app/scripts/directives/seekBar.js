(function(){
  function seekBar($document){

    /*
    * @function calculatePercent
    * @desc called from onClickSeekBar and trackThumb to calculate the place in the seek bar we are
    * @param {element} seekBar, {element} event
    * @return {number} the value of the seek bar position
    */
    var calculatePercent = function(seekBar, event){
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);

      return offsetXPercent;
    };

    return {
      restrict: "E",
      templateUrl: "/templates/directives/seek_bar.html",
      replace: true,
      scope: {
        onChange: "&"
      },
      link: function(scope, element, attributes){
        /*
        * @desc A value of the position in the seek bar, we set with onClickSeekBar and trackThumb
        * @type {Number}
        */
        scope.value = 0;
        /*
        * @desc Static value representing the total seek bar length
        * @type {Number}
        */
        scope.max = 100;

        /*
        * @desc Holds the jQuery element that we will manipulate
        * @type {element}
        */
        var seekBar = $(element);

        attributes.$observe("value", function(newValue){
          scope.value = newValue;
        });

        attributes.$observe("max", function(newValue){
          scope.max = newValue;
        });

        /*
        * @function percentString
        * @desc Calculates the percentage of the seek bar
        * @return {string} returns value as a string for use in styling
        */
        var percentString = function(){
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        /*
        * @function fillStyle
        * @desc Turns the percentString into a width property to use in styling
        * @return {attribute} to be used from ng-style directive
        */
        scope.fillStyle = function(){
          return {width: percentString()};
        };

        /*
        * @function thumbStyle
        * @desc Turns the percentString into an distance-left property to use in styling
        * @return {attribute} to be used from ng-style directive
        */
        scope.thumbStyle = function(){
          return {left: percentString()};
        };

        /*
        * @function onClickSeekBar
        * @desc Sets scope.value to the percentage of the seek bar at position of click
        * @param {element} event
        */
        scope.onClickSeekBar = function(event){
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };

        /*
        * @function trackThumb
        * @desc Tracks thumb drag on seek bar and sets scope.value to it's percentage
        */
        scope.trackThumb = function(){

          $document.bind("mousemove.thumb", function(event){
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function(){
              scope.value = percent * scope.max;
              notifyOnChange(scope.value);
            });
          });

          $document.bind("mouseup.thumb", function(){
            $document.unbind("mousemove.thumb");
            $document.unbind("mouseup.thumb");
          });
        };

        /*
        * @function notifyOnChange
        * @desc Tests to make sure onChange is a function, and then updates the value passed to the setCurrentTime function
        * @param {number}
        */
        var notifyOnChange = function(newValue){
          if(typeof scope.onChange === "function"){
            scope.onChange({value: newValue});
          }
        };

      }
    };
  }

  angular
    .module("blocJams")
    .directive("seekBar", ["$document", seekBar]);
})();

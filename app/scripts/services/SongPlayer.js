(function(){
  function SongPlayer(){
    /*
    * @desc Empty SongPlayer object
    * @type {Object}
    */
    var SongPlayer = {};

    /*
    * @desc Object that gets set equal to the song object that is selected, used for checking conditionals
    * @type {Object}
    */
    var currentSong = null;

    /*
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /*
    * @function setSong
    * @desc Stops current playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song){
      if(currentBuzzObject){
        currentBuzzObject.stop();
        currentSong.playing = null;
      };

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ["mp3"],
        preload: true
      });

      currentSong = song;
    };

    /*
    * @function playSong
    * @desc Plays song file (currentBuzzObject) and sets the .playing attribute to true
    * @param {Object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };
    /*
    * @function play
    * @desc a public method that checks which item we clicked, and executes setSong and playSong accordingly
    * @param {Object} song
    */
    SongPlayer.play = function(song){

      if(currentSong !== song){
        setSong(song);
        playSong(song);
      } else if(currentSong === song){
        if(currentBuzzObject.isPaused()){
          playSong();
        };
      };
    };

    /*
    * @function pause
    * @desc a public method that pauses the song and sets the .playing attribute to false when we click on the pause button
    * @param {Object} song
    */
    SongPlayer.pause = function(song){
      currentBuzzObject.pause();
      song.playing = false;
    };


    return SongPlayer;
  };

  angular
    .module("blocJams")
    .factory("SongPlayer", SongPlayer);
})();

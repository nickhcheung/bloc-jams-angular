(function(){
  function SongPlayer($rootScope, Fixtures){
    /*
    * @desc Empty SongPlayer object
    * @type {Object}
    */
    var SongPlayer = {};

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
        SongPlayer.currentSong.playing = null;
      };

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ["mp3"],
        preload: true
      });

      currentBuzzObject.bind("timeupdate", function(){
        $rootScope.$apply(function(){
          SongPlayer.currentTime = currentBuzzObject.getTime();
          //conditional checks if song has ended and executes next method
          if(currentBuzzObject.isEnded()){
            SongPlayer.next();
          };
        });
      });

      SongPlayer.currentSong = song;
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
    * @function stopSong
    * @desc Stops song file (currentBuzzObject) and sets the .playing attribute to null
    * @param {Object} song
    */
    var stopSong = function(){
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    /*
    * @function getSongIndex
    * @desc Returns the index of the song in the album
    * @param {Object} song
    * @return index of song in the songs object of the album
    */
    var getSongIndex = function(song){
      return SongPlayer.currentAlbum.songs.indexOf(song);
    };

    /*
    * @desc Public Attribute equal to the current album defined in fixtures
    * @type {Object}
    */
    SongPlayer.currentAlbum = Fixtures.currentAlbum;

    /*
    * @desc Public Object that gets set equal to the song object that is selected, used for checking conditionals
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /*
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;

    /*
    * @desc Current volume
    * @type {Number}
    */
    SongPlayer.volume = 80;

    /*
    * @desc Current volume switch
    * @type {boolean}
    */
    SongPlayer.volumeOn = true;

    /*
    * @function play
    * @desc a public method that checks which item we clicked, and executes setSong and playSong accordingly
    * @param {Object} song
    */
    SongPlayer.play = function(song){
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !== song){
        setSong(song);
        playSong(song);
      } else if(SongPlayer.currentSong === song){
        playSong(song);
      };
    };

    /*
    * @function pause
    * @desc a public method that pauses the song and sets the .playing attribute to false when we click on the pause button
    * @param {Object} song
    */
    SongPlayer.pause = function(song){
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /*
    * @function previous
    * @desc a public method that sets the song's index, decrements it, and then executes setSong and playSong accordingly
    */
    SongPlayer.previous = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong();
      } else {
        var song = SongPlayer.currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      };
    };

    /*
    * @function next
    * @desc a public method that sets the song's index, increments it, and then executes setSong and playSong accordingly
    */
    SongPlayer.next = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > SongPlayer.currentAlbum.songs.length - 1) {
        stopSong();
      } else {
        var song = SongPlayer.currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      };
    };

    /*
    * @function setCurrentTime
    * @desc Set current time (in seconds) of currently playing song
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
        if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
        };
    };

    /*
    * @function setVolume
    * @desc Set current time (in seconds) of currently playing song
    * @param {Number} time
    */
    SongPlayer.setVolume = function(volume) {
      if(currentBuzzObject){
        currentBuzzObject.setVolume(volume)
      };
    };

    /*
    * @function muteVolume
    * @desc Used to toggleMute as well as set boolean for ng-show conditional on mute and sound buttons
    */
    SongPlayer.muteVolume = function(){

      if(currentBuzzObject.isMuted() === false){
        currentBuzzObject.toggleMute();
        SongPlayer.volumeOn = false;
      } else if(currentBuzzObject.isMuted() === true){
        currentBuzzObject.toggleMute();
        SongPlayer.volumeOn = true;
      };
    };

    return SongPlayer;
  };

  angular
    .module("blocJams")
    .factory("SongPlayer", ["$rootScope", "Fixtures", SongPlayer]);
})();

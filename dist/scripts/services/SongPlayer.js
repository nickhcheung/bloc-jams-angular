(function(){
  function SongPlayer(Fixtures){
    /*
    * @desc Empty SongPlayer object
    * @type {Object}
    */
    var SongPlayer = {};

    /*
    * @desc Equal to the album defined in fixtures
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

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
    * @function getSongIndex
    * @desc Returns the index of the song in the album
    * @param {Object} song
    * @return index of song in the songs object of the album
    */
    var getSongIndex = function(song){
      return currentAlbum.songs.indexOf(song);
    };

    /*
    * @desc Public Object that gets set equal to the song object that is selected, used for checking conditionals
    * @type {Object}
    */
    SongPlayer.currentSong = null;

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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /*
    * @function previous
    * @desc a public method that incremenets sets the current song's index and decrements
    */
    SongPlayer.previous = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      };
    };

    return SongPlayer;
  };

  angular
    .module("blocJams")
    .factory("SongPlayer", ["Fixtures", SongPlayer]);
})();

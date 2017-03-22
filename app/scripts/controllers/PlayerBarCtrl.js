(function(){
  function PlayerBarCtrl(SongPlayer){
    this.albumData = SongPlayer.currentAlbum;
    this.songPlayer = SongPlayer;
  }

  angular
    .module("blocJams")
    .controller("PlayerBarCtrl", ["SongPlayer", PlayerBarCtrl]);
})();

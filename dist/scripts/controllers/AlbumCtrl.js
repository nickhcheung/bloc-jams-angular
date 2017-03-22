(function(){
  function AlbumCtrl(Fixtures, SongPlayer){
    this.albumData = Fixtures.currentAlbum;
    this.songPlayer = SongPlayer;
  }

  angular
    .module("blocJams")
    .controller("AlbumCtrl", ["Fixtures", "SongPlayer", AlbumCtrl]);

})();

(function(){
  function CollectionCtrl(Fixtures){
    this.albums = [];

    this.albums.push(Fixtures.getAlbum());
    this.albums.push(Fixtures.getSecondAlbum());
  }

  angular
    .module("blocJams")
    .controller("CollectionCtrl", ["Fixtures", CollectionCtrl]);

})();

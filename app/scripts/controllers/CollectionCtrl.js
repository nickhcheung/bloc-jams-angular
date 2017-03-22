(function(){
  function CollectionCtrl(Fixtures){

    this.albums = Fixtures.getCollection();
    this.setAlbum = Fixtures.setAlbum;

  }

  angular
    .module("blocJams")
    .controller("CollectionCtrl", ["Fixtures", CollectionCtrl]);

})();

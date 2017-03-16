(function(){
  function CollectionCtrl(){
    this.albums = [];

    this.albums.push(angular.copy(albumPicasso));
    this.albums.push(angular.copy(wakingAtDawn));
  }

  angular
    .module("blocJams")
    .controller("CollectionCtrl", CollectionCtrl);
})();

(function(){
  function Fixtures(){
    var Fixtures = {};

    var albumPicasso = {
      title: "The Colors",
      artist: "Pablo Picasso",
      label: "Cubism",
      year: "1881",
      albumArtUrl: "/assets/images/album_covers/13.png",
      songs: [
        { title: "Blue", duration: 161.71, audioUrl: "/assets/music/blue"},
        { title: "Green", duration: 103.96, audioUrl: "/assets/music/green" },
        { title: "Red", duration: 268.45, audioUrl: "/assets/music/red" },
        { title: "Pink", duration: 153.14, audioUrl: "/assets/music/pink" },
        { title: "Magenta", duration: 374.22, audioUrl: "/assets/music/magenta" }
      ]
    };

    var wakingAtDawn = {
      title: "Waking At Dawn",
      artist: "ROY WOOD$",
      label: "OVO Sound",
      year: "2016",
      albumArtUrl: "/assets/images/album_covers/waking_at_dawn.jpeg",
      songs: [
        { title: "Sonic Boom", duration: 184.95, audioUrl: "/assets/music/waking_at_dawn/Sonic_Boom"},
        { title: "You Love It", duration: 186.44, audioUrl: "/assets/music/waking_at_dawn/You_Love_It" },
        { title: "Gwan Big Up Urself", duration: 200.08, audioUrl: "/assets/music/waking_at_dawn/Gwan_Big_Up_Urself" },
        { title: "How I Feel", duration: 223.95, audioUrl: "/assets/music/waking_at_dawn/How_I_Feel" },
        { title: "Down Girl", duration: 169.67, audioUrl: "/assets/music/waking_at_dawn/Down_Girl" },
        { title: "Switch", duration: 201.38, audioUrl: "/assets/music/waking_at_dawn/Switch" },
        { title: "Got Me", duration: 218.15, audioUrl: "/assets/music/waking_at_dawn/Got_Me" },
        { title: "Why", duration: 262.40, audioUrl: "/assets/music/waking_at_dawn/Why" },
        { title: "Menace", duration: 293.78, audioUrl: "/assets/music/waking_at_dawn/Menace" },
        { title: "She Knows About Me", duration: 220.48, audioUrl: "/assets/music/waking_at_dawn/She_Knows_About_Me" }
      ]
    };

    /*
    * @desc A public attribute to store the selected album
    * @type {Object}
    */
    Fixtures.currentAlbum = null;

    //Used for Collection View page as a single call, where as the album view will still need to call one of the above methods
    Fixtures.getCollection = function (){
      return [albumPicasso, wakingAtDawn];
    };

    /*
    * @function setAlbum
    * @desc On click of the album on the collection page, it will set currentAlbum equal to the album of the item we clicked
    * @param {number}
    */
    Fixtures.setAlbum = function(id){
      if(id === 0){
        Fixtures.currentAlbum = albumPicasso;
      } else if(id === 1){
        Fixtures.currentAlbum = wakingAtDawn;
      };
    };

    return Fixtures;
  }

  angular
    .module("blocJams")
    .factory("Fixtures", Fixtures);
})();

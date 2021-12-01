// Client facing scripts here
<<<<<<< HEAD
// $(document).ready (function() {

//   // initiate map with google api
//   let map;
//   function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom: 8,
//     });
//   }

//   map(db);
// })




console.log('THIS IS FROM APP.JS');
=======
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  map.addListener("click", (e) => {
    placeMarkerAndPanTo(e.latLng, map);
  });
}

function placeMarkerAndPanTo(latLng, map) {
  new google.maps.Marker({
    position: latLng,
    map: map,
  });
  map.panTo(latLng);
}
>>>>>>> 3e56a6710f1333865a321c9b088e4db8d5b3e584

// $(document).ready(function(){
  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: { lat: -25.363882, lng: 131.044922 },
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
    // why don't console.logs go to my terminal
    let Lat = latLng.lat();
    let Lng = latLng.lng();
    console.log('Lat:', latLng.lat());
    console.log('Lng:', latLng.lng());
    map.panTo(latLng);
  }

// })

const { application } = require("express");
const { render } = require("sass");

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: parseFloat(currentMap.center_lat),lng:  parseFloat(currentMap.center_lng) },
  });


  function placeMarker(lat, lng, markerInfo) {
    const marker = new google.maps.Marker({
      position: {lat, lng},
      map: map
    })
    const infowindow = new google.maps.InfoWindow({
      content: `
        <div> ${markerInfo.title}</div>
        <div> ${markerInfo.description}</div>
      `,
    });

    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });

  }
  for (let marker of markers) {
    placeMarker(parseFloat(marker.lat), parseFloat(marker.lng), marker);
  }


map.addListener("click", (e) => {
  placeMarkerAndPanTo(e.latLng, map);
});

let autocomplete;

  autocomplete = new google.maps.places.Autocomplete (
    document.getElementById('autocomplete'),
    {
      types: ['establishment'],
      componentRestrictions: {'country': ['CA', 'US']},
      fileds: ['place_id', 'geometry', 'name']

    });

const mapSearchBtn = getComputedStyle('GoBtn');
const searchBox = new google.maps.places.SeachBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

   
}

function placeMarkerAndPanTo(latLng, map) {
  new google.maps.Marker({
    position: latLng,
    map: map,
  });
  // let Lat = latLng.lat();
  // let Lng = latLng.lng();
  console.log('Lat:', latLng.lat());
  console.log('Lng:', latLng.lng());
  map.panTo(latLng);
  $('#marker_latitude').val(latLng.lat().toFixed(6));
  $('#marker_longitude').val(latLng.lng().toFixed(6));
}


  
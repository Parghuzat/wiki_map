function initMap() {
       const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: window.currentMap ? { lat: parseFloat(currentMap.center_lat),lng:  parseFloat(currentMap.center_lng) } : { lat: 24.162776, lng: -77.583647 },
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
    for (let marker of window.markers || []) {
      placeMarker(parseFloat(marker.lat), parseFloat(marker.lng), marker);
    }


    map.addListener("click", (e) => {
      placeMarkerAndPanTo(e.latLng, map);
    });

    let autocomplete;
    // function initAutocomplete() {
      autocomplete = new google.maps.places.Autocomplete (
        document.getElementById('autocomplete'),
        {
          types: ['establishment'],
          componentRestrictions: {'country': ['CA', 'US']},
          fileds: ['place_id', 'geometry', 'name']

        });
      // const mapSearchBtn = getComputedStyle('GoBtn');
      // const searchBox = new google.maps.places.SeachBox(input);
      // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      // map.addListener('bounds_changed', () => {
      //   searchBox.setBounds(map.getBounds());
      // });
    // }
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
    $('#map_latitude').val(latLng.lat().toFixed(6));
    $('#map_longitude').val(latLng.lng().toFixed(6));
  }
$(document).ready(function() {
  $('#addmap').hide()
  $('#map_button').on('click', e => {
    $('#addmap').slideDown(500);
  })
})

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
    autocomplete = new google.maps.places.Autocomplete (
      document.getElementById('autocomplete'),
      {
        types: ['establishment'],
        componentRestrictions: {'country': ['CA', 'US']},
        fileds: ['place_id', 'geometry', 'name']

      });
      const input = document.getElementById("autocomplete");
      const searchBox = new google.maps.places.SearchBox(input);
    
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });
    
      let markers = [];
    
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
    
        if (places.length == 0) {
          return;
        }
    
        // Clear out the old markers.
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];
    
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
    
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
    
          const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };
    
          // Create a marker for each place.
          markers.push(
            new google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
            })
          );
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
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
  $('#addmap').hide();
  $('#map_button').on('click', e => {
    $('#addmap').slideDown(500);
  });

  // $('#GoBtn')

})

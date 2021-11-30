// Client facing scripts here
  let map;
  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }


  // eventLIstener to get lat and long from googe api upon click
  // then add to form

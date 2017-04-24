var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45, lng: -85},
        zoom: 8
    });
}
// app/static/js/script.js

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644}
    });


    var markers = [];

    function addMarker(posto) {
        var marker = new google.maps.Marker({
            position: {lat: posto.latitude, lng: posto.longitude},
            map: map,
            title: 'Posto Pluviométrico ' + posto.id
        });

       
        markers.push(marker);

        
        marker.addListener('click', function() {
           
            getPostoData(posto.id);
        });
    }

   
    function clearMarkers() {
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
    }

   
    function getPostoData(postoId) {
        
        alert('Dados do Posto Pluviométrico ' + postoId);
    }

   
    var postos = [
        { id: 1, latitude: -34.5, longitude: 150.6 },
        { id: 2, latitude: -34.6, longitude: 150.7 },
        { id: 3, latitude: -34.7, longitude: 150.8 }
    ];

    
    postos.forEach(function(posto) {
        addMarker(posto);
    });
}

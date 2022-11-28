function createMap() {

    // 'map' is the id we wwant to dispaly the map, 4 is the zoom level
    var map = L.map('map').setView([41.980264315, -87.913624596], 4);
    mapLink = 
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';

    // the tiles is the tile server, tile web map
    // reference from: http://bl.ocks.org/d3noob/9150014
    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 19,}).addTo(map);

    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

    var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

    //
    // create marker with different colors to represent the top 20 trips with higher tips in March, June and September in 2021
    // red: March
    // green: June
    // blue: September
    //
    for (var i = 0; i < taxiTrips3.length; i++) {
        marker = new L.marker([taxiTrips3[i][5],taxiTrips3[i][6]], {icon: redIcon})
            .bindPopup("Company: " + taxiTrips3[i][4] +'<br>' + "Tips: $" + taxiTrips3[i][3] + '<br>' + "Fare: $" + taxiTrips3[i][2] + '<br>' + "Trip Miles: " + taxiTrips3[i][1])
            .addTo(map);
    }

    for (var i = 0; i < taxiTrips6.length; i++) {
        marker1 = new L.marker([taxiTrips6[i][5],taxiTrips6[i][6]], {icon:greenIcon})
            .bindPopup("Company: " + taxiTrips6[i][4] + '<br>' + "Tips: $" + taxiTrips6[i][3] + '<br>' + "Fare: $" + taxiTrips6[i][2] + '<br>' + "Trip Miles: " + taxiTrips6[i][1])
            .addTo(map);
    }

    for (var i = 0; i < taxiTrips9.length; i++) {
        marker1 = new L.marker([taxiTrips9[i][5],taxiTrips9[i][6]])
            .bindPopup("Company: " + taxiTrips9[i][4] + '<br>' + "Tips: $" + taxiTrips9[i][3] + '<br>' + "Fare: $" + taxiTrips9[i][2] + '<br>' + "Trip Miles: " + taxiTrips9[i][1])
            .addTo(map);
    }

}


function init(){
    createMap();
}

window.onload = init;

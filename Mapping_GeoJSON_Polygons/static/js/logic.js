
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    id: "mapbox/streets-v11",
        weight: 2,
    accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    id: "mapbox/satellite-streets-v11",
    maxZoom: 18,
    accessToken: API_KEY
});


// Then we add our 'graymap' tile layer to the map.
var baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};


// Create the map object with center and zoom level.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, null, {collapsed:false}).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/iprudhomme/Mapping_Earthquakes/main/torontoNeighborhoods.json";


var myStyle = {
  "color": "blue",
  "weight": 1,
  "fillColor": "yellow",
  "fillOpacity": 0.15

};

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties) {
      layer.bindPopup("<h3>Neighborhood: : " + feature.properties.AREA_NAME + "</h3>");
  }
}  
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  style: myStyle,
  onEachFeature: onEachFeature
}).addTo(map);
});



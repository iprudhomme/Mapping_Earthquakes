
// We create the tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    id: "mapbox/dark-v10",
        weight: 2,
    accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    id: "mapbox/light-v10",
    maxZoom: 18,
    accessToken: API_KEY
});


// Then we add our 'graymap' tile layer to the map.
var baseMaps = {
  Light: light,
  Dark: dark
};


// Create the map object with center and zoom level.
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [light]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, null, {collapsed:false}).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/iprudhomme/Mapping_Earthquakes/main/torontoRoutes.json";


var myStyle = {
  "color": "#ffffa1",
  "weight": 2
};

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties) {
      layer.bindPopup("<h3>Airline: " + feature.properties.airline + "</h3> <hr><h3>Destination: " + feature.properties.dst + "</h3>");
  }
}  
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  style: myStyle,
  onEachFeature: onEachFeature
}).addTo(map);
});




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
  "Satellite": satelliteStreets
};

// Create the map object with center and zoom level.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, null, {collapsed:false}).addTo(map);

// Accessing the USGS Earthquake GeoJSON URL.
let earthquakes7days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


var myStyle = {
  "color": "blue",
  "weight": 1,
  "fillColor": "yellow",
  "fillOpacity": 0.15

};

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});

// Grabbing our GeoJSON data.
d3.json(earthquakes7days).then(function(data) {
  console.log(data);

function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties) {
      layer.bindPopup("<h3>" + feature.properties.place + "</h3>"
      + "<hr><br>Magnitude: : "+ feature.properties.mag);
  }
}  
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  style: myStyle,
  onEachFeature: onEachFeature
}).addTo(map);
});



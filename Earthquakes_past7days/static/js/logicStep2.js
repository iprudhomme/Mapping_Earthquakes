
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

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "#ffae42",
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}


// Grabbing our GeoJSON data.
d3.json(earthquakes7days).then(function(data) {
  console.log(data);

function pointToLayer(layer, latlng) {
  // does this feature have a property named popupContent?
  if (feature.properties) {
      layer.bindPopup("<h3>" + feature.properties.place + "</h3>"
      + "<hr><br>Magnitude: : "+ feature.properties.mag);
      console.log(data);
  }
}  
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  style: styleInfo,
  pointToLayer: function(layer, latlng) {
                console.log(layer);
                return L.circleMarker(latlng);
  }
}).addTo(map);
});


// layer.bindPopup("<h3>" + layer.properties.place + "</h3>"
//                 + "<hr><br>Magnitude: : "+ layer.properties.mag);


// When passing in styleInfo, which has an input of feature, how does javascript know to add the feature here?
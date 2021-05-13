// This array contains the coordinates for all bus stops between MIT and Harvard
async function run(){
  // get bus data    
const locations = await getBusLocations();
console.log(new Date());
console.log(locations);
var buses = locations.length;

// add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaW1pem9ndWNoaSIsImEiOiJja29qZ255Z24xNGs3MndueHh4Nnc0d2FxIn0.wwB_lxuU8jSasEqjslhMEQ';
  
// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.08927333556, 42.350803759733076],
  zoom: 12.5,
});

map.on('load', function () {
  map.addSource('route', {
  'type': 'geojson',
  'data': {
  'type': 'Feature',
  'properties': {},
  'geometry': {
  'type': 'LineString',
  'coordinates': [
    [-71.0838925021673, 42.32990316978021],
    [-71.0826417016205, 42.330967807643106],
    [-71.08125997430669, 42.33232216249122],
    [-71.0795901165045, 42.33202509349399],
    [-71.0763526184777, 42.33167659361249],
    [-71.07356647526973, 42.33384138115117],
    [-71.07494446616994, 42.33497613773511],
    [-71.07694988344504, 42.33661885422701],
    [-71.08034125880914, 42.3394701061726],
    [-71.08308902385781, 42.341566998782994],
    [-71.08423278377508, 42.34246774461115],
    [-71.08708220628183, 42.34552964306528], 
    [-71.093729, 42.359244],
    [-71.094915, 42.360175],
    [-71.0958, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.11744079074705, 42.373143738772235],
   
  ]
  }
  }
  });
  map.addLayer({
  'id': 'route',
  'type': 'line',
  'source': 'route',
  'layout': {
  'line-join': 'round',
  'line-cap': 'round'
  },
  'paint': {
  'line-color': '#888',
  'line-width': 8
  }
  });
  });

for (let i = 0; i <= buses - 1; i++){
  locations.forEach(function(marker) {
    if(locations[i].attributes.direction_id == 1){
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'inbound';
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude])
      .addTo(map);
    }
    else{
      var el = document.createElement('div');
    el.className = 'outbound';
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude])
      .addTo(map);
    }
  });
};

setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
const response = await fetch(url);
const json     = await response.json();
return json.data;
}

run();


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
  center: [-71.104081, 42.365554],
  zoom: 13,
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

setTimeout(run, 3600000);
}

// Request bus data from MBTA
async function getBusLocations(){
const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
const response = await fetch(url);
const json     = await response.json();
return json.data;
}

run();

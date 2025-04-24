let map; // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
let toilettes;
init();
function init() {
  // initialise de kaart
  map = L.map("map").setView([50.845619027568645, 4.357139244569092], 13);
  // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png

  L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  // marker school

  // vergeet openstreetmap attributie niet

  // gebruik de functie "loadMarkers" om de markers toe te voegen
  loadMarkers();
  addMarker(50.8423135, 4.32291528, "studie");
}

function loadMarkers() {
  // fetch de data van opendata.brussels.be
  fetch(
    "https://opendata.bruxelles.be/api/explore/v2.1/catalog/datasets/toilettes_publiques_vbx/records?limit=20"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      toilettes = data;
      toilettes.results.forEach(function (locations) {
        console.log(locations);
        addMarker(
          locations.geo_point_2d.lat,
          locations.geo_point_2d.lon,
          locations.location
        );
      });
    });
  // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart
}

function addMarker(lat, lon, text) {
  // voeg een marker toe op lat, lon

  let marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup(text).openPopup();
}

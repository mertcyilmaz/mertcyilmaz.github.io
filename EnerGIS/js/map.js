// Initialize the map and center it on Drohobych, Ukraine
var map = L.map("map").setView([49.3528, 23.5055], 13);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Function to add GeoJSON layer to the map
function addGeoJSONLayer(geojsonData) {
    L.geoJSON(geojsonData, {
        onEachFeature: function (feature, layer) {
            layer.on("click", function () {
                showBuildingPopup(feature.properties);
            });
        }
    }).addTo(map);
}
// Existing elements for user-upload functionality
var geojsonInput = document.getElementById("geojson-input");
var geojsonBtn = document.getElementById("geojson-btn");
var spinner = document.querySelector(".spinner");

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

// Load GeoJSON from a static file (buildings.geojson)
fetch('data/buildings.geojson')
  .then(response => response.json())
  .then(geojsonData => {
    addGeoJSONLayer(geojsonData);  // Add static GeoJSON to the map
  })
  .catch(error => console.error('Error loading static GeoJSON:', error));

// User-uploaded GeoJSON functionality
geojsonBtn.addEventListener("click", function () {
  geojsonInput.click();
});

geojsonInput.addEventListener("change", function (event) {
  var file = event.target.files[0];
  if (file) {
    spinner.style.display = "block";
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var geojsonData = JSON.parse(e.target.result);
        addGeoJSONLayer(geojsonData);  // Add user-uploaded GeoJSON to the map
      } catch (error) {
        alert("Invalid GeoJSON file.");
      } finally {
        spinner.style.display = "none";
      }
    };
    reader.readAsText(file);
  }
});

var geojsonInput = document.getElementById("geojson-input");
var geojsonBtn = document.getElementById("geojson-btn");
var spinner = document.querySelector(".spinner");

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
        addGeoJSONLayer(geojsonData);
      } catch (error) {
        alert("Invalid GeoJSON file.");
      } finally {
        spinner.style.display = "none";
      }
    };
    reader.readAsText(file);
  }
});
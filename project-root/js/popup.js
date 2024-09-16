var popupContent = document.getElementById("popup-content");
var popupClose = document.getElementById("popup-close");
var popupContentArea = document.getElementById("popup-content-area");
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var pageNumber = document.getElementById("page-number");
var currentPage = 1;

var pages = [
  `<h3>Details</h3><p><strong>Building Type:</strong> Public</p><p><strong>Building Use:</strong> City Hall</p><p><strong>Area (ha):</strong> 0.25</p><p><strong>Floors:</strong> 4</p>`,
  `<h3>Current</h3><p><strong>Source:</strong> Coal</p><p><strong>Energy demand (kWh):</strong> 12500</p><p><strong>Cost (UAH):</strong> 10000</p><p><strong>CO2 (kg):</strong> 4200</p>`,
  `<h3>Maximum</h3><p><strong>Sunshine (hours/year):</strong> 1600</p><p><strong>Max panels count:</strong> 70</p>`,
  `<h3>Install</h3>
  <label for="cost-slider">Cost (UAH)</label>
  <input type="range" id="cost-slider" class="slider" min="0" max="10000" value="4035">
  <p>Cost: <span id="cost-value">4035</span> UAH</p>
  <label for="pv-slider">PV Panel Amount</label>
  <input type="range" id="pv-slider" class="slider" min="0" max="70" value="28">
  <p>Panels: <span id="pv-value">28</span></p>
  <p>Savings: <span id="savings-value">1614.00</span> UAH</p>
  <p>Return on Investment: <span id="roi-value">2.50</span> years</p>
  <p>CO2 Reduction: <span id="co2-reduction-value">40.00</span>%</p>`
];

function showBuildingPopup(properties) {
  currentPage = 1;
  updatePage();
  popupContent.style.display = "block";
}

popupClose.addEventListener("click", function () {
  popupContent.style.display = "none";
});

nextBtn.addEventListener("click", function () {
  if (currentPage < pages.length) {
    currentPage++;
    updatePage();
  }
});

prevBtn.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    updatePage();
  }
});

function updatePage() {
  popupContentArea.innerHTML = pages[currentPage - 1];
  pageNumber.textContent = currentPage;

  prevBtn.style.display = currentPage > 1 ? "inline-block" : "none";
  nextBtn.style.display = currentPage < pages.length ? "inline-block" : "none";

  if (currentPage === 4) {
    initializeSliders();
  }
}

function initializeSliders() {
  var costSlider = document.getElementById("cost-slider");
  var pvSlider = document.getElementById("pv-slider");
  var costValue = document.getElementById("cost-value");
  var pvValue = document.getElementById("pv-value");
  var savingsValue = document.getElementById("savings-value");
  var roiValue = document.getElementById("roi-value");
  var co2ReductionValue = document.getElementById("co2-reduction-value");

  const SAVINGS_PER_PANEL = 150;
  const MAX_CO2_REDUCTION = 100;

  function updateCalculations() {
    var cost = parseInt(costSlider.value);
    var pvPanels = parseInt(pvSlider.value);

    var savings = pvPanels * SAVINGS_PER_PANEL;
    var roi = savings > 0 ? cost / savings : 0;
    var co2Reduction = (pvPanels / pvSlider.max) * MAX_CO2_REDUCTION;

    costValue.innerText = cost;
    pvValue.innerText = pvPanels;
    savingsValue.innerText = savings.toFixed(2);
    roiValue.innerText = roi.toFixed(2);
    co2ReductionValue.innerText = co2Reduction.toFixed(2);
  }

  costSlider.addEventListener("input", updateCalculations);
  pvSlider.addEventListener("input", updateCalculations);

  updateCalculations();
}
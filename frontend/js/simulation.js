/* ===========================================================
   ChainGuard360 - Crisis Simulation Sandbox Script
   Handles live crisis generation and visualization
   Author: JJ | 2025
   =========================================================== */

// ====== DOM Elements ======
const simulateBtn = document.getElementById("simulateBtn");
const resultBox = document.getElementById("simulationResult");
const loader = document.getElementById("loader");

// ====== Generate Random Neon Colors (for UI effects) ======
function randomNeon() {
  const colors = ["#00eaff", "#6f00ff", "#ff00cc", "#00ffcc", "#ff8800"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ====== Display Result on UI ======
function displayResult(data) {
  resultBox.innerHTML = `
    <div class="result-card" style="border-left: 4px solid ${randomNeon()};">
      <h3>${data.type}</h3>
      <p><strong>Impact:</strong> <span class="impact">${data.impact}</span></p>
      <p><strong>Expected Delay:</strong> ${data.delay_hours} hrs</p>
      <p><strong>Recovery Plan:</strong> ${data.recovery_plan}</p>
      <p class="timestamp">🕒 Generated at ${new Date().toLocaleTimeString()}</p>
    </div>
  `;
  resultBox.style.opacity = "1";
  resultBox.classList.add("show");
}

// ====== Fetch Crisis from Backend ======
async function fetchCrisis() {
  loader.style.display = "block";
  resultBox.style.opacity = "0.5";

  try {
    const response = await fetch("simulate_crisis.php");
    const result = await response.json();

    loader.style.display = "none";

    if (result.status === "success") {
      displayResult(result.crisis);
    } else {
      resultBox.innerHTML = `<p class="error">⚠️ Failed to fetch simulation data</p>`;
    }
  } catch (error) {
    loader.style.display = "none";
    resultBox.innerHTML = `<p class="error">🚫 Error: ${error.message}</p>`;
  }
}

// ====== Event Listener ======
simulateBtn.addEventListener("click", fetchCrisis);

// ====== Optional: Auto simulation every 30 seconds ======
let autoSim = false;
const toggleAutoBtn = document.getElementById("autoToggle");

if (toggleAutoBtn) {
  toggleAutoBtn.addEventListener("click", () => {
    autoSim = !autoSim;
    toggleAutoBtn.textContent = autoSim ? "⏹ Stop Auto Simulation" : "🔁 Start Auto Simulation";
    if (autoSim) {
      fetchCrisis();
      autoSimInterval = setInterval(fetchCrisis, 30000);
    } else {
      clearInterval(autoSimInterval);
    }
  });
}

/* === Neon Pulse Animation === */
setInterval(() => {
  const impactSpans = document.querySelectorAll(".impact");
  impactSpans.forEach(span => {
    span.style.color = randomNeon();
  });
}, 1200);

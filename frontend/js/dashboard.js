/* ===========================================================
   ChainGuard360 - Dashboard Logic
   Fetches shipment, trust, and alert data
   =========================================================== */

import { createIntegrityChart, createTrustChart } from "./chart.js";
import { fetchShipments, fetchTrustTokens, fetchAlerts } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const integrityCtx = document.getElementById("integrityChart");
  const trustCtx = document.getElementById("trustChart");
  const alertList = document.getElementById("alertList");

  // === Load Shipments and Render Integrity Chart ===
  try {
    const shipments = await fetchShipments();
    const integrityScores = shipments.map(s => s.integrity_score);
    const avgIntegrity =
      integrityScores.reduce((a, b) => a + b, 0) / integrityScores.length;
    createIntegrityChart(integrityCtx, avgIntegrity);
  } catch (error) {
    console.error("Error fetching shipments:", error);
  }

  // === Load Trust Tokens Chart ===
  try {
    const trustData = await fetchTrustTokens();
    const labels = trustData.map(d => d.name);
    const scores = trustData.map(d => d.trust_score);
    createTrustChart(trustCtx, labels, scores);
  } catch (error) {
    console.error("Error fetching trust tokens:", error);
  }

  // === Load Real-time Alerts ===
  try {
    const alerts = await fetchAlerts();
    alertList.innerHTML = "";
    alerts.forEach(a => {
      const li = document.createElement("li");
      li.innerHTML = `⚠️ <strong>${a.type}</strong>: ${a.description}`;
      alertList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching alerts:", error);
  }
});

/* ===========================================================
   ChainGuard360 - API Helper
   Centralized API Calls
   =========================================================== */

const BASE_URL = "backend/"; // adjust path if hosted differently

export async function fetchShipments() {
  const res = await fetch(`${BASE_URL}fetch_shipments.php`);
  if (!res.ok) throw new Error("Failed to fetch shipments");
  return await res.json();
}

export async function fetchTrustTokens() {
  const res = await fetch(`${BASE_URL}fetch_suppliers.php`);
  if (!res.ok) throw new Error("Failed to fetch trust tokens");
  return await res.json();
}

export async function fetchAlerts() {
  const res = await fetch(`${BASE_URL}fetch_alerts.php`);
  if (!res.ok) throw new Error("Failed to fetch alerts");
  return await res.json();
}

export async function updateTrustScore(entity_type, entity_id, change, reason) {
  const res = await fetch(`${BASE_URL}update_trust_score.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity_type, entity_id, change, reason })
  });
  return await res.json();
}

export async function simulateCrisis() {
  const res = await fetch(`${BASE_URL}simulate_crisis.php`);
  return await res.json();
}

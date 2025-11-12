/* ===========================================================
   ChainGuard360 - Chart Configurations
   Shared Chart.js Functions
   =========================================================== */

export function createIntegrityChart(ctx, avg) {
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Healthy", "Warning", "Critical"],
      datasets: [
        {
          data: [avg, 100 - avg, Math.max(0, 100 - avg - 10)],
          backgroundColor: [
            "rgba(0, 238, 255, 0.8)",
            "rgba(255, 193, 7, 0.8)",
            "rgba(255, 77, 77, 0.8)"
          ],
          borderWidth: 0
        }
      ]
    },
    options: {
      cutout: "70%",
      plugins: {
        legend: { display: true, labels: { color: "#e0e0e0" } }
      }
    }
  });
}

export function createTrustChart(ctx, labels, data) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Trust Scores",
          data,
          backgroundColor: "rgba(0, 238, 255, 0.6)",
          borderColor: "rgba(0, 238, 255, 1)",
          borderWidth: 1.5
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: { ticks: { color: "#e0e0e0" } },
        y: {
          beginAtZero: true,
          ticks: { color: "#e0e0e0" },
          grid: { color: "rgba(255,255,255,0.1)" }
        }
      },
      plugins: { legend: { labels: { color: "#e0e0e0" } } }
    }
  });
}

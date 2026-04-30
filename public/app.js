
/* =========================
   LIVE PRICE LOADER (PRO VERSION)
   BTC + XAUUSD STABLE
========================= */

const goldEl = document.getElementById("gold");
const btcEl = document.getElementById("btc");

/* 🔥 FORMAT PRICE */
function formatPrice(value) {
  if (!value || isNaN(value)) return null;
  return Number(value).toFixed(2);
}

/* =========================
   FETCH PRICES FROM BACKEND
========================= */

async function fetchPrices() {
  try {
    const res = await fetch("/api/prices", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Network error");

    const data = await res.json();

    // =====================
    // XAUUSD
    // =====================
    if (data.xauusd) {
      goldEl.innerText = "$" + formatPrice(data.xauusd);
    } else {
      goldEl.innerText = "Loading...";
    }

    // =====================
    // BTCUSD
    // =====================
    if (data.btcusd) {
      btcEl.innerText = "$" + formatPrice(data.btcusd);
    } else {
      btcEl.innerText = "Loading...";
    }

  } catch (error) {
    console.log("Fetch error:", error);

    goldEl.innerText = "Retry...";
    btcEl.innerText = "Retry...";
  }
}

/* =========================
   AUTO REFRESH SYSTEM
   (lebih aman dari spam API)
========================= */

function startAutoRefresh() {
  fetchPrices(); // initial load

  // setiap 10 detik (lebih stabil dari 5 detik)
  setInterval(() => {
    fetchPrices();
  }, 10000);
}

/* =========================
   START APP
========================= */

startAutoRefresh();

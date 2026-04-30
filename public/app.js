
/* =========================
   LIVE PRICE ENGINE - PRO VERSION
   BTC + XAUUSD STABLE + SMOOTH
========================= */

const goldEl = document.getElementById("gold");
const btcEl = document.getElementById("btc");

/* =========================
   FORMAT PRICE (SAFE)
========================= */

function formatPrice(value) {
  if (value === null || value === undefined || isNaN(value)) {
    return null;
  }
  return Number(value).toFixed(2);
}

/* =========================
   SMOOTH UPDATE (ANTI JUMP)
========================= */

function smoothUpdate(el, newValue) {
  if (!newValue) return;

  const current = el.innerText.replace("$", "").replace(",", "");
  const currentValue = parseFloat(current);

  if (isNaN(currentValue)) {
    el.innerText = "$" + newValue;
    return;
  }

  const step = (newValue - currentValue) / 10;
  let i = 0;

  const interval = setInterval(() => {
    i++;
    const value = currentValue + step * i;

    el.innerText = "$" + value.toFixed(2);

    if (i >= 10) clearInterval(interval);
  }, 30);
}

/* =========================
   FETCH PRICES (ROBUST)
========================= */

async function fetchPrices() {
  try {
    const res = await fetch("/api/prices", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("API Error");

    const data = await res.json();

    // =====================
    // XAUUSD
    // =====================
    if (data.xauusd) {
      const gold = formatPrice(data.xauusd);
      smoothUpdate(goldEl, gold);
    } else {
      goldEl.innerText = "—";
    }

    // =====================
    // BTCUSD
    // =====================
    if (data.btcusd) {
      const btc = formatPrice(data.btcusd);
      smoothUpdate(btcEl, btc);
    } else {
      btcEl.innerText = "—";
    }

  } catch (err) {
    console.log("API error:", err);

    goldEl.innerText = "reconnecting...";
    btcEl.innerText = "reconnecting...";
  }
}

/* =========================
   AUTO REFRESH (SMART SYSTEM)
========================= */

function startAutoRefresh() {
  fetchPrices(); // initial load

  // interval lebih stabil (8 detik optimal)
  setInterval(fetchPrices, 8000);
}

/* =========================
   START APP
========================= */

startAutoRefresh();

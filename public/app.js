const API_KEY = "af23649e02da42aab3e78cf343513325";

// Twelve Data symbols
const GOLD = "XAU/USD";
const BTC = "BTC/USD";

async function getPrice(symbol, elementId, label) {
  try {
    const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    // debug safety
    if (!data || !data.price) {
      document.getElementById(elementId).innerText = "--";
      return;
    }

    const price = parseFloat(data.price).toFixed(2);

    document.getElementById(elementId).innerText =
      `${label} $${price}`;

  } catch (err) {
    document.getElementById(elementId).innerText = "ERR";
  }
}

// AUTO UPDATE SYSTEM
function startLivePrice() {
  getPrice(GOLD, "gold", "XAUUSD");
  getPrice(BTC, "btc", "BTCUSD");

  setInterval(() => {
    getPrice(GOLD, "gold", "XAUUSD");
    getPrice(BTC, "btc", "BTCUSD");
  }, 5000); // update tiap 5 detik
}

startLivePrice();

const API_KEY = "af23649e02da42aab3e78cf343513325";

// gunakan format ini (tanpa slash)
const GOLD_SYMBOL = "XAUUSD";
const BTC_SYMBOL = "BTC/USD";

async function getXAU() {
  try {
    const url = `https://api.twelvedata.com/price?symbol=${GOLD_SYMBOL}&apikey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    console.log("XAU RESPONSE:", data);

    if (data && data.price) {
      document.getElementById("gold").innerText =
        `XAUUSD $${parseFloat(data.price).toFixed(2)}`;
    } else {
      document.getElementById("gold").innerText = "N/A";
    }

  } catch (e) {
    document.getElementById("gold").innerText = "ERR";
  }
}

async function getBTC() {
  try {
    const url = `https://api.twelvedata.com/price?symbol=${BTC_SYMBOL}&apikey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data && data.price) {
      document.getElementById("btc").innerText =
        `BTCUSD $${parseFloat(data.price).toFixed(2)}`;
    } else {
      document.getElementById("btc").innerText = "N/A";
    }

  } catch (e) {
    document.getElementById("btc").innerText = "ERR";
  }
}

function start() {
  getXAU();
  getBTC();

  setInterval(() => {
    getXAU();
    getBTC();
  }, 5000);
}

start();

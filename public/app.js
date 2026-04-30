const API_KEY = "af23649e02da42aab3e78cf343513325";

// gunakan format exchange rate
const GOLD_FROM = "XAU";
const GOLD_TO = "USD";

const BTC = "BTC/USD";

async function getGold() {
  try {
    const url = `https://api.twelvedata.com/exchange_rate?symbol=${GOLD_FROM}/${GOLD_TO}&apikey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data && data.rate) {
      document.getElementById("gold").innerText =
        `XAUUSD $${parseFloat(data.rate).toFixed(2)}`;
    } else {
      document.getElementById("gold").innerText = "N/A";
    }

  } catch (e) {
    document.getElementById("gold").innerText = "ERR";
  }
}

async function getBTC() {
  try {
    const url = `https://api.twelvedata.com/price?symbol=${BTC}&apikey=${API_KEY}`;

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
  getGold();
  getBTC();

  setInterval(() => {
    getGold();
    getBTC();
  }, 5000);
}

start();

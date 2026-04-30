const FINNHUB_API = "d3ndrd9r01qo7510lisgd3ndrd9r01qo7510lit0";

// XAUUSD (Gold)
async function getGold() {
  try {
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=XAUUSD&token=${FINNHUB_API}`);
    const data = await res.json();

    document.getElementById("gold").innerText = data.c;
  } catch (e) {
    document.getElementById("gold").innerText = "Error";
  }
}

// BTCUSD
async function getBTC() {
  try {
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=BTCUSD&token=${FINNHUB_API}`);
    const data = await res.json();

    document.getElementById("btc").innerText = data.c;
  } catch (e) {
    document.getElementById("btc").innerText = "Error";
  }
}

// update tiap 30 detik
getGold();
getBTC();

setInterval(() => {
  getGold();
  getBTC();
}, 30000);

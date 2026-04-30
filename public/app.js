async function loadPrices() {
  try {
    const res = await fetch("/api/prices");
    const data = await res.json();

    document.getElementById("gold").innerText =
      data.xauusd ? `$${data.xauusd.toFixed(2)}` : "N/A";

    document.getElementById("btc").innerText =
      data.btcusd ? `$${data.btcusd.toFixed(2)}` : "N/A";
  } catch (err) {
    console.log(err);
  }
}

loadPrices();
setInterval(loadPrices, 5000);

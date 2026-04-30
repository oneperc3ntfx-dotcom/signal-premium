const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public"));

const FINNHUB_KEY = "d3ndrd9r01qo7510lisgd3ndrd9r01qo7510lit0";

// 🔥 API XAUUSD (Gold) dari Finnhub
async function getGoldPrice() {
  try {
    const res = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=XAUUSD&token=${FINNHUB_KEY}`
    );
    return res.data.c;
  } catch {
    return null;
  }
}

// ₿ BTC dari Binance
async function getBTCPrice() {
  try {
    const res = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    );
    return parseFloat(res.data.price);
  } catch {
    return null;
  }
}

// API endpoint harga
app.get("/api/prices", async (req, res) => {
  const gold = await getGoldPrice();
  const btc = await getBTCPrice();

  res.json({
    xauusd: gold,
    btcusd: btc,
    time: new Date(),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));

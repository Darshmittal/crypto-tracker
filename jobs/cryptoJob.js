const CryptoModel = require('../models/Crypto.js');
const {fetchCryptoData} = require('../services/cryptoService.js');

async function runCryptoJob() {
  try {
    const cryptoData = await fetchCryptoData();

    const coins = ['bitcoin', 'ethereum', 'matic-network'];
    coins.forEach(async (coin) => {
      const newRecord = new CryptoModel({
        coin: coin,
        price: cryptoData[coin].usd,
        marketCap: cryptoData[coin].usd_market_cap,
        change24h: cryptoData[coin].usd_24h_change,
        timestamp: new Date()
      });

      await newRecord.save(); 
      console.log(`Saved ${coin} data:`, newRecord);
    });

  } catch (error) {
    console.error('Error in crypto job:', error);
  }
}

module.exports = { runCryptoJob };

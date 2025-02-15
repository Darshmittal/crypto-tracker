const axios = require('axios');

async function fetchCryptoData() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin,ethereum,matic-network',
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    throw error;
  }
}

module.exports = { fetchCryptoData };
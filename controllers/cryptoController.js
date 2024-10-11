const Crypto = require('../models/Crypto.js');
const { calculateStandardDeviation } = require('../utils/calculateDeviation.js');

const getCryptoStats = async (req, res) => {
  const { coin } = req.query;
  try {
      const cryptoData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
      if (!cryptoData) {
          return res.status(404).json({ message: 'Cryptocurrency data not found.' });
      }
      res.json({
          price: cryptoData.price,
          marketCap: cryptoData.marketCap,
          "24hChange": cryptoData.change24h,
      });
  } catch (error) {
      console.error('Error fetching cryptocurrency stats:', error);
      res.status(500).json({ message: 'Server error.' });
  }
};

const getCryptoDeviation = async (req, res) => {
  const { coin } = req.query;
  try {
      const last100Records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
      if (last100Records.length === 0) {
          return res.status(404).json({ message: 'No records found for this cryptocurrency.' });
      }
      const prices = last100Records.map(record => record.price);
      const deviation = calculateStandardDeviation(prices);
      res.json({ deviation });
  } catch (error) {
      console.error('Error fetching standard deviation:', error);
      res.status(500).json({ message: 'Server error.' });
  }
};


module.exports = {
    getCryptoStats,
    getCryptoDeviation,
};

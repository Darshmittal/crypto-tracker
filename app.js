const express = require('express');
const dotenv = require('dotenv');
const cron = require('node-cron');
const connectDB = require('./config/db.js');
const cryptoRoutes = require('./routes/cryptoRoutes.js');
const { runCryptoJob } = require('./jobs/cryptoJob.js'); 

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000; 

connectDB();

cron.schedule('0 */2 * * *', () => {
    console.log('Running the crypto job...');
    runCryptoJob();
  });
  
app.use(express.json());

app.use('/api', cryptoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

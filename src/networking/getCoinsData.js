const axios = require('axios');

const coinMarketCapAPI = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';

async function getCoinsData() {
  try {
    let response = await axios.get(coinMarketCapAPI);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export {getCoinsData};

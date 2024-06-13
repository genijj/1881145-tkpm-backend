const axios = require('axios');

const translateText = async (text) => {
  try {
    const response = await axios.post(
      `https://api.cognitive.microsofttranslator.com/translate`,
      [{ Text: text }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATE_API_KEY,
          'Ocp-Apim-Subscription-Region': process.env.AZURE_TRANSLATE_REGION,
          'Content-Type': 'application/json'
        },
        params: {
          'api-version': '3.0',
          to: 'vi'
        }
      }
    );

    return response.data[0].translations[0].text;
  } catch (error) {
    console.error('Error translating text:', error);
    throw new Error('Translation service failed');
  }
};

module.exports = {
  translateText
};

const axios = require('axios');

const speechToText = async (audioBuffer) => {
  try {
    const response = await axios.post(
      `https://${process.env.AZURE_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`,
      audioBuffer,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.AZURE_API_KEY,
          'Content-Type': 'audio/wav'
        }
      }
    );

    console.log('Azure response:', response.data);
    if (response.data.RecognitionStatus !== 'Success') {
      throw new Error('Recognition failed');
    }

    return response.data.DisplayText || 'No transcribable text found';
  } catch (error) {
    console.error('Error in speech-to-text service:', error.response ? error.response.data : error.message);
    throw new Error('Failed to convert speech to text');
  }
};

module.exports = {
  speechToText
};

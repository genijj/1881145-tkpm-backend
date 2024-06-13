const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const textToSpeech = async (text) => {
  const ssml = `<speak version='1.0' xml:lang='en-US'>
                  <voice xml:lang='en-US' xml:gender='Female' name='en-US-AriaNeural'>
                    ${text}
                  </voice>
                </speak>`;

  const response = await axios.post(
    `https://${process.env.AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
    ssml,
    {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.AZURE_API_KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3'
      },
      responseType: 'arraybuffer'
    }
  );

  const audioBuffer = response.data;
  const audioFilename = `${uuidv4()}.wav`;
  const audioFilePath = path.join(__dirname, '../uploads/', audioFilename);

  fs.writeFileSync(audioFilePath, audioBuffer);

  return audioFilename;
};

module.exports = {
  textToSpeech
};

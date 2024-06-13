const translateService = require('../services/translateService');

const translate = async (req, res) => {
  try {
    const translation = await translateService.translateText(req.body.text);
    res.json({ translation });
  } catch (error) {
    console.error('Error in translate controller:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  translate
};

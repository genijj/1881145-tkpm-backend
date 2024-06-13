const express = require('express');
const cors = require('cors');
const path = require('path');

const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const ttsRoutes = require('./routes/tts');
const sttRoutes = require('./routes/stt');
const translateRoutes = require('./routes/translate');

const app = express();
app.use(cors({
  origin: 'http://localhost:4000'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/tts', ttsRoutes);
app.use('/stt', sttRoutes);
app.use('/translate', translateRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

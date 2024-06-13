const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Account = require('./account')(sequelize, Sequelize.DataTypes);
const ChatHistory = require('./chatHistory')(sequelize, Sequelize.DataTypes);

User.hasOne(Account, { foreignKey: 'userId', as: 'account' });
Account.belongsTo(User, { foreignKey: 'userId', as: 'user' });

ChatHistory.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(ChatHistory, { foreignKey: 'userId' });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); 
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
};

syncDatabase();

module.exports = {
  sequelize,
  User,
  Account,
  ChatHistory,
};

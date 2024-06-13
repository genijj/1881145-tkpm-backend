const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../models');

const register = async (userData) => {
  const { firstName, lastName, email, address, username, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await User.create({ firstName, lastName, email, address });
  const account = await Account.create({ username, password: hashedPassword, userId: user.id });
  
  return { user, account };
};

const login = async (username, password) => {
  const account = await Account.findOne({ where: { username } });
  if (!account || !await bcrypt.compare(password, account.password)) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ id: account.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token };
};

const updateUserInfo = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  await user.update(updateData);
  return user;
};

const getUserInfo = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const account = await Account.findOne({ where: { userId } });
  if (!account || !await bcrypt.compare(oldPassword, account.password)) {
    throw new Error('Invalid password');
  }
  
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await account.update({ password: hashedPassword });
};

module.exports = {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  changePassword,
};


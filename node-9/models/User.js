import { DataTypes } from 'sequelize';

export default function initUser(sequelize) {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    mustChangePassword: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' }
  });

  return User;
}

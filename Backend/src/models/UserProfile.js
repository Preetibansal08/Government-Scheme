const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const UserProfile = sequelize.define('UserProfile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    age: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 120 }
    },
    income: {
        type: DataTypes.DECIMAL(10, 2),
        validate: { min: 0 }
    },
    occupation: {
        type: DataTypes.STRING(100)
    },
    education_level: {
        type: DataTypes.STRING(100)
    },
    location_state: {
        type: DataTypes.STRING(100)
    },
    location_district: {
        type: DataTypes.STRING(100)
    },
    family_size: {
        type: DataTypes.INTEGER,
        validate: { min: 1 }
    },
   profile_image: {
    type: DataTypes.STRING,
    allowNull: true
},
// models/UserProfile.js - Add gender field
gender: {
  type: DataTypes.STRING(20),
  allowNull: true,
  validate: {
    isIn: [['male', 'female', 'other']]
  }
}
}, {
    tableName: 'user_profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

User.hasOne(UserProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UserProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserProfile;
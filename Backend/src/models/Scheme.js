// models/Scheme.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Scheme = sequelize.define("Scheme", {
  name: { type: DataTypes.STRING, allowNull: false },
  category: DataTypes.STRING,
  description: DataTypes.TEXT,
  benefits: DataTypes.TEXT,
  benefit_amount: DataTypes.DECIMAL,
  application_link: DataTypes.STRING,
  // New column for AI recommendation criteria
  eligibility_criteria: {
    type: DataTypes.JSONB, // use JSON for flexible criteria
    allowNull: true,
  }
}, {
  tableName: "schemes",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports = Scheme;
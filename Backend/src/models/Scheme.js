const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Scheme = sequelize.define('Scheme', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    scheme_code: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: DataTypes.TEXT,
    category: DataTypes.STRING(100),
    eligibility_criteria: {
        type: DataTypes.JSONB,
        defaultValue: {}
    },
    benefits: DataTypes.TEXT,
    benefit_amount: DataTypes.DECIMAL(10, 2),
    official_website: DataTypes.STRING(500),
    application_link: DataTypes.STRING(500),
    helpline_number: DataTypes.STRING(50)
    // REMOVED: is_active field
}, {
    tableName: 'schemes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Scheme;
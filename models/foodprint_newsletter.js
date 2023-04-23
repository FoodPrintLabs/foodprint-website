const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'FoodprintNewsletter',
    {
      pk: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      timestamp: {
          type: DataTypes.DATE,
          allowNull: true,
        },
     },
    {
      sequelize,
      tableName: 'foodprint_newsletter',
      timestamps: false,
      indexes: [
        {
          name: 'foodprint_newsletter_PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'pk' }],
        },
      ],
    }
  );
};

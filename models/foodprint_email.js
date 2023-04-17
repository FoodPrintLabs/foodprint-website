const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'FoodprintEmail',
    {
      pk: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      recipient: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      timestamp: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        content: {
            type: DataTypes.STRING(765),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
     },
    {
      sequelize,
      tableName: 'foodprint_email',
      timestamps: false,
      indexes: [
        {
          name: 'foodprint_email_PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'pk' }],
        },
      ],
    }
  );
};

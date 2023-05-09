const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'FoodprintContact',
    {
      pk: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      surname: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING(765),
        allowNull: true,
      },
      logdatetime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'foodprint_contact',
      timestamps: false,
      indexes: [
        {
          name: 'foodprint_contact_PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'pk' }],
        },
      ],
    }
  );
};

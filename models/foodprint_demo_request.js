const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'FoodprintDemoRequest',
    {
      pk: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },      
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      timestamp: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
     },
    {
      sequelize,
      tableName: 'foodprint_demo_request',
      timestamps: false,
      indexes: [
        {
          name: 'foodprint_demo_request_PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'pk' }],
        },
      ],
    }
  );
};

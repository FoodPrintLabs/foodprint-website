const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    // email_logid: email_logid,
    // email_recipient: recipient,
    // email_subject: subject,
    // email_timestamp: logdatetime,
    // email_content: mailOptions.html,
    // email_status: 'SENT',
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
      tableName: 'foodprint_subscription',
      timestamps: false,
      indexes: [
        {
          name: 'foodprint_subscription_PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'pk' }],
        },
      ],
    }
  );
};

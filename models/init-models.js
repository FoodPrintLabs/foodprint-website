const  DataTypes = require('sequelize').DataTypes;
const  _FoodprintSubscription = require('./foodprint_subscription');
const  _FoodprintContact = require('./foodprint_contact');
const  _FoodprintEmail = require('./foodprint_email');

function initModels(sequelize) {
  const FoodprintSubscription = _FoodprintSubscription(sequelize, DataTypes);
  const FoodprintContact = _FoodprintContact(sequelize, DataTypes);
  const FoodprintEmail = _FoodprintEmail(sequelize, DataTypes);

  return {
    FoodprintSubscription, FoodprintContact, FoodprintEmail
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

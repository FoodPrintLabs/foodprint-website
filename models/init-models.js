const  DataTypes = require('sequelize').DataTypes;
const  _FoodprintSubscription = require('./foodprint_subscription');
const  _FoodprintContact = require('./foodprint_contact');
const  _FoodprintEmail = require('./foodprint_email');
const _FoodprintDemoRequest = require('./foodprint_demo_request');
const _FoodprintNewsletter = require('./foodprint_newsletter');

function initModels(sequelize) {
  const FoodprintSubscription = _FoodprintSubscription(sequelize, DataTypes);
  const FoodprintContact = _FoodprintContact(sequelize, DataTypes);
  const FoodprintEmail = _FoodprintEmail(sequelize, DataTypes);
  const FoodprintDemoRequest = _FoodprintDemoRequest(sequelize, DataTypes);
  const FoodprintNewsletter = _FoodprintNewsletter(sequelize, DataTypes);       

  return {
    FoodprintSubscription, FoodprintContact, FoodprintEmail, FoodprintDemoRequest, FoodprintNewsletter
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

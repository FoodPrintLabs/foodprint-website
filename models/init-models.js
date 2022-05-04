var DataTypes = require('sequelize').DataTypes;
var _FoodprintSubscription = require('./foodprint_subscription');

function initModels(sequelize) {
  var FoodprintSubscription = _FoodprintSubscription(sequelize, DataTypes);

  return {
    FoodprintSubscription,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

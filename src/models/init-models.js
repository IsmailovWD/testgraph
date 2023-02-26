var DataTypes = require("sequelize").DataTypes;
var sequelize = require('../db/db-sequelize')
var _MockData = require("./mock_data");


var MockData = _MockData(sequelize, DataTypes);


module.exports = {
  MockData,
};


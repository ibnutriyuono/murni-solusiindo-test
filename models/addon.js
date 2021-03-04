'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Addon.hasMany(models.ProductContent)
    }
  };
  Addon.init({
  }, {
    sequelize,
    modelName: 'Addon',
  });
  return Addon;
};
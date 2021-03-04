'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pivot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pivot.init({
    category_id: DataTypes.INTEGER,
    term_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pivot',
  });
  return Pivot;
};
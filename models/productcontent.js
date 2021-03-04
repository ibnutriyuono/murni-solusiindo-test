'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductContent.belongsTo(models.Product)
      ProductContent.belongsTo(models.Pivot)
      ProductContent.belongsTo(models.Price)
      ProductContent.belongsTo(models.Preview)
      ProductContent.belongsTo(models.Addon)
      ProductContent.belongsTo(models.Stock)
    }
  };
  ProductContent.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    lang: DataTypes.STRING,
    auth_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    PivotId: DataTypes.INTEGER,
    PriceId: DataTypes.INTEGER,
    PreviewId: DataTypes.INTEGER,
    AddonId: DataTypes.INTEGER,
    StockId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductContent',
  });
  return ProductContent;
};
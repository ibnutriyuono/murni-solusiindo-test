'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductContents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      lang: {
        type: Sequelize.STRING
      },
      auth_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER
      },
      count: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ProductId: {
        type: Sequelize.INTEGER
      },
      PivotId: {
        type: Sequelize.INTEGER
      },
      PriceId: {
        type: Sequelize.INTEGER
      },
      PreviewId: {
        type: Sequelize.INTEGER
      },
      AddonId: {
        type: Sequelize.INTEGER
      },
      StockId: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductContents');
  }
};
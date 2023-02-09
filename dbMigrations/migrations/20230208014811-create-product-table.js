'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('product', {
      'id': {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      'name': {
        type: Sequelize.STRING,
        allowNull: false
      },
      'description': {
        type: Sequelize.STRING,
        allowNull: false
      },
      'sku': {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      'manufacturer': {
        type: Sequelize.STRING,
        allowNull: false,
      },
      'quantity': {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      'date_added': {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      'date_last_updated': {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      'owner_user_id': {
        type: Sequelize.INTEGER,
        references: {
          model: 'user', // Can be both a string representing the table name or a Sequelize model
          key: 'id'
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('product');
  }
};

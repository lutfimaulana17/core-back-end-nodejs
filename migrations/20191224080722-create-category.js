'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true, 
        allowNull: false 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // name of Source model
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT', 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Categories');
  }
};
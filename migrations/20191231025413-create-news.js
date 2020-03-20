'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('News', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true, 
        allowNull: false 
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false 
      },
      tag: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      file_name: {
        type: Sequelize.TEXT
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false, 
        references: {
          model: 'Categories', // name of Source model
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
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
    return queryInterface.dropTable('News');
  }
};
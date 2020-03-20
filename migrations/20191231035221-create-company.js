'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true, 
        allowNull: false 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      province: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      about: {
        type: Sequelize.TEXT,
        allowNull: false 
      },
      visi: {
        type: Sequelize.TEXT,
        allowNull: false 
      },
      misi: {
        type: Sequelize.TEXT,
        allowNull: false 
      },
      file_name: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Companies');
  }
};
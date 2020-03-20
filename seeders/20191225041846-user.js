const uuid = require('uuid/v4');
const bcrypt = require('bcryptjs');
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', [{
        id: uuid(),
        name: 'Lutfi Maulana',
        email: 'lutfimaulana.fi@gmail.com',
        password: bcrypt.hashSync('123456'),
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

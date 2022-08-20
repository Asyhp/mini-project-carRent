'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: 'admin1',
        email: 'admin1.testing@carRent.com',
        password: 'Okeoke123',
        address: 'Jakarta',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'user1',
        email: 'user1@carRent.com',
        password: 'Okeoke123',
        address: 'Bogor',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

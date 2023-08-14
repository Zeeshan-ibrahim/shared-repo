'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const firmsData = [
      {
        name: 'ABC Law Firm',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'XYZ Legal Services',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
        updatedAt: new Date(),
        createdAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Firms', firmsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Firms', null, {});
  }
};

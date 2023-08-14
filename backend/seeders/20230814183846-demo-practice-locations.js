'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const practiceLocationsData = [
      {
        name: 'Main Clinic',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Downtown Clinic',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('PracticeLocations', practiceLocationsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PracticeLocations', null, {});
  }
};

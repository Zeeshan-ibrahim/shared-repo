'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const insurancesData = [
      {
        name: 'Blue Cross Blue Shield',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aetna',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cigna',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Insurances', insurancesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Insurances', null, {});

  }
};

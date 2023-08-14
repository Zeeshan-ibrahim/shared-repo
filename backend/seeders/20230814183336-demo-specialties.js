'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const specialtiesData = [
      {
        name: 'Cardiology',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dermatology',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Orthopedics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Specialties', specialtiesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Specialties', null, {});
  }
};

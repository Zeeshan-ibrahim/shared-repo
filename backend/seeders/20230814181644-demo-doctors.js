'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Sample data for 10 doctors
    const doctorsData = [
      {
        first_name: 'John',
        middle_name: 'Michael',
        last_name: 'Doe'
      },
      {
        first_name: 'Jane',
        middle_name: 'Elizabeth',
        last_name: 'Smith'
      },
      // Add more doctor data entries here
    ];

    // Insert doctors into the "Doctors" table
    await queryInterface.bulkInsert('Doctors', doctorsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});

  }
};

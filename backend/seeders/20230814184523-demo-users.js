'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Demo@123', 12);

    const usersData = [
      {
        username: 'zeeshan',
        email: 'admin@admin.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more user data entries here
    ];

    // Insert users into the "Users" table
    await queryInterface.bulkInsert('Users', usersData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

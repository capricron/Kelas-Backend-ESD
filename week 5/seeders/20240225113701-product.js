'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('products', [
      {
        "name": "Baju lebaran",
        "description": "Baju lebaran alhamdulillah",
        "price": 5000,
        "image": "/images/baju-lebaran.jpg"
      },
      {
        "name": "Celana Jeans",
        "description": "Celana Jeans model jamet",
        "price": 10000,
        "image": "/images/celana-jeans.jpg"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

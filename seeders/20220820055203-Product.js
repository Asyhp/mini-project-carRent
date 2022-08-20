'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Products', [
    {
      name: 'Toyota Corolla Altis',
      details: 'Mobil sedan dari toyota yang mewah dan nyaman',
      img_url: 'https://www.toyota.astra.co.id/sites/default/files/2022-02/2_white%20pearl.png',
      price: 500000,
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Suzuki Ertiga',
      details: 'Mobil MPV yang cocok dipakai bersama keluarga',
      img_url: 'http://spesifikasi.ortizaku.com/wp-content/uploads/2018/05/all-new-ertiga-plain4.jpg',
      price: 200000,
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mitsubishi Pajero',
      details: 'Mobil SUV yang cocok dipakai sehari-hari',
      img_url: 'https://i.ytimg.com/vi/n22FBhcHUNA/maxresdefault.jpg',
      price: 350000,
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};

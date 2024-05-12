"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("restaurants", [
      {
        name: "Ho Hung Kee",
        address: "12/F, Hysan Place, 500 Hennessy Road, Causeway Bay",
        phone_number: "85225776558",
        website: "https://m.facebook.com/hohungkee?locale2=zh_HK",
        location_id: 4,
        food_category_id: 1,
        price_category: 2,
        img_url:
          "https://danielfooddiary.com/wp-content/uploads/2018/03/hohungkee8.jpg",
        business_hours: JSON.stringify({
          monday: ["11:00 AM - 9:00 PM"],
          tuesday: ["11:00 AM - 9:00 PM"],
          wednesday: ["11:00 AM - 9:00 PM"],
          thursday: ["11:00 AM - 9:00 PM"],
          friday: ["11:00 AM - 9:00 PM"],
          saturday: ["11:00 AM - 9:00 PM"],
          sunday: ["11:00 AM - 9:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ding Dim 1968",
        address: "G/F, 59 Wyndham Street, Central",
        phone_number: "85223261968",
        website: "http://www.dingdim.com",
        location_id: 1,
        food_category_id: 1,
        price_category: 1,
        img_url:
          "https://www.rnslifebox.com/wp-content/uploads/2023/03/%E8%9E%A2%E5%B9%95%E6%88%AA%E5%9C%96-2023-03-23-%E4%B8%8B%E5%8D%8812.05.49.png",
        business_hours: JSON.stringify({
          monday: ["11:00 AM - 10:00 PM"],
          tuesday: ["11:00 AM - 10:00 PM"],
          wednesday: ["11:00 AM - 10:00 PM"],
          thursday: ["11:00 AM - 10:00 PM"],
          friday: ["11:00 AM - 11:00 PM"],
          saturday: ["11:00 AM - 11:00 PM"],
          sunday: ["11:0 AM - 10:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chôm Chôm",
        address: "G/F, 58-60 Peel Street, Soho, Central",
        phone_number: "85228100850",
        email: "info@chomchom.com.hk",
        website: "https://www.chomchom.com.hk",
        location_id: 1,
        food_category_id: 2,
        price_category: 2,
        img_url:
          "https://www.flyingfourchette.com/wp-content/uploads/2014/07/Chom-Chom.jpg",
        business_hours: JSON.stringify({
          monday: ["06:00 PM - 11:00 PM"],
          tuesday: ["06:00 PM - 11:00 PM"],
          wednesday: ["06:00 PM - 11:00 PM"],
          thursday: ["06:00 PM - 12:00 AM"],
          friday: ["05:00 PM - 12:00 AM"],
          saturday: ["05:00 PM - 12:00 AM"],
          sunday: ["05:00 PM - 11:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hancham Korean BBQ",
        address: "Shop 43, UG/F, Empire Centre, 68 Moddy Road, Tsim Sha Tsui",
        phone_number: "85225166316",
        website: "https://www.facebook.com/HanchamEastTST",
        location_id: 5,
        food_category_id: 4,
        price_category: 2,
        img_url: "https://10619-2.s.cdn12.com/rests/original/108_527005971.jpg",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 3:30 PM", "5-30 PM - 11:00 PM"],
          tuesday: ["12:00 PM - 3:30 PM", "5-30 PM - 11:00 PM"],
          wednesday: ["12:00 PM - 3:30 PM", "5-30 PM - 11:00 PM"],
          thursday: ["12:00 PM - 3:30 PM", "5-30 PM - 11:00 PM"],
          friday: ["12:00 PM - 3:30 PM", "5-30 PM - 11:00 PM"],
          saturday: ["12:00 PM - 3:30 PM", "5-30 PM - 11:00 PM"],
          sunday: ["12:00 PM - 3:30 PM", "5-30 PM - 11:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kushitei",
        address:
          "Shop 04-05, G/F, Grand Centre, 8 Humphreys Avenue, Tsim Sha Tsui",
        phone_number: "85226886150",
        website: "https://www.instagram.com/kushitei_hk",
        location_id: 5,
        food_category_id: 3,
        price_category: 3,
        img_url:
          "https://theloophk.com/wp-content/uploads/2023/02/kushitei-interior.jpg",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 14:30 PM", "05:00 PM - 11:00 PM"],
          tuesday: ["12:00 PM - 14:30 PM", "05:00 PM - 11:00 PM"],
          wednesday: ["12:00 PM - 14:30 PM", "05:00 PM - 11:00 PM"],
          thursday: ["12:00 PM - 14:30 PM", "05:00 PM - 11:00 PM"],
          friday: ["12:00 PM - 14:30 PM", "05:00 PM - 11:00 PM"],
          saturday: ["12:00 PM - 14:30 PM", "05:00 PM - 11:00 PM"],
          sunday: ["12:00 PM - 14:30 PM", "05:00 PM - 11:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("restaurants", {
      name: {
        [Sequelize.Op.in]: [
          "Ho Hung Kee",
          "Ding Dim 1968",
          "Chôm Chôm",
          "Hancham Korean BBQ",
          "Kushitei",
        ],
      },
    });
  },
};

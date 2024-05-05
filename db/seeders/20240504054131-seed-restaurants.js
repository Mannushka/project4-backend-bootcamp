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
        name: "The Monogamous Chinese",
        address: "G/F, 59 Caine Road, Central",
        phone_number: "85225232872",
        email: "info@tmc.com.hk",
        website: "http://themonogamouschinese.com.hk",
        location_id: 1,
        food_category_id: 1,
        price_category: 2,
        img_url:
          "https://img.restaurantguru.com/rad9-picture-The-Monogamous-Chinese.jpg",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 3:00 PM", "6:00 PM - 11:00 PM"],
          tuesday: ["12:00 PM - 3:00 PM", "6:00 PM - 11:00 PM"],
          wednesday: ["12:00 PM - 3:00 PM", "6:00 PM - 11:00 PM"],
          thursday: ["12:00 PM - 3:00 PM", "6:00 PM - 11:00 PM"],
          friday: ["12:00 PM - 3:00 PM", "6:00 PM - 12:00 PM"],
          saturday: ["12:00 PM - 3:00 PM", "5:30 PM - 12:00 AM"],
          sunday: ["12:00 PM - 3:00 PM", "5:30 PM - 11:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Maek Jeok",
        address: "1/F, Sun Hung Kai Centre, 30 Harbour Rd, Wan Chai",
        phone_number: "85226090599",
        website: "https://www.facebook.com/maekjeok",
        location_id: 3,
        food_category_id: 4,
        price_category: 2,
        img_url:
          "https://www.getreadyhk.com/images/stories/blog/foodieyanyannn/maek_joes/img_1667.JPG",
        business_hours: JSON.stringify({
          monday: ["11:30 AM - 11:00 PM"],
          tuesday: ["11:30 AM - 11:00 PM"],
          wednesday: ["11:30 AM - 11:00 PM"],
          thursday: ["11:30 AM - 11:00 PM"],
          friday: ["11:30 AM - 11:00 PM"],
          saturday: ["11:30 AM - 11:00 PM"],
          sunday: ["11:30 AM - 11:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "An Choi",
        address: "Shop A, 15, 17 Mercer St, Sheung Wan",
        email: "hello@anchoi.hk",
        phone_number: "85252861517",
        website: "https://www.anchoi.hk",
        location_id: 3,
        food_category_id: 2,
        price_category: 1,
        img_url: "https://media.timeout.com/images/106107516/750/422/image.jpg",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 10:00 PM"],
          tuesday: ["12:00 PM - 10:00 PM"],
          wednesday: ["12:00 PM - 10:00 PM"],
          thursday: ["12:00 PM - 10:00 PM"],
          friday: ["12:00 PM - 10:00 PM"],
          saturday: ["12:00 PM - 10:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nishiki Don",
        address: "Shop 702, 7/F, iSQUARE, 63 Nathan Road, Tsim Sha Tsui",
        phone_number: "85226280802",
        website: "https://www.facebook.com/NishikiDon.hk",
        location_id: 5,
        food_category_id: 3,
        price_category: 1,
        img_url:
          "https://www.discoverhongkong.com/content/dam/dhk/merchants/images/en/185/18596/1024x768_f1147_nishiki-don_shop-front.jpg",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 10:30 PM"],
          tuesday: ["12:00 PM - 10:30 PM"],
          wednesday: ["12:00 PM - 10:30 PM"],
          thursday: ["12:00 PM - 10:30 PM"],
          friday: ["12:00 PM - 10:30 PM"],
          saturday: ["12:00 PM - 10:30 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ORO, Manhattan-Italian Restaurant",
        address: "30/F, 28 Stanley St, Central",
        phone_number: "85221337517",
        email: "info@oro-toptown.com",
        website: "https://www.oro-toptown.com/oro-home",
        location_id: 1,
        food_category_id: 6,
        price_category: 3,
        img_url:
          "https://cms.robbreport.hk/wp-content/uploads/2022/11/Oro-2_11zon.jpeg",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 15:00 PM", "06:00 PM - 11:00 PM"],
          tuesday: ["12:00 PM - 15:00 PM", "06:00 PM - 11:00 PM"],
          wednesday: ["12:00 PM - 15:00 PM", "06:00 PM - 11:00 PM"],
          thursday: ["12:00 PM - 15:00 PM", "06:00 PM - 11:00 PM"],
          friday: ["12:00 PM - 15:00 PM", "06:00 PM - 11:00 PM"],
          saturday: ["12:00 PM - 15:00 PM", "06:00 PM - 11:00 PM"],
          sunday: ["12:00 PM - 15:00 PM", "06:00 PM - 11:00 PM"],
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
    await queryInterface.bulkDelete("restaurants", null, {});
  },
};

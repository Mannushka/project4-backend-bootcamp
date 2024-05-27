"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("restaurants", [
      {
        name: "Sushi Takumi",
        address: "G/F, 53 Shantung Street, Mong Kok",
        phone_number: "85223663281",
        website:
          "https://www.facebook.com/people/%E5%B7%A7%E5%A3%BD%E5%8F%B8/100092613484066/?mibextid=LQQJ4d",
        location_id: 6,
        food_category_id: 3,
        price_category: 2,
        img_url:
          "https://lh3.googleusercontent.com/p/AF1QipMrGghZtBDgsv5JbacPJDqvubr79_md_jZ9pIfZ=s680-w680-h510",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 11:00 PM"],
          tuesday: ["12:00 PM - 11:00 PM"],
          wednesday: ["12:00 PM - 11:00 PM"],
          thursday: ["12:00 PM - 11:00 PM"],
          friday: ["12:00 PM - 11:00 PM"],
          saturday: ["12:00 PM - 11:00 PM"],
          sunday: ["12:00 PM - 11:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "Bouillon Bistro Parisien",
        address: "6 Pound Lane, Sheung Wan",
        phone_number: "85228860056",
        email: "contact@bouillonhk.com",
        website: "https://bouillonhk.com",
        location_id: 2,
        food_category_id: 9,
        price_category: 3,
        img_url:
          "https://img1.wsimg.com/isteam/ip/291ce601-bcd2-4c89-8aca-5f8b2dea24de/A1P09085%20(1).jpg",
        business_hours: JSON.stringify({
          monday: ["11:30 AM - 10:00 PM"],
          tuesday: ["11:30 AM - 10:00 PM"],
          wednesday: ["11:30 AM - 10:00 PM"],
          thursday: ["11:30 AM - 10:00 PM"],
          friday: ["11:30 AM - 10:00 PM"],
          saturday: ["11:30 AM - 10:00 PM"],
          sunday: ["11:30 AM - 10:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tandoori Bites Bar + Kitchen",
        address: "G/F, 178 Queen's Road West, Sai Ying Pun",
        phone_number: "85291395464",
        email: "info@tandooribites.com.hk",
        website: "http://www.tandooribites.com.hk/",
        location_id: 7,
        food_category_id: 8,
        price_category: 1,
        img_url: "https://media.timeout.com/images/105915686/image.jpg",
        business_hours: JSON.stringify({
          monday: ["11:00 AM - 23:00 PM"],
          tuesday: ["11:00 AM - 23:00 PM"],
          wednesday: ["11:00 AM - 23:00 PM"],
          thursday: ["11:30 AM - 1:30 AM"],
          friday: ["11:30 AM  - 2:00 AM"],
          saturday: ["11:30 AM  - 2:00 AM"],
          sunday: ["11:30 AM  - 2:00 AM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "GYOJASANG",
        address:
          "Shop C, G/F, Fashion Walk, 1-3 Cleveland Street, Causeway Bay",
        phone_number: "85228809868",
        website: "https://www.facebook.com/gyojasang/",
        location_id: 4,
        food_category_id: 4,
        price_category: 2,
        img_url:
          "https://static5.orstatic.com/userphoto2/photo/1X/1J6H/0AWE6KBA58614550DA1EE1lv.jpg",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 11:00 PM"],
          tuesday: ["12:00 PM - 11:00 PM"],
          wednesday: ["12:00 PM - 11:00 PM"],
          thursday: ["12:00 PM - 11:00 PM"],
          friday: ["12:00 PM - 11:30 PM"],
          saturday: ["12:00 PM - 11:30 PM"],
          sunday: ["12:00 PM - 11:30 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "An Nam",
        address: "3/F, Lee Garden Two, 28 Yun Ping Road, Causeway Bay",
        phone_number: "85227873922",
        website: "https://www.annam.com.hk",
        location_id: 4,
        food_category_id: 2,
        price_category: 3,
        img_url: "https://www.annam.com.hk/images/venue/full/81%20(4).jpg",
        business_hours: JSON.stringify({
          monday: ["11:30 AM - 23:30 PM"],
          tuesday: ["11:30 AM - 23:30 PM"],
          wednesday: ["11:30 AM - 23:30 PM"],
          thursday: ["11:30 AM - 23:30 PM"],
          friday: ["11:30 AM - 23:30 PM"],
          saturday: ["11:30 AM - 23:30 PM"],
          sunday: ["11:30 AM - 23:30 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Café de Coral",
        address: "1/F, 241 Cheung Sha Wan Road",
        phone_number: "85227283007",
        website:
          "https://www.cafedecoralfastfood.com/shops.php?lang=en&district=24",
        location_id: 9,
        food_category_id: 1,
        price_category: 1,
        img_url: "https://10619-2.s.cdn12.com/rests/original/104_328868003.jpg",
        business_hours: JSON.stringify({
          monday: ["6:30 AM - 22:00 PM"],
          tuesday: ["6:30 AM - 22:00 PM"],
          wednesday: ["6:30 AM - 22:00 PM"],
          thursday: ["6:30 AM - 22:00 PM"],
          friday: ["6:30 AM - 22:00 PM"],
          saturday: ["6:30 AM - 22:00 PM"],
          sunday: ["6:30 AM - 22:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "The Spice House Restaurant",
        address: "G/F, 35 Amoy Street, Wan Chai",
        phone_number: "85228042522",
        website:
          "https://www.openrice.com/en/hongkong/r-the-spice-house-restaurant-wan-chai-thai-noodles-rice-noodles-r108163",
        location_id: 3,
        food_category_id: 7,
        price_category: 1,
        img_url:
          "https://lh3.googleusercontent.com/p/AF1QipMqMGhd-CU1N3zZZdtQCfb9MaA8F7jBtybzvg1Y=s680-w680-h510",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 22:00 PM"],
          tuesday: ["12:00 PM - 22:00 PM"],
          wednesday: ["12:00 PM - 22:00 PM"],
          thursday: ["12:00 PM - 22:00 PM"],
          friday: ["12:00 PM - 22:00 PM"],
          saturday: ["12:00 PM - 22:00 PM"],
          sunday: ["12:00 PM - 22:00 PM"],
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
  },
};

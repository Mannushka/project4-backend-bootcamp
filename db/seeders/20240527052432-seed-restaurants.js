"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("restaurants", [
      {
        name: "Taqueria Super Macho",
        address: "G/F, 33-35 Bridges Street, Central",
        phone_number: "85223330111",
        email: "info@taqueriasupermacho.com",
        website: "https://www.taqueriasupermacho.com",
        location_id: 1,
        food_category_id: 10,
        price_category: 2,
        img_url:
          "https://blacksheeprestaurants.com/wp-content/uploads/2019/06/TSM-690x370.jpg",
        business_hours: JSON.stringify({
          monday: ["6:00 PM - 11:00 PM"],
          tuesday: ["6:00 PM - 11:00 PM"],
          wednesday: ["6:00 PM - 11:00 PM"],
          thursday: ["6:00 PM - 11:00 PM"],
          friday: ["6:00 PM - 11:45 PM"],
          saturday: ["12:00 PM - 3:00 PM", "6:00 PM - 12:00 AM"],
          sunday: ["12:00 PM - 3:00 PM", "5:00 PM - 10:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "Te Quiero Mucho",
        address: "G/F & 1/F, Ovolo, 286 Queen's Road Central, Sheung Wan",
        phone_number: "85237047566",
        email: "tqm@ovolohotels.com",
        website: "https://ovolohotels.com/hong-kong/te-quiero-mucho",
        location_id: 2,
        food_category_id: 10,
        price_category: 2,
        img_url: "https://media.timeout.com/images/105600106/750/422/image.jpg",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 10:30 PM"],
          tuesday: ["12:00 PM - 10:30 PM"],
          wednesday: ["12:00 PM - 10:30 PM"],
          thursday: ["12:00 PM - 10:30 PM"],
          friday: ["12:00 PM - 10:30 PM"],
          saturday: ["12:00 PM - 10:30 PM"],
          sunday: ["12:00 PM - 10:30 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "El Taquero",
        address:
          "Shop B-F, G/F, Yan King Court, 119 Queen's Road East, Wan Chai",
        phone_number: "85228111998",
        email: "info@eltaquero.hk",
        website: "https://www.epicurean.com.hk/restaurant/el-taquero",
        location_id: 3,
        food_category_id: 10,
        price_category: 2,
        img_url:
          "https://d1ef7ke0x2i9g8.cloudfront.net/hong-kong/Delish-Eats_-El-Taquero-Real-Mexican-Flavours-Come-to-Play-in-Wan-Chai.jpg",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 3:00 PM", "5:00 PM - 11:00 PM"],
          tuesday: ["12:00 PM - 3:00 PM", "5:00 PM - 11:00 PM"],
          wednesday: ["12:00 PM - 3:00 PM", "5:00 PM - 11:00 PM"],
          thursday: ["12:00 PM - 3:00 PM", "5:00 PM - 12:00 AM"],
          friday: ["12:00 PM - 3:00 PM", "5:00 PM - 12:00 AM"],
          saturday: ["12:00 PM - 12:00 AM"],
          sunday: ["12:00 PM - 11:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thai Basil",
        address: "Shop 112, L1/F, Pacific Place, 88 Queensway, Admiralty",
        phone_number: "85225374682",
        website:
          "https://www.pacificplace.com.hk/en/taste/directory/thai-basil",
        location_id: 10,
        food_category_id: 7,
        price_category: 1,
        img_url:
          "https://www.afoodieworld.com/wp-content/uploads/2023/04/THAI_BASIL_2_iorsuh.jpg",
        business_hours: JSON.stringify({
          monday: ["11:30 AM - 10:30 PM"],
          tuesday: ["11:30 AM - 10:30 PM"],
          wednesday: ["11:30 AM - 10:30 PM"],
          thursday: ["11:30 AM - 10:30 PM"],
          friday: ["11:30 AM - 10:30 PM"],
          saturday: ["11:30 AM - 10:30 PM"],
          sunday: ["11:30 AM - 10:30 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thai on High",
        address: "G/F, Kam Lun Mansion, 39-41 High Street, Sai Ying Pun",
        phone_number: "85228587380",
        website:
          "https://www.openrice.com/en/hongkong/r-thai-on-high-western-district-thai-soup-r156726",
        location_id: 7,
        food_category_id: 7,
        price_category: 1,
        img_url:
          "https://static8.orstatic.com/userphoto2/photo/15/WY3/06IAGVBDA44CA9FA448477lv.jpg",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 3:00 PM", "6:00 PM - 11:00 PM"],
          tuesday: ["12:00 PM - 3:00 PM", "6:00 PM - 11:00 PM"],
          wednesday: ["12:00 PM - 3:00 PM", "6:00 PM - 11:00 PM"],
          thursday: ["12:00 PM - 3:00 PM", "6:00 PM - 11:00 PM"],
          friday: ["12:00 PM - 3:00 PM", "6:00 PM - 11:00 PM"],
          saturday: ["12:00 PM - 3:00 PM", "6:00 PM - 11:00 PM"],
          sunday: ["12:00 PM - 3:00 PM", "6:00 PM - 11:00 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("restaurants", {
      name: {
        [Sequelize.Op.in]: [
          "Taqueria Super Macho",
          "Te Quiero Mucho",
          "El Taquero",
          "Thai Basil",
          "Thai on High",
        ],
      },
    });
  },
};

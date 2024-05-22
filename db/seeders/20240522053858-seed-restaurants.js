"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("restaurants", [
      {
        name: "Burger Circus",
        address: "G/F, 22 Hollywood Road, Soho, Central",
        phone_number: "85228787787",
        email: "info@burgercircus.com.hk",
        website: "https://www.burgercircus.com.hk",
        location_id: 1,
        food_category_id: 5,
        price_category: 1,
        img_url:
          "https://images.squarespace-cdn.com/content/v1/634f66b9dcdf3316c431a457/2310570a-94c3-46aa-be62-e6721ee55c5f/burger-circus-american-diner-interior-.jpeg",
        business_hours: JSON.stringify({
          monday: ["12:00 PM - 11:00 PM"],
          tuesday: ["12:00 PM - 11:00 PM"],
          wednesday: ["12:00 PM - 11:00 PM"],
          thursday: ["12:00 PM - 11:00 PM"],
          friday: ["12:00 PM - 12:00 AM"],
          saturday: ["12:00 PM - 12:00 AM"],
          sunday: ["12:00 PM - 12:00 AM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "Nebraska Steak House",
        address: "G/F, Johnston Court, 14-16 Johnston Road, Wan Chai",
        phone_number: "85226030298",
        website: "https://www.facebook.com/nebraskahongkong",
        location_id: 3,
        food_category_id: 5,
        price_category: 2,
        img_url:
          "https://media-cdn.tripadvisor.com/media/photo-s/17/d9/e7/13/nebraska-steakhouse-cuisine.jpg",
        business_hours: JSON.stringify({
          monday: ["11:45 AM - 3:00 PM", "6:00 PM - 10:30 PM"],
          tuesday: ["11:45 AM - 3:00 PM", "6:00 PM - 10:30 PM"],
          wednesday: ["11:45 AM - 3:00 PM", "6:00 PM - 10:30 PM"],
          thursday: ["11:45 AM - 3:00 PM", "6:00 PM - 10:30 PM"],
          friday: ["11:45 AM - 3:00 PM", "6:00 PM - 10:30 PM"],
          saturday: ["11:45 AM - 3:00 PM", "6:00 PM - 10:30 PM"],
          sunday: ["11:45 AM - 3:00 PM", "6:00 PM - 10:30 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Henry",
        address:
          "5/F, Rosewood Hong Kong Victoria Dockside, 18 Salisbury Rd, Tsim Sha Tsui",
        phone_number: "85238918732",
        email: "hongkong.henry@rosewoodhotels.com",
        website: "https://www.rosewoodhotels.com/en/hong-kong/dining/henry",
        location_id: 5,
        food_category_id: 5,
        price_category: 3,
        img_url:
          "https://images.rosewoodhotels.com/is/image/rwhg/rwhkg-henry-interior-1",
        business_hours: JSON.stringify({
          monday: ["6:00 PM - 10:30 PM"],
          tuesday: ["6:00 PM - 10:30 PM"],
          wednesday: ["6:00 PM - 10:30 PM"],
          thursday: ["6:00 PM - 10:30 PM"],
          friday: ["6:00 PM - 10:30 PM"],
          saturday: ["12:00 PM - 3:00 PM", "6:00 PM - 10:30 PM"],
          sunday: ["12:00 PM - 3:00 PM", "6:00 PM - 10:30 PM"],
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Paradise Dynasty",
        address:
          "Shop 203&205, 2/F, Grand Plaza, 625 & 639 Nathan Road, Mong Kok",
        phone_number: "85221773456",
        website: "https://www.paradisegp.com/hk",
        location_id: 6,
        food_category_id: 1,
        price_category: 2,
        img_url:
          "https://4.bp.blogspot.com/-dAKlQeaBw5E/WuqAfLAelhI/AAAAAAAAKns/N6rveAgAcaMSBRSYiD_NJIU_3WSLaHavgCKgBGAs/s1600/IMG_8676.jpg",
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
        name: "Ming Court",
        address: "6F, Cordis Hotel, 555 Shanghai Street, Mong Kok",
        phone_number: "85235523300",
        email: "cdhkg.mingcourt@cordishotels.com​",
        website: "https://www.cordishotels.com/en/hong-kong/dine/ming-court",
        location_id: 6,
        food_category_id: 1,
        price_category: 3,
        img_url:
          "https://assets.langhamhotels.com/is/image/langhamhotelsstage/CDHKG_ming_court_ming_sun_slide04:Medium?wid=2000&hei=1124",
        business_hours: JSON.stringify({
          monday: ["11:00 AM - 2:00 PM", "6:00 PM - 10:30 PM"],
          tuesday: ["11:00 AM - 2:00 PM", "6:00 PM - 10:30 PM"],
          wednesday: ["11:00 AM - 2:00 PM", "6:00 PM - 10:30 PM"],
          thursday: ["11:00 AM - 2:00 PM", "6:00 PM - 10:30 PM"],
          friday: ["11:00 AM - 2:00 PM", "6:00 PM - 10:30 PM"],
          saturday: ["11:00 AM - 2:00 PM", "6:00 PM - 10:30 PM"],
          sunday: ["11:00 AM - 2:00 PM", "6:00 PM - 10:30 PM"],
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
          "Burger Circus",
          "Nebraska Steak House",
          "Henry",
          "Paradise Dynasty",
          "Ming Court",
        ],
      },
    });
  },
};

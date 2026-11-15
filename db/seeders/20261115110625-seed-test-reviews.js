"use strict";
/** @type {import('sequelize-cli').Migration} */
// Direct-display form of Google Drive share links (works in <img> tags).
// NOTE: Google can rate-limit these; if images still break, swap DRIVE() for
// e.g. `https://picsum.photos/seed/review-${id}/400/300` (stable, tokenless).
const PHOTO = (name) => `/test-review-photos/${name}.jpg`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // IDEMPOTENT TEST SEED — wipes ALL review photos + reviews, then inserts
    // exactly these 12 reviews. Run ONLY against the disposable test/dev DB.
    await queryInterface.bulkDelete("review_photos", null, {});
    await queryInterface.bulkDelete("reviews", null, {});

    // Column names are snake_case because queryInterface.bulkInsert bypasses
    // the models and writes raw columns (underscored: true in the models).
    // Review.text has a model validation: minimum 80 characters — all texts comply.
    // created_at ordering: reviews 1-9 are the NEWEST -> they land on page 1
    // (page size 9). Reviews 10-12 are older -> page 2.
    const reviews = [
      {
        user_id: 1,
        restaurant_id: 7,
        rating_value: 4,
        text: "One of the famous dim sum restaurants in Hong Kong. Located on busy Wyndham Street, it is popular with locals and tourists, so expect a wait at peak hours. The har gao and siu mai were fresh and generously sized, and the egg tart had a perfectly flaky crust. Prices are fair for the location, though service gets rushed when the dining room fills up. Would come back for a weekend yum cha with friends.",
        created_at: "2026-11-15T20:10:00+08:00",
        updated_at: "2026-11-15T20:10:00+08:00",
      },
      {
        user_id: 4,
        restaurant_id: 8,
        rating_value: 5,
        text: "Great Vietnamese spot on Peel Street. The pho was fragrant, the spring rolls crisp, and the whole meal came fast. Will be back.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        restaurant_id: 36,
        rating_value: 2,
        text: "Café de Coral is fine if you want something fast and cheap, but the quality has really dropped over the years. The rice was overcooked, the char siu was dry, and the vegetables tasted like they had been sitting under the heat lamp for a while. On the plus side, it is quick, the branches are everywhere, and you can get a full meal for very little money. Good for a rushed lunch, but I would not come here for dinner.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        restaurant_id: 9,
        rating_value: 5,
        text: "This is our third visit and the quality is consistently excellent. The pork belly and marinated beef cooked beautifully on the grill, banchan refills came quickly, and the staff were attentive without hovering. Portions are generous for the price, and the ventilation is good, so you do not leave smelling like smoke. Booking ahead is essential on weekends. Easily one of the better Korean BBQ options in the city.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 11,
        restaurant_id: 12,
        rating_value: 1,
        text: "Came here for a birthday dinner and left disappointed. The steak arrived overcooked after a forty-minute wait, the fries were soggy, and when we mentioned it, the waiter shrugged and walked away. The room is dark and cramped, and at these prices there is no excuse for service this indifferent. The one saving grace was the wine list, but even that could not rescue the evening. Sadly, I cannot recommend it.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        restaurant_id: 2,
        rating_value: 3,
        text: "Solid Korean barbecue on Lockhart Road. Meat quality was good, side dishes average. Decent value overall.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        restaurant_id: 5,
        rating_value: 4,
        text: "ORO is a reliable choice for Italian in the neighborhood. The handmade pasta was al dente, the carbonara rich without being heavy, and the tiramisu actually tasted of coffee rather than just sugar. The room is cosy, though tables are close together and it gets loud when full. Service was warm and paced well. Slightly above mid-range prices, but the cooking justifies it. A good spot for date night or a small group.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        restaurant_id: 31,
        rating_value: 3,
        text: "Good quality sushi at reasonable prices. The omakase was decent though not memorable. Service was polite but slow.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        restaurant_id: 30,
        rating_value: 5,
        text: "Thai on High has the best green curry I have had outside Bangkok. The spice levels are genuinely adjustable, the basil tastes fresh, and the mango sticky rice is the real deal with coconut cream that is not too sweet. Portions are big, prices are modest, and the staff happily explained the menu. It is small, so go early or expect a queue. This place deserves every bit of its local following.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        restaurant_id: 28,
        rating_value: 2,
        text: "This place is brand new, but I have already noticed a line out the door a few times, so we arrived right at opening to beat the wait. The tacos are decent, the tortillas clearly homemade, but the fillings are underseasoned and the salsa selection is limited. Prices are fair and the room is cheerful, but they need time to find their footing. Worth trying again in a few months once the kitchen settles.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        restaurant_id: 33,
        rating_value: 4,
        text: "Ordered delivery from Tandoori Bites and everything arrived hot and well packed. The butter chicken was creamy with a proper kick, the garlic naan was soft and blistered, and the samosas stayed crisp in transit. Portion sizes are generous, two mains easily fed three of us. The restaurant itself is modest but clean, and staff were friendly on the phone. A solid neighborhood Indian option that also travels well.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 11,
        restaurant_id: 5,
        rating_value: 3,
        text: "Pasta was well cooked and the house wine was good value. Nothing extraordinary, but a pleasant dinner at a fair price.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Postgres RETURNING preserves insert order: inserted[i] <-> reviews[i]
    const inserted = await queryInterface.bulkInsert("reviews", reviews, {
      returning: true,
    });

    const photos = [];
    const addPhotos = (reviewIndex, ids) => {
      for (const id of ids) {
        photos.push({
          review_id: inserted[reviewIndex].id,
          photo: PHOTO(id),
          created_at: reviews[reviewIndex].created_at,
          updated_at: reviews[reviewIndex].updated_at,
        });
      }
    };

    addPhotos(0, ["review-01a", "review-01b"]);
    addPhotos(1, ["review-02a", "review-02b", "review-02c"]);
    addPhotos(2, ["review-03a"]);
    addPhotos(3, ["review-04a", "review-04b", "review-04c"]);
    addPhotos(4, ["review-05a"]);
    addPhotos(10, ["review-11a", "review-11b", "review-11c", "review-11d"]);
    addPhotos(11, ["review-12a", "review-12b"]);

    await queryInterface.bulkInsert("review_photos", photos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("review_photos", null, {});
    await queryInterface.bulkDelete("reviews", null, {});
  },
};

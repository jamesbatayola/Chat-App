/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Messages", [
      {
        id: 1,
        content: "sean\n\nHAPPY BIRTHDAY!",
        sent_datetime: new Date(),
        userId: "JJ10",
        chatRoomId: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        content: "salamat pre",
        sent_datetime: new Date(),
        userId: "SP23",
        chatRoomId: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Reset the sequence based on the current Max(id)
    await queryInterface.sequelize.query(`
        SELECT setval('\"Messages_id_seq\"', (SELECT MAX(id) FROM "Messages"));
      `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Messages", null, {});
  },
};

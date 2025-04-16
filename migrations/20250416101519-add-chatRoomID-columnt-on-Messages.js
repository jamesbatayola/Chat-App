/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Messages", "chatRoomId", {
      type: Sequelize.INTEGER,
      references: {
        model: "ChatRooms",
        key: "id",
      },
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Messages", "chatRoomId");
  },
};

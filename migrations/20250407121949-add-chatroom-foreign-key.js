/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("ChatMembers", "chatRoomId", {
			type: Sequelize.INTEGER,
			references: {
				model: "ChatRooms",
				key: "id",
			},
			onDelete: "CASCADE",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("ChatMembers", "chatRoomId");
	},
};

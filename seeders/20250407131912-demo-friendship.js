/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Friendships", [
			{
				id: 1,
				status: "accepted",
				createdAt: new Date(),
				updatedAt: new Date(),
				userId: "JJ10",
				friendId: "SP23",
			},
			{
				id: 2,
				status: "accepted",
				createdAt: new Date(),
				updatedAt: new Date(),
				userId: "SP23",
				friendId: "JJ10",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Friendships", null, {});
	},
};

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				type: Sequelize.STRING(4),
				primaryKey: true,
				allowNull: false,
			},

			username: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};

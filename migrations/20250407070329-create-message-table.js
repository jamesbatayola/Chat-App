/** @type {import('sequelize-cli').Migration} */

export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Messages", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},

			content: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			sent_datetime: {
				type: Sequelize.DATE,
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
		await queryInterface.dropTable("Messages");
	},
};

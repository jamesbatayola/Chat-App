"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ChatRooms", {
			id: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},

			name: {
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
		await queryInterface.dropTable("ChatRooms");
	},
};

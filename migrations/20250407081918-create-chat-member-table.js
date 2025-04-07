"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ChatMembers", {
			id: {
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},

			joined_at: {
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

			// ----- ASSOCIATIONS ----- //

			// userId: {
			// 	type: Sequelize.STRING(4),
			// 	references: {
			// 		model: "Users",
			// 		key: "id",
			// 	},
			// 	onDelete: "CASCADE",
			// },

			// chatRoomId: {
			// 	type: DataTypes.INTEGER,
			// 	references: {
			// 		model: "ChatRooms",
			// 		key: "id",
			// 	},
			// 	onDelete: "CASCADE",
			// },
		});
	},

	async down(queryInterface, Sequelize) {},
};

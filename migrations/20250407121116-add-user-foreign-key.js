"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Messages", "userId", {
			type: Sequelize.STRING(4),
			references: {
				model: "Users",
				key: "id",
			},
			onDelete: "CASCADE",
		});

		await queryInterface.addColumn("Friendships", "userId", {
			type: Sequelize.STRING(4),
			references: {
				model: "Users",
				key: "id",
			},
			onDelete: "CASCADE",
		});

		await queryInterface.addColumn("Friendships", "friendId", {
			type: Sequelize.STRING(4),
			references: {
				model: "Users",
				key: "id",
			},
			onDelete: "CASCADE",
		});

		await queryInterface.addColumn("ChatMembers", "userId", {
			type: Sequelize.STRING(4),
			references: {
				model: "Users",
				key: "id",
			},
			onDelete: "CASCADE",
		});
	},

	async down(queryInterface, Sequelize) {
		queryInterface.removeColumn("Messages", "userId");
		queryInterface.removeColumn("Friendships", "userId");
		queryInterface.removeColumn("Friendships", "friendId");
		queryInterface.removeColumn("ChatMembers", "userId");
	},
};

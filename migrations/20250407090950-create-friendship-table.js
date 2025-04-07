/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Friendships", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},

			status: {
				type: Sequelize.ENUM("pending", "accepted"),
				defaultValue: "pending",
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},

			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},

			// ----- Associations ----- //

			// userId: {
			// 	type: Sequelize.STRING(4),
			// 	references: {
			// 		model: "Users", // points to the Users table
			// 		key: "id", // the column in Users
			// 	},
			// 	onDelete: "CASCADE",
			// },

			// fiendId: {
			// 	type: Sequelize.STRING(4),
			// 	references: {
			// 		model: "Users",
			// 		key: "id",
			// 	},
			// 	onDelete: "CASCADE",
			// },
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Friendships");
	},
};

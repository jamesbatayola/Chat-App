import { hashPassword } from "../src/utils/bcryt.js";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Users", [
			{
				id: "JJ10",
				username: "jake",
				email: "jake@email.com",
				password: await hashPassword("12345"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "SP23",
				username: "sean",
				email: "sean@email.com",
				password: await hashPassword("12345"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "CI28",
				username: "charles",
				email: "charles@email.com",
				password: await hashPassword("12345"),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};

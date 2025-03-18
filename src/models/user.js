import { DataTypes } from "sequelize";

import sequelize from "../config/database.js";

const User = sequelize.define("user", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},

	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default User;

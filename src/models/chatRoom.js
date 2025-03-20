import { DataTypes, INTEGER } from "sequelize";

import sequelize from "../config/database";

const ChatRoom = sequelize.define("chatRoom", {
	id: {
		primaryKey: true,
		allowNull: false,
		type: DataTypes.INTEGER,
		autoIncrement: true,
	},

	name: {
		type: DataTypes.INTEGER,
	},
});

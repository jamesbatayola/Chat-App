import { DataTypes } from "sequelize";

import sequelize from "../config/database.js";

const ChatMember = sequelize.define("chatMember", {
	id: {
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
		type: DataTypes.INTEGER,
	},

	joined_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},
});

export default ChatMember;

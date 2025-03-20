import { DataTypes } from "sequelize";

import sequelize from "../config/database";

const Message = sequelize.define("message", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},

	sender: {},

	message_text: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	sent_datetime: {
		type: DataTypes.DATE,
		allowNull: false,
	},
});

export default Message;

export default (sequelize, DataTypes) => {
	const ChatRoom = sequelize.define("ChatRoom", {
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	ChatRoom.associate = (models) => {
		// A chatroom can have multiple messages
		ChatRoom.hasMany(models.Message);

		// A chatroom can have multiple users
		ChatRoom.belongsToMany(models.User, {
			through: models.ChatMember,
		});
	};

	return ChatRoom;
};

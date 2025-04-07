export default (sequelize, DataTypes) => {
	const ChatMember = sequelize.define("ChatMember", {
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

	return ChatMember;
};

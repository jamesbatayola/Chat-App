export default (sequelize, DataTypes) => {
	const Friendship = sequelize.define("Friendship", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},

		status: {
			type: DataTypes.ENUM("pending", "accepted"),
			defaultValue: "pending",
		},
	});

	return Friendship;
};

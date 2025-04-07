export default (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		id: {
			type: DataTypes.STRING(4),
			primaryKey: true,
			allowNull: false,
		},

		username: {
			type: DataTypes.STRING,
			allowNull: false,
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

	return User;
};

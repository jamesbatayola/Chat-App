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

  User.associate = (models) => {
    // A user can have many connections
    User.belongsToMany(models.User, {
      through: models.Friendship, // Junction table
      as: "Friends", // Alias
      foreignKey: "userId", // Foreign key for User
      otherKey: "friendId", // Foreign key for Friend
    });

    // A user can send many message
    User.hasMany(models.Message);

    // A user can join multiple chatroom
    User.belongsToMany(models.ChatRoom, {
      through: models.ChatMember,
      foreignKey: "userId", // Foreign key for User
      otherKey: "chatRoomId", // Foreign key for ChatRoom
    });
  };

  return User;
};

export default (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define("ChatRoom", {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
  });

  ChatRoom.associate = (models) => {
    // A chatroom can have multiple messages
    ChatRoom.hasMany(models.Message);

    // A chatroom can have multiple users
    ChatRoom.belongsToMany(models.User, {
      through: models.ChatMember,
      foreignKey: "chatRoomId", // Foreign key for Chatroom
      otherKey: "userId", // Foreign key for User
    });
  };

  return ChatRoom;
};

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
      defaultValue: () => new Date(),
    },

    userId: {
      type: DataTypes.STRING(4),
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: false,
    },

    chatRoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ChatRooms",
        key: "id",
      },
      allowNull: false,
    },
  });

  return ChatMember;
};

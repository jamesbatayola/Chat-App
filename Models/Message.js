export default (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    sent_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    // FOREIGN COLUMN //

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

  Message.associate = (models) => {
    // A message is sent by one specific user
    Message.belongsTo(models.User, {
      foreignKey: "userId",
    });

    // Each message belongs to one specific chatroom
    Message.belongsTo(models.ChatRoom, {
      foreignKey: "chatRoomId",
    });
  };

  return Message;
};

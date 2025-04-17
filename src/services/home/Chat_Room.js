import kleur from "kleur";
import db from "../../../Models/Index.js";

export const fetchMessages = async (req) => {
  const id = req.query.id;

  const chat_room = await db.ChatRoom.findByPk(id);
  const chat_room_messages = await chat_room.getMessages();

  const message_list = [];

  for (let msg of chat_room_messages) {
    message_list.push({
      from: msg.userId,
      isMine: msg.userId === req.user.id,
      content: msg.content,
    });
  }

  return message_list;
};

export const sendMessage = (req) => {
  const { content } = req.body;

  console.log(kleur.bgGreen("HHHHH"));
  console.log(content);
};

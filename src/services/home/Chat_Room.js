import kleur from "kleur";
import db from "../../../Models/Index.js";
import { getWsServer } from "../../public/ws.js";

export const fetchMessages = async (req) => {
  const chat_room_id = req.query.chat_room_id;

  const chat_room = await db.ChatRoom.findByPk(chat_room_id);
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

export const sendMessage = async (req) => {
  const { from, chat_room_id, content } = req.body;

  const user_room = await req.user.getChatRooms({
    where: { id: chat_room_id },
  });

  await user_room[0].createMessage({
    userId: from,
    content: content,
    sent_datetime: new Date(),
  });

  // ----- notify (websockt) ----- //

  const ws = getWsServer();

  ws.clients.forEach((client) => {
    if (client.readState === ws.OPEN) {
      client.send(
        JSON.stringify({
          from: `${req.user.id}`,
          chat_room_id: chat_room_id,
          content: content,
        })
      );
    }
  });
};

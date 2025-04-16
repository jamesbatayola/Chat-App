import kleur from "kleur";
import db from "../../../Models/Index.js";

export const showChatRoom = async (req) => {
  const id = req.query.id;

  const chat_room = await db.ChatRoom.findByPk(id);

  console.log(chat_room);
};

export const sendMessage = (req) => {
  const { content } = req.body;

  console.log(kleur.bgGreen("HHHHH"));
  console.log(content);
};

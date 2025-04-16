// --------- PACKAGES --------- //
import express, { urlencoded } from "express";

// import sequelize from "./config/database.js";
import cors from "cors";
import kleur from "kleur";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.SERVER_PORT;

const app = express();

// Fixes for __dirname Not Defined in ES Module Scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --------- MIGRATED MODELS --------- //
import db from "../Models/Index.js";

// // --------- MODELS --------- //
// import User from "./models/user.js";
// import Message from "./models/message.js";
// import ChatRoom from "./models/chatRoom.js";
// import ChatMember from "./models/chatMember.js";
// import Friendship from "./models/friendship.js";

// // Always define foreignKey and otherKey explicitly
// // when doing self-referencing many-to-many relationships to avoid confusion.
// User.belongsToMany(User, {
// 	through: Friendship, // Junction table (stores friendships)
// 	as: "Friends", // Alias for easier querying
// 	foreignKey: "userId", // Column referring to the user who initiated the friendship
// 	otherKey: "friendId", // Column referring to the friend being added
// });

// Message.belongsTo(User); // A message is sent by one specific user.
// User.hasMany(Message); // A user can send many messages.

// Message.belongsTo(ChatRoom); //  Each message belongs to one specific chatroom.
// ChatRoom.hasMany(Message); // A chatroom can have multiple messages

// User.belongsToMany(ChatRoom, { through: ChatMember }); //  A user can join multiple chatrooms.
// ChatRoom.belongsToMany(User, { through: ChatMember }); // A chatroom can have multiple users.

// --------- ROUTES --------- //
import authRoute from "./routes/auth.js";
import chatRoute from "./routes/chat.js";

// --------- MIDDLEWARES --------- //
app.use(
  cors({
    credentials: true, // crucial: allows cookies to be accepted
  })
);

app.use(express.static(path.join(__dirname, "public"))); // serves static files

app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use(chatRoute);

// ======= TEST ROUTES ======= //

import { jwtAuth } from "./services/authentication/jwt.js";

// app.get("/test-users", async (req, res) => {
//   const users = await db.User.findAll();

//   res.json({
//     message: "success",
//     users: users,
//   });
// });

// app.get("/test-user", async (req, res) => {
//   const user = await db.User.findByPk("JJ10");
//   const friends = await user.getFriends({
//     through: { where: { status: "accepted" } },
//   });
//   const pending = await user.getFriends({
//     through: { where: { status: "pending" } },
//   });

//   res.json({
//     message: "success",
//     user: user,
//     friends: friends,
//     pendings: pending,
//   });
// });

// app.get("/test-add-user", async (req, res) => {
//   const user_1 = await db.User.findByPk("JJ10");

//   const user_2 = await db.User.findByPk("CI28");

//   try {
//     await user_1.addFriend(user_2);
//   } catch (err) {
//     console.log(kleur.bgRed("ERROR OCCURED"));
//     console.log(err);
//     throw err;
//   }

//   res.json({
//     status: "success",
//     message: `${user_1.username} added ${user_2.username}`,
//   });
// });

// app.get("/chatroom", jwtAuth, async (req, res) => {
//   const user_chat_rooms = await req.user.getChatRooms();

//   const friend_list = [];

//   for (let room of user_chat_rooms) {
//     const users = await room.getUsers();

//     for (let user of users) {
//       //
//       if (user.id !== req.user.id) {
//         friend_list.push({
//           friend_username: user.username,
//           friend_id: user.id,
//           chat_room_id: room.id,
//         });
//       }
//       //
//     }
//   }

//   console.log(friend_list);

//   res.json({
//     friend_list: friend_list,
//   });
// });

// global error handler
// returns to the client
app.use((error, req, res, next) => {
  res.status(error.statusCode).json({
    info: error.info,
    message: error.message || "INTERNAL ERROR",
    status: error.status,
  });
});

// --------- STARTS SERVER --------- //

import { runServer } from "./services/server.js";
import { wsInit } from "./public/ws.js";

try {
  // const _sync = await sequelize.sync({ force: true });
  // const sync = await sequelize.sync();
  await db.sequelize.authenticate();

  // RUNS THE NODE AND WEBSOCKET SERVER
  const nodeServer = await runServer(app, PORT);
  await wsInit(nodeServer);
} catch (err) {
  console.log("DATABASE ERROR", err);
}

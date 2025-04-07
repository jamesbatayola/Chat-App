// --------- PACKAGES --------- //
import express, { urlencoded } from "express";

import sequelize from "./config/database.js";
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
import db from "../models/Index.js";

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
	}),
);

app.use(express.static(path.join(__dirname, "public"))); // serves static files

app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
// app.use(chatRoute);

app.get("/test-users", async (req, res) => {
	const users = await db.User.findAll();

	res.json({
		message: "success",
		users: users,
	});
});

app.get("/test-user", async (req, res) => {
	const user = await db.User.findOne({ where: { username: "jake" } });
	const friends = await user.getFriends();

	res.json({
		message: "success",
		user: user,
		friends: friends,
	});
});

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

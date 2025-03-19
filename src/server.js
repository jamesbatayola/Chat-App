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

// --------- MODELS --------- //
import User from "./models/user.js";

// --------- ROUTES --------- //
import authRoute from "./routes/auth.js";
import chatRoute from "./routes/chat.js";

// --------- MIDDLEWARES --------- //
app.use(cors());

app.use(express.static(path.join(__dirname, "public"))); // serves static files
app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use(chatRoute);

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
try {
	const sync = await sequelize.sync();

	app.listen(PORT, () => {
		console.log(kleur.bgWhite(`Listening on port ${kleur.bgCyan(PORT)}`));
	});
} catch (err) {
	console.log("DATABASE ERROR", err);
}

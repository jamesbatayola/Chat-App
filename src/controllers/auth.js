import kleur from "kleur";
import { createUser, loginUser } from "../services/authentication/authPage.js";
import { getServer } from "../services/server.js";
import { wsInit, getWsServer } from "../public/ws.js";

const getLogin = async (req, res, next) => {
	res.render("auth/login");
};

const postLogin = async (req, res, next) => {
	try {
		// Authenticate user & generate JWT
		const payload = await loginUser(req.body);

		// Storing JWT token via HttpOnly cookie
		res.cookie("token", payload.token, {
			httpOnly: true, // XSS protection
			sameSite: "Strict", // SRF protection
			maxAge: 3600000, // 1 hour expiration
		});

		res.cookie("user_id", payload.user.id, {
			sameSite: "Strict",
			secure: false,
			maxAge: 3600000, // 1 hour expiration
		});

		// const wsServer = getWsServer();

		// wsServer.on("connection", (ws, req) => {});

		res.status(200).json({
			status: "success",
			message: "Redirecting to home page",
			link: "home",
		});
	} catch (err) {
		next(err);
	}
};

const getSignup = async (req, res, next) => {
	res.render("auth/signup");
};

const postSignup = async (req, res, next) => {
	try {
		// service method
		const newUser = await createUser(req.body);
		res.status(200).json({
			status: "success",
			message: "successfully created an account",
			createdUser: {
				id: newUser.id,
				username: newUser.username,
				email: newUser.email,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default { getLogin, postLogin, getSignup, postSignup };

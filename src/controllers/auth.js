import kleur from "kleur";
import { createUser, loginUser } from "../services/authentication/authPage.js";
import { getServer } from "../services/server.js";
import { wsInit, getWsServer } from "../services/webSocket.js";

const getLogin = async (req, res, next) => {
	res.render("auth/login");
};

const postLogin = async (req, res, next) => {
	try {
		// Authenticate user & generate JWT
		const payload = await loginUser(req.body);

		// Storing JWT token via HttpOnly cookie
		res.cookie("token", payload.token, {
			httOnly: true, // XSS protection
			sameSite: "Strict", // SRF protection
			maxAge: 3600000, // 1 hour expiration
		});

		// create websocket handshake
		const server = getServer();
		const wsServer = wsInit(server);

		wsServer.on("connection", (ws) => {
			
		})

		console.log(kleur.bgGreen("WEB SOCKET IS ESTABLISHED"));

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

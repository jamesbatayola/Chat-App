import { createUser, loginUser } from "../services/authentication/authPage.js";

const getLogin = async (req, res, next) => {
	res.render("auth/login");
};

const postLogin = async (req, res, next) => {
	try {
		// Authenticate user & generate JWT
		const payload = await loginUser(req.body);

		console.log(payload);

		// Storing JWT token via HttpOnly cookie
		res.cookie("token", payload.token, {
			httOnly: true, // XSS protection
			sameSite: "Strict", // SRF protection
			maxAge: 3600000, // 1 hour expiration
		});

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
				email: newUser.email,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default { getLogin, postLogin, getSignup, postSignup };

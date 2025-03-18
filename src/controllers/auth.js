import { createUser, loginUser } from "../services/authentication/authPage.js";

const getLogin = async (req, res, next) => {
	res.render("auth/login");
};

const postLogin = async (req, res, next) => {
	try {
		const user = await loginUser(req.body);

		res.status(200).json({
			status: 200,
			message: "successully logged in",
			user: {
				id: user.id,
				email: user.email,
			},
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

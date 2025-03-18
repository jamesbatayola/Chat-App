import User from "../../models/user.js";
import { hashPassword, decryptPassword } from "../../utils/bcryt.js";

export const createUser = async (requestBody) => {
	const { email, password } = requestBody;

	const findUser = await User.findOne({ where: { email: email } });

	// If user already exist
	if (findUser) {
		const error = new Error("Cannot create use | Already exist");
		error.statusCode = 409;
		error.type = "data_conflict_error";
		error.info = `${email} already used, please input another email`;
		throw error;
	}

	const newUser = await User.create({
		email: email,
		password: await hashPassword(password),
	});

	return newUser;
};

export const loginUser = async (requestBody) => {
	const { email, password } = requestBody;

	const findUser = await User.findOne({ where: { email: email } });

	// if email does not exist
	if (!findUser) {
		const error = new Error("User does not exist");
		error.statusCode = 404;
		error.info = `The email "${email}" do not exist`;
		throw error;
	}

	// if invalid password
	if (!(await decryptPassword(password, findUser.password))) {
		const error = new Error("Invalid password");
		error.statusCode = 401;
		error.info = "You typed a wrong password";
		throw error;
	}

	return findUser;
};

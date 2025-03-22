import kleur from "kleur";
import User from "../../models/user.js";
import { number } from "zod";
import { Op } from "sequelize";

export const searchFriend = async (requestBody) => {
	const { username, myID } = requestBody;

	const findUsers = await User.findAll({
		where: {
			username: username,
			id: { [Op.ne]: myID }, // Exclude my own ID
		},
	});

	if (findUsers.length <= 0) {
		const err = new Error("No user found");
		err.statusCode = 404;
		err.status = "failed";
		throw err;
	}

	const users = (await findUsers).map((user) => ({
		username: user.username,
		id: user.id,
	}));

	return users;
};

export const addFriend = async (requestBody) => {};

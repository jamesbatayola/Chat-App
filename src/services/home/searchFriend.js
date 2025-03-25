import kleur from "kleur";
import User from "../../models/user.js";

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

export const addFriend = async (requestObject) => {
	const user = await requestObject.user;

	if (!user) {
		const err = new Error("User is not provided in the request body");
		err.statusCode = 404;
		throw err;
	}

	const { userId } = await requestObject.body;

	if (!userId) {
		const err = new Error("User id does not exist");
		err.statusCode = 404;
		throw err;
	}

	const friendToAdd = await User.findByPk(userId);

	await user.addFriend(friendToAdd);

	return;
};

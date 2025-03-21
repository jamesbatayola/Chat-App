import User from "../../models/user.js";

export const addFriend = async (requestBody) => {
	const { username } = requestBody;

	const findUsers = await User.findAll({ where: { username: username } });

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

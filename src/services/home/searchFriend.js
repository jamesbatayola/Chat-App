import kleur from "kleur";
import User from "../../models/user.js";
import { Op } from "sequelize";
import Friendship from "../../models/friendship.js";
import { getWsServer } from "../../public/ws.js";

export const searchFriend = async (req) => {
	const { username, myID } = req.body;

	const isFriend = req.user.getFriends({ where: { username: username } });

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

	const connectedFriends = await req.user.getFriends(); // returns an array

	const users = await Promise.all(
		findUsers.map(async (user) => {
			const to_accept = await Friendship.findOne({ where: { userId: user.id, friendId: myID } });

			const to_cancel = connectedFriends.find((e) => e.id === user.id);

			return {
				id: user.id,
				username: user.username,
				status: to_accept ? "Accept" : to_cancel ? "Cancel" : "Add",
			};
		}),
	);

	return users;
};

export const addFriend = async (req) => {
	const user = await req.user;

	// error-handler
	if (!user) {
		const err = new Error("User is not provided in the request body");
		err.statusCode = 404;
		throw err;
	}

	const { userId } = await req.body;

	// error-handler
	if (!userId) {
		const err = new Error("User id does not exist");
		err.statusCode = 404;
		throw err;
	}

	const user_to_add = await User.findByPk(userId);

	await user.addFriend(user_to_add);

	const wss = getWsServer();

	// notify the user you added
	wss.clients.forEach((client) => {
		if (client.readState === wss.OPEN) {
			client.send(
				JSON.stringify({
					type: "addfriend",
					from: {
						id: user.id,
						username: user.username,
					},
					recipient: {
						id: user_to_add.id,
						username: user_to_add.username,
					},
				}),
			);
		}
	});

	return;
};

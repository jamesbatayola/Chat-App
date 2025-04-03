import kleur from "kleur";
import User from "../../models/user.js";
import Friendship from "../../models/friendship.js";
import { getWsServer } from "../../public/ws.js";

export const showPending = async (req) => {
	const pendingAdded = await req.user.getFriends({
		through: { where: { status: "pending" } },
	});

	return pendingAdded;
};

export const showAdded = async (req) => {
	// junction rows
	const friendships = await Friendship.findAll({
		where: { friendId: req.user.id },
	});

	// users
	const addedYou = await Promise.all(
		friendships.map(async (e) => {
			return await User.findByPk(e.userId);
		}),
	);

	return addedYou;
};

export const acceptFriendRequest = (req) => {};

export const cancelFriendRequest = async (req) => {
	const { pending_user_id } = req.body;

	console.log(kleur.bgBlue("HHHHHHHHHHHH"));
	console.log(pending_user_id);

	const connection = await Friendship.findOne({
		where: { userId: req.user.id, friendId: pending_user_id },
	});

	if (!connection) {
		const err = new Error("connection-friendship does not exist");
		err.statusCode = 404;
		throw err;
	}

	const user_to_cancel = await req.user.getFriends({ where: { id: pending_user_id } });

	if (!user_to_cancel) {
		const err = new Error("User to be canceled does not exist");
		err.statusCode = 404;
		throw err;
	}

	const wss = getWsServer();

	// notify the user you canceled add request
	wss.clients.forEach((client) => {
		if (client.readState === wss.OPEN) {
			client.send(
				JSON.stringify({
					type: "cancel_request",
					from: {
						id: req.user.id,
						username: req.user.username,
					},
					recipient: {
						id: user_to_cancel[0].id,
						username: user_to_cancel[0].username,
					},
				}),
			);
		}
	});

	await connection.destroy();

	return;
};

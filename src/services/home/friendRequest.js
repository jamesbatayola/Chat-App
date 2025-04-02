import kleur from "kleur";
import User from "../../models/user.js";
import Friendship from "../../models/friendship.js";

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

	const user_to_cancel = await Friendship.findOne({
		where: { userId: req.user.id, friendId: pending_user_id },
	});

	if (!user_to_cancel) {
		const err = new Error("User to be delete does not exist");
		err.statusCode = 404;
		throw err;
	}

	await user_to_cancel.destroy();

	return {
		status: "success",
	};
};

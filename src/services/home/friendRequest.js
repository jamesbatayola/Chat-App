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

export const acceptRequest = (req) => {};

export const cancelRequest = (req) => {};

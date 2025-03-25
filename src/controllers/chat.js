import kleur from "kleur";
import { searchFriend, addFriend } from "../services/home/searchFriend.js";
import { getWsServer } from "../services/webSocket.js";
import { where } from "sequelize";
import User from "../models/user.js";
import Friendship from "../models/friendship.js";

const getHome = async (req, res, next) => {
	try {
		const user = req.user;

		if (!user) {
			const err = new Error("User does not exist");
			err.statusCode = 404;
			throw err;
		}

		const userFriends = await user.getFriends({
			through: { where: { status: "accepted" } }, // accessing junction table fields
		});

		res.render("home/home", {
			friends: userFriends,
		});
	} catch (err) {
		next(err);
	}
};

const getFriendRequest = async (req, res, next) => {
	try {
		const pendingAdded = await req.user.getFriends({
			through: { where: { status: "pending" } },
		});

		// junction rows
		const addedYou = await Friendship.findAll({
			where: { friendId: req.user.id },
		});

		// users
		const _addedYou = await Promise.all(
			addedYou.map(async (e) => {
				return await User.findByPk(e.userId);
			}),
		);

		res.render("home/friend_request", {
			pendingAdded: pendingAdded,
			addedYou: _addedYou,
		});
	} catch (err) {
		next(err);
	}
};

const getSearchFriend = async (req, res, next) => {
	res.render("home/search_friend", {
		user: req.user,
	});
};

const postSearchFriend = async (req, res, next) => {
	try {
		const users = await searchFriend(req.body);

		res.status(200).json({
			users,
		});
	} catch (err) {
		next(err);
	}
};

const postAddFriend = async (req, res, next) => {
	try {
		const res = addFriend(req);

		res.status(200).json({
			status: "success",
			message: `${req.body.userName} is added`,
		});
	} catch (err) {
		next(err);
	}
};

export default { getHome, getFriendRequest, getSearchFriend, postSearchFriend, postAddFriend };

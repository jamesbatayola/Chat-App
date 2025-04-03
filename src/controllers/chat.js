import kleur from "kleur";
import { searchFriend, addFriend } from "../services/home/searchFriend.js";
import {
	showPending,
	showAdded,
	cancelFriendRequest,
	acceptFriendRequest,
} from "../services/home/friendRequest.js";
import { getWsServer } from "../public/ws.js";
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
		const show_pendings = await showPending(req);

		const show_who_added_you = await showAdded(req);

		res.render("home/friend_request", {
			my_id: req.user.id,
			pendingAdded: show_pendings,
			addedYou: show_who_added_you,
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
		const users = await searchFriend(req);

		res.status(200).json({
			users,
		});
	} catch (err) {
		next(err);
	}
};

const postAddFriend = async (req, res, next) => {
	try {
		const addFriendRes = addFriend(req);

		res.status(200).json({
			status: "success",
			message: `${req.body.userName} is added`,
		});
	} catch (err) {
		next(err);
	}
};

const postCancelRequest = async (req, res, next) => {
	try {
		cancelFriendRequest(req);

		res.status(200).json({
			status: "success",
			messge: `Successfully cancel friend request`,
		});
	} catch (err) {
		next(err);
	}
};

const postAcceptRequest = async (req, res, next) => {
	try {
		acceptFriendRequest(req);

		res.status(200).json({
			status: "success",
			message: "successfully accepted friend request",
		});
	} catch (err) {
		next(err);
	}
};

export default {
	getHome,
	getFriendRequest,
	getSearchFriend,
	postSearchFriend,
	postAddFriend,
	postCancelRequest,
	postAcceptRequest,
};

import { addFriend } from "../services/home/addFriend.js";

const getHome = async (req, res, next) => {
	res.render("home/home");
};

const getAddFriend = async (req, res, next) => {
	res.render("home/add_friend", {
		user: req.user,
	});
};

const postAddFriend = async (req, res, next) => {
	try {
		const users = await addFriend(req.body);

		res.status(200).json({
			users,
		});
	} catch (err) {
		next(err);
	}
};

export default { getHome, getAddFriend, postAddFriend };

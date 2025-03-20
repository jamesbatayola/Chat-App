const getHome = (req, res, next) => {
	res.render("home/home");
};

const getAddFriend = (req, res, next) => {
	res.render("home/add_friend");
};

export default { getHome, getAddFriend };

const getHome = (req, res, next) => {
	res.render("home/index");
};

export default { getHome };

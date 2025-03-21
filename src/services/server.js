import kleur from "kleur";

let server;

export const runServer = async (APP, PORT) => {
	server = APP.listen(PORT, async () => {
		console.log(kleur.bgWhite(`Running on port ${kleur.bgYellow(PORT)}`));
	});

	return server;
};

export const getServer = () => {
	if (!server) {
		const err = Error("Server is not started");
		err.status = 69;
		throw err;
	}

	return server;
};

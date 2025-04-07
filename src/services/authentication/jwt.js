import jwt from "jsonwebtoken";
// import User from "../../models/user.js";
import db from "../../../models/Index.js";
import kleur from "kleur";
import { bgBlue } from "kleur/colors";

// 1) Get the token from COOKIE
// 2) Decode the token
// 3) Assign its payload to request object

export const jwtAuth = async (req, res, next) => {
	try {
		// ------- 1st STEP ------- //

		const token = req.cookies.token;

		if (!token) {
			console.log(kleur.bgRed("NO JWT TOKEN PROVIDED"));
			const error = new Error("No JWT token provided");
			error.status = "failed";
			error.statusCode = 401;
			throw error;
		}

		// ------- 2nd STEP ------- //

		// temp decoded token variable
		let decodedToken;

		try {
			decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
		} catch (err) {
			console.log(kleur.bgRed("ERROR DECODING TOKEN"));
			const error = new Error(err.message);
			error.statusCode = err.name === "TokenExpiredError" ? 401 : 403; // 401 → Expired, 403 → Invalid
			throw error;
		}

		// ------- 3rd STEP ------- //

		// fetches and assign jwt payload to req.user object
		req.user = await db.User.findOne({ where: { email: decodedToken.email } });

		if (!req.user) {
			console.log(kleur.bgRed("TOKEN MISMTACH"));
			const error = new Error("Token-User mismatch error");
			error.statusCode = 401;
			throw error;
		}

		next();
	} catch (err) {
		err.statusCode = err.statusCode || 500;
		err.message = err.message || "Something went wrong while auhtenticating jwt";
		next(err);
	}
};

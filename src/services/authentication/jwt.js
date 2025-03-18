import jwt from "jsonwebtoken";
import User from "../../models/user.js";

// 1) Get the token from HEADER
// 2) Decode the token
// 3) Assign its payload to request object

const verify = async (req, res, next) => {
	try {
		// ------- 1st STEP ------- //

		const authHeader = req.get("authorization");

		if (!authHeader) {
			const error = new Error("No JWT token provided");
			error.statusCode = 401;
			return next(error);
		}

		// fetches token besides Bearer
		const token = authHeader.split(" ")[1];

		// ------- 2nd STEP ------- //

		// temp decoded token variable
		let decodedToken;

		// decode token
		jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
			if (!err) {
				decodedToken = decoded;
			}

			// error handler
			if (err.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Token has expired" });
			} else if (err.name === "JsonWebTokenError") {
				return res.status(401).json({ message: "Invalid token" });
			} else {
				return res.status(500).json({ message: "Internal server error" });
			}
		});

		// ------- 3rd STEP ------- //

		// fetches and assign jwt payload to req.user object
		req.user = await User.find({ where: { email: decodedToken.email } });

		if (!req.user) {
			const error = new Error("Token-User mismatch error");
			error.statusCode = 401;
			next(error);
		}

		next();
	} catch (err) {
		err.statusCode = err.statusCode || 500;
		err.message = err.message || "Something went wrong while auhtenticating jwt";
		next(err);
	}
};

export default verify;

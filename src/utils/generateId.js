import User from "../models/user.js";
import crypto from "crypto";

export const generateId = async () => {
	let newID;

	do {
		newID = crypto.randomBytes(2).toString("hex").toUpperCase();
	} while (await User.findOne({ where: { id: newID } }));

	return newID;
};

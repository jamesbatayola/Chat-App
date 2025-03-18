import bcrypt from "bcryptjs";

export const hashPassword = async (pass) => {
	return await bcrypt.hash(pass, 12);
};

export const decryptPassword = async (pass, encryptedCode) => {
	return await bcrypt.compare(pass, encryptedCode);
};

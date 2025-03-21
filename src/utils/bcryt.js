import bcrypt from "bcryptjs";
import kleur from "kleur";

export const hashPassword = async (pass) => {
	try {
		return await bcrypt.hash(pass, 12);
	} catch (err) {
		console.log(kleur.bgRed("Error encrypting password"));
		throw err;
	}
};

export const decryptPassword = async (pass, encryptedCode) => {
	try {
		return await bcrypt.compare(pass, encryptedCode);
	} catch (err) {
		console.log(kleur.bgRed("Error decrypting password"));
		throw err;
	}
};

// neccessary
import dotenv from "dotenv";
dotenv.config();

export default {
	development: {
		username: process.env.DB_USERNAME || "postgres",
		password: process.env.DB_PASSWORD || "2003",
		database: process.env.DB_NAME || "ChatApp",
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT || "2000",
		dialect: process.env.DB_DIALECT || "postgres",
	},
};

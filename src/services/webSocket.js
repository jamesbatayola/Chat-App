import { WebSocketServer } from "ws";
import kleur from "kleur";

let wss;

export const wsInit = async (server) => {
	if (!server) {
		console.log(kleur.bgRed("INVALID SERVER"));
		const err = new Error("Invalid server");
		err.statusCode = 499;
		throw err;
	}

	wss = new WebSocketServer({ server });

	wss.on("connection", (ws) => {
		ws.on("message", (message) => {
			console.log("Received: ", message);
		});

		ws.on("close", () => {
			console.log(kleur.bgRed("User diconnects"));
		});
	});

	return wss;
};

export const getWsServer = () => {
	if (!wss) {
		throw new Error("No web socket initialized");
	}

	return wss;
};

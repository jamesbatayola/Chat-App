import { WebSocketServer, WebSocket } from "ws";
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

	// listens for incoming web connections
	wss.on("connection", (ws) => {
		// send message to client who connects
		ws.send("You are connect to WebSocket Server");

		// listener for new comers
		ws.on("message", (message) => {
			console.log(kleur.bgGreen(`Recieved ${message}`));
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

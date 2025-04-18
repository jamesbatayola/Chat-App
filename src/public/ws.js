import { WebSocketServer, WebSocket } from "ws";
import kleur from "kleur";

let wss;

// Initialize websocket server
// param [node app server]
export const wsInit = async (server) => {
  if (!server) {
    console.log(kleur.bgRed("INVALID SERVER"));
    const err = new Error("Invalid server");
    err.statusCode = 499;
    throw err;
  }

  wss = new WebSocketServer({ server });

  return wss;
};

export const getWsServer = () => {
  if (!wss) {
    throw new Error("No web socket initialized");
  }

  return wss;
};

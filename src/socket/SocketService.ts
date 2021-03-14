import { Server } from "ws";
import { SocketMessage } from "./SocketMessage";

class SocketService {
  private server: Server;

  private handlers: Function[] = [];

  public constructor(server: Server) {
    this.server = server;

    this.setup();
  }

  public setup() {
    this.server.on("connection", (socket) => {
      socket.on("message", async (data: string) => {
        for (const handler of this.handlers) {
          socket.send(await handler(new SocketMessage(data)));
        }
      });
    });
  }

  public onMessage(handler: Function) {
    this.handlers.push(handler);
  }
}

export default SocketService;

export { SocketService };

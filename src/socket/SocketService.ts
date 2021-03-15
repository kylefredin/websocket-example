import { Server } from "ws";
import { SocketMessage } from "./SocketMessage";

class SocketService {
  /**
   * @type {Server}
   */
  private server: Server;

  /**
   * @type {Function[]}
   */
  private handlers: Function[] = [];

  /**
   * @param {Server} server
   */
  public constructor(server: Server) {
    this.server = server;

    this.setup();
  }

  /**
   * Setup the socket service
   *
   * @return {void}
   */
  public setup(): void {
    this.server.on("connection", (socket) => {
      socket.on("message", async (data: string) => {
        for (const handler of this.handlers) {
          socket.send(await handler(new SocketMessage(data)));
        }
      });
    });
  }

  /**
   * Register a handler for socket messages
   *
   * @param {Function} handler
   * @return {void}
   */
  public onMessage(handler: Function): void {
    this.handlers.push(handler);
  }
}

export default SocketService;

export { SocketService };

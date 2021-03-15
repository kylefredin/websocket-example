import { validate } from "class-validator";
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
      socket.on("message", (data: string) =>
        this.onSocketMessage(socket, data)
      );
    });
  }

  /**
   * Register a handler for socket messages
   *
   * @param {Function} handler
   * @return {void}
   */
  public registerMessageHandler(handler: Function): void {
    this.handlers.push(handler);
  }

  /**
   * Responsible for handling "message" events from the WebSocket Server
   *
   * @param {*} socket
   * @param {string} data
   * @return {Promise<void>}
   */
  private async onSocketMessage(socket: any, data: string): Promise<void> {
    const message = new SocketMessage(data);
    const errors = await validate(message);

    if (errors.length > 0) {
      console.error(errors);
      return;
    }

    for (const handler of this.handlers) {
      socket.send(await handler(message));
    }
  }
}

export default SocketService;

export { SocketService };

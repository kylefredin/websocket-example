import { validate } from "class-validator";
import { Server } from "ws";
import { Logger } from "winston";
import { SocketMessage } from "./SocketMessage";

class SocketService {
  /**
   * @type {Server}
   */
  private server: Server;

  /**
   * @type {Logger}
   */
  private logger: Logger;

  /**
   * @type {Function[]}
   */
  private handlers: Function[] = [];

  /**
   * @param {Server} server
   */
  public constructor(server: Server, logger: Logger) {
    this.server = server;
    this.logger = logger;

    this.setup();
  }

  /**
   * Setup the socket service
   *
   * @return {void}
   */
  public setup(): void {
    this.server.on("connection", (socket) => {
      this.logger.info({ message: "Socket connection" });

      socket.on("message", (data: string) => {
        this.logger.info({ message: "Socket message", data });

        this.onSocketMessage(socket, data);
      });
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
      this.logger.error(errors);
      return;
    }

    for (const handler of this.handlers) {
      socket.send(await handler(message));
    }
  }
}

export default SocketService;

export { SocketService };

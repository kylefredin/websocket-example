import * as express from "express";
import { Server } from "ws";
import { ExpressBootstrap } from "./ExpressBootstrap";
import { Configuration } from "./Configuration";

class WebSocketApplication {
  /**
   * @type {express.Application}
   */
  public expressApplication: express.Application;

  /**
   * @type {Server}
   */
  public websocketServer: Server;

  /**
   * @type {ExpressBootstrap}
   */
  public expressBootstrap: ExpressBootstrap = new ExpressBootstrap();

  /**
   * @type {Configuration}
   */
  private config: Configuration;

  /**
   * Setup the Websocket Application
   *
   * This class is responsible for combining the Express application,
   * Websocket server and application bootstrap
   *
   * @param {Configuration} config
   */
  public constructor(config: Configuration) {
    this.config = config;

    this.expressApplication = express();

    this.websocketServer = new Server({
      port: config.websocketPort,
      host: config.websocketHost,
      noServer: true,
    });
  }

  /**
   * Starts the WebSocket Application
   *
   * @return {void}
   */
  public start(): void {
    this.expressBootstrap.setup(this.expressApplication, this.websocketServer);

    this.expressApplication.listen(
      this.config.serverPort,
      this.applicationListener.bind(this)
    );
  }

  /**
   * @return {void}
   */
  private applicationListener(): void {
    console.log(`App listening at ${this.config.baseUrl}`);
  }
}

export default WebSocketApplication;

export { WebSocketApplication };

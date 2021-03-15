import { Application, Request, Response, NextFunction } from "express";
import * as hbs from "express-handlebars";
import { Logger, createLogger, format, transports } from "winston";
import * as expressWinston from "express-winston";
import { Server } from "ws";
import { IndexController } from "../index/IndexController";
import { RandomController } from "../random/RandomController";
import { SocketService } from "../socket/SocketService";

class ExpressBootstrap {
  /**
   * Setup the application
   *
   * @param {Application} app
   * @param {Server} server
   * @return {void}
   */
  public setup(app: Application, server: Server): void {
    const logger = this.setupLogger(app);

    this.setupEngine(app);
    this.setupErrorHandler(app, logger);
    this.setupControllers(app, server, logger);
  }

  /**
   * Setup the rendering engine for the application
   *
   * @param {Application} app
   * @return {void}
   */
  private setupEngine(app: Application): void {
    app.engine("handlebars", hbs());

    app.set("view engine", "handlebars");
  }

  /**
   * Setup the error handler for the application
   *
   * @param {Application} app
   * @param {Logger} logger
   * @return {void}
   */
  private setupErrorHandler(app: Application, logger: Logger): void {
    app.use(
      (error: Error, _req: Request, _res: Response, _next: NextFunction) =>
        logger.error(error)
    );
  }

  /**
   * Setup the application controllers
   *
   * @param {Application} app
   * @param {Server} server
   * @return {void}
   */
  private setupControllers(
    app: Application,
    server: Server,
    logger: Logger
  ): void {
    const service = new SocketService(server, logger);

    const index = new IndexController();
    index.setup(app, service);

    const random = new RandomController();
    random.setup(app, service);
  }

  private setupLogger(app: Application): Logger {
    const winstonInstance = createLogger({
      format: format.combine(format.colorize(), format.json()),
      transports: [new transports.Console()],
    });

    app.use(expressWinston.logger({ winstonInstance }));

    return winstonInstance;
  }
}

export default ExpressBootstrap;

export { ExpressBootstrap };

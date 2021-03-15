import { Application, Request, Response, NextFunction } from "express";
import * as hbs from "express-handlebars";
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
    this.setupEngine(app);
    this.setupErrorHandler(app);
    this.setupControllers(app, server);
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
   * @return {void}
   */
  private setupErrorHandler(app: Application): void {
    app.use(
      (error: Error, _req: Request, _res: Response, _next: NextFunction) =>
        console.error(error)
    );
  }

  /**
   * Setup the application controllers
   *
   * @param {Application} app
   * @param {Server} server
   * @return {void}
   */
  private setupControllers(app: Application, server: Server): void {
    const service = new SocketService(server);

    const index = new IndexController();
    index.setup(app, service);

    const random = new RandomController();
    random.setup(app, service);
  }
}

export default ExpressBootstrap;

export { ExpressBootstrap };

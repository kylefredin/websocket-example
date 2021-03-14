import { Application, Request, Response, NextFunction } from "express";
import * as hbs from "express-handlebars";
import { Server } from "ws";
import { IndexController } from "./index/IndexController";
import { RandomController } from "./random/RandomController";
import { SocketService } from "./socket/SocketService";

class Bootstrap {
  public setup(app: Application, server: Server) {
    this.setupEngine(app);
    this.setupErrorHandler(app);
    this.setupControllers(app, server);
  }

  private setupEngine(app: Application): void {
    app.engine("handlebars", hbs());

    app.set("view engine", "handlebars");
  }

  private setupErrorHandler(app: Application): void {
    app.use(
      (error: Error, _req: Request, _res: Response, _next: NextFunction) =>
        console.error(error)
    );
  }

  private setupControllers(app: Application, server: Server): void {
    const service = new SocketService(server);

    const index = new IndexController();
    index.setup(app, service);

    const random = new RandomController();
    random.setup(app, service);
  }
}

export default Bootstrap;

export { Bootstrap };

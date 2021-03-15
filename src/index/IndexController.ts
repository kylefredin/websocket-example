import { Application, Request, Response, NextFunction } from "express";
import { SocketService } from "../socket/SocketService";

class IndexController {
  /**
   * Setup the index controller
   *
   * @param {Application} app
   * @param {SocketService} _service
   */
  public setup(app: Application, _service: SocketService) {
    app.get("/", this.getIndexRoute);
  }

  /**
   * Index route handler
   *
   * @param {Request} _req
   * @param {Response} res
   * @param {NextFunction} _next
   */
  public getIndexRoute(_req: Request, res: Response, _next: NextFunction) {
    res.render("index");
  }
}

export default IndexController;

export { IndexController };

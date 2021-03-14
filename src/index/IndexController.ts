import { Application, Request, Response, NextFunction } from "express";
import { SocketService } from "../socket/SocketService";

class IndexController {
  public setup(app: Application, _service: SocketService) {
    app.get("/", this.getIndexRoute);
  }

  public getIndexRoute(_req: Request, res: Response, _next: NextFunction) {
    res.render("index");
  }
}

export default IndexController;

export { IndexController };

import { Application, Request, Response, NextFunction } from "express";
import { SocketMessage } from "../socket/SocketMessage";
import { RandomService } from "./RandomService";
import { SocketService } from "../socket/SocketService";

class RandomController {
  public service: RandomService = new RandomService();

  public setup(app: Application, service: SocketService) {
    app.get("/api/random-number", this.getRandomNumberRoute);

    app.get("/api/random-string", this.getRandomStringRoute);

    service.onMessage((message: SocketMessage) =>
      this.getMessageResponse(message)
    );
  }

  public getRandomNumberRoute(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    res.status(200).json({ value: this.service.getRandomNumber() });
  }

  public async getRandomStringRoute(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    res.status(200).json({ value: await this.service.getRandomString() });
  }

  public async getMessageResponse(message: SocketMessage): Promise<string> {
    if (message.event === "random-number") {
      message.value = this.service.getRandomNumber();
    } else if (message.event === "random-string") {
      message.value = await this.service.getRandomString();
    }

    return message.toString();
  }
}

export default RandomController;

export { RandomController };

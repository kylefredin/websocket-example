import { Application, Request, Response, NextFunction } from "express";
import { RandomService } from "./RandomService";
import { SocketMessage } from "../socket/SocketMessage";
import { SocketService } from "../socket/SocketService";

class RandomController {
  /**
   * @type {RandomService}
   */
  public service: RandomService = new RandomService();

  /**
   * Setup the random controller
   *
   * @param {Application} app
   * @param {SocketService} service
   * @return {void}
   */
  public setup(app: Application, service: SocketService): void {
    app.get("/api/random-number", this.getRandomNumberRoute);

    app.get("/api/random-string", this.getRandomStringRoute);

    service.registerMessageHandler(this.getMessageResponse.bind(this));
  }

  /**
   * Get random number route handler
   *
   * @param {Request} _req
   * @param {Response} res
   * @param {NextFunction} _next
   * @return {void}
   */
  public getRandomNumberRoute(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void {
    res.status(200).json({ value: this.service.getRandomNumber() });
  }

  /**
   * Get random string route handler
   *
   * @param {Request} _req
   * @param {Response} res
   * @param {NextFunction} _next
   * @return {void}
   */
  public async getRandomStringRoute(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    res.status(200).json({ value: await this.service.getRandomString() });
  }

  /**
   * Socket message handler for the random controller
   *
   * @param {SocketMessage} message
   * @return {Promise<string>}
   */
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

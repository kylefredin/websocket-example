import * as crypto from "crypto";

class RandomService {
  public getRandomNumber({ min = 0, max = 100 } = {}): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public async getRandomString({ size = 24 } = {}): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(size, (err: Error | null, buf: Buffer): void => {
        if (err) {
          reject(err);

          return;
        }

        resolve(buf.toString("base64").replace(/=\\\/+/, ""));
      });
    });
  }
}

export default RandomService;

export { RandomService };

import * as crypto from "crypto";

class RandomService {
  /**
   * Generates a random number between min and max
   *
   * @param {object} param
   * @param {number} param.min
   * @param {number} param.max
   * @return {number}
   */
  public getRandomNumber({ min = 0, max = 100 } = {}): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Generates a random string of given size length
   *
   * @param {object} param
   * @param {number} params.size
   * @return {Promise<string>}
   */
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

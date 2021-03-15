class Configuration {
  /**
   * @type {string}
   */
  public serverHost: string = "";

  /**
   * @type {number}
   */
  public serverPort: number;

  /**
   * @type {string}
   */
  public websocketHost: string = "";

  /**
   * @type {number}
   */
  public websocketPort: number;

  /**
   * Configuration for the application
   *
   * @param {*} environment
   */
  public constructor(environment: any) {
    this.serverHost = environment.SERVER_HOST;
    this.serverPort = Number(environment.SERVER_PORT);

    this.websocketHost = environment.WEBSOCKET_HOST;
    this.websocketPort = Number(environment.WEBSOCKET_PORT);
  }

  get baseUrl(): string {
    return `http://${this.serverHost}:${this.serverPort}`;
  }
}

export default Configuration;

export { Configuration };

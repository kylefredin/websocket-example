class Configuration {
  public serverHost: string = "";

  public serverPort: number;

  public websocketHost: string = "";

  public websocketPort: number;

  public constructor(environment: any) {
    this.serverHost = environment.SERVER_HOST;
    this.serverPort = Number(environment.SERVER_PORT);

    this.websocketHost = environment.WEBSOCKET_HOST;
    this.websocketPort = Number(environment.WEBSOCKET_PORT);
  }
}

export default Configuration;

export { Configuration };

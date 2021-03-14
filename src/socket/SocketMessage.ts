class SocketMessage {
  public event: string = "";

  public value: string | number | null = null;

  public constructor(event: string) {
    this.event = event;
  }

  public toString() {
    return JSON.stringify({ event: this.event, value: this.value });
  }
}

export default SocketMessage;

export { SocketMessage };

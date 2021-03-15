class SocketMessage {
  /**
   * @type {string}
   */
  public event: string = "";

  /**
   * @type {string|number|null}
   */
  public value: string | number | null = null;

  /**
   * @param {string} event
   */
  public constructor(event: string) {
    this.event = event;
  }

  /**
   * Returns a string representation of the socket message
   *
   * @return {string}
   */
  public toString() {
    return JSON.stringify({ event: this.event, value: this.value });
  }
}

export default SocketMessage;

export { SocketMessage };

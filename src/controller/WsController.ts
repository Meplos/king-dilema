import { emitter } from "../plugins/emitter";

export default class WsController {
  constructor() {
    // TODO: Init websocket connection
  }

  public async sendMessage(room: string, text: string) {
    console.debug(`WsController: sendMessage: room=${room}, text=${text}`);
  }

  private receiveMessage(message: string) {
    console.debug(`WsController: receiveMessage:  message=${message}`);

    emitter.emit("receive", JSON.parse(message));
  }
}

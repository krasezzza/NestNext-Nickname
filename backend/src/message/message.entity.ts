import { MessageType, MessageInterface } from './message.interface';

export class Message implements MessageInterface {
  public type: MessageType;
  public text: string;

  constructor(msgType: MessageType, msgText: string) {
    this.type = msgType;
    this.text = msgText;
  }
}

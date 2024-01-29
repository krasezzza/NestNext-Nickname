export enum MessageType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface MessageInterface {
  type: MessageType;
  text: string;
}

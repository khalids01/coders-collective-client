export interface TypingMessage{
  sender: {
    id: Schema.Types.ObjectId;
    avatar?: string;
    username: string;
  };
  receiver: {
    id: Schema.Types.ObjectId;
    avatar?: string;
    username: string;
  };
  edited?: {
    hasBeenEdited: boolean;
    date?: string;
  };
  message: {
    text: string;
  };
}

export default interface Message {
    _id: string;
    sender: {
        id: Schema.Types.ObjectId;
        avatar?: string;
        username: string;
      };
      receiver: {
        id: Schema.Types.ObjectId;
        avatar?: string;
        username: string;
      };
      edited?: {
        hasBeenEdited: boolean;
        date?: string;
      };
    updatedAt: string | Date;
    createdAt: string | Date;
    message: {
        text: string,
        images: ImageData [];
    }
}
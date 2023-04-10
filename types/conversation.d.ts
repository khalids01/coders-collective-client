export interface SendMessageData {
  receiver: string | null;
  sender: string | null;
  message: {
    text: string | null;
    images: ImageData[] | [];
  };
}

export default interface conversationData {
  messages: {
    type: "user" | "group";
    data: Message[];
  };

  sendMessageData: SendMessageData;
  conversationId: string | null;
}

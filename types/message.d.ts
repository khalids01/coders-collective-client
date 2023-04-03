export default interface Message {
    _id: string;
    receiverId: string;
    senderId: string;
    senderName: string;
    updatedAt: string | Date;
    createdAt: string | Date;
    message: {
        text: string,
        images: string [];
    }
}
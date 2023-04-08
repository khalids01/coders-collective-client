export default interface Message {
    _id: string;
    receiver: string;
    sender: string;
    updatedAt: string | Date;
    createdAt: string | Date;
    message: {
        text: string,
        images: ImageData [];
    }
}
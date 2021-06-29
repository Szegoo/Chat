import axios from "axios";
import "regenerator-runtime/runtime";

export const getChats = async () => {
    const { data } = await axios.get("/api/get-chats");
    return data.chats;
}
export const addChat = async (chat) => {
    const { data } = await axios.post('/api/create-chat', chat);
    return data;
}
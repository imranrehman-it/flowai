import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    const updateChat = (chat) => {
        setChats((prevChats) => {
            const chatIndex = prevChats.findIndex((c) => c.id === chat.id);
            if (chatIndex === -1) {
                return prevChats;
            }
            return [
                ...prevChats.slice(0, chatIndex),
                chat,
                ...prevChats.slice(chatIndex + 1),
            ];
        }); 

        if (currentChat && currentChat.id === chat.id) {
            setCurrentChat(chat);
        }

    };

    const addChat = (chat) => {
        setChats((prevChats) => [...prevChats, chat]);
    }


    return (
        <ChatContext.Provider value={{ chats, setChats, currentChat, setCurrentChat, updateChat, addChat }}>
            {children}
        </ChatContext.Provider>
    )

}

export const useChat = () => {
    return useContext(ChatContext);
};




    

    
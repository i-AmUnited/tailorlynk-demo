// Import React
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Initialize WebSocket
const socket = io("http://localhost:3001");

// Message Center Component
const MessageCenter = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");

  const chats = [
    { name: "Agbada specialist", status: "Online" },
    { name: "The native plug", status: "Last seen 4hrs ago" },
    { name: "Stitches", status: "Last seen 15hrs ago" },
    { name: "Styles by needle and thread", status: "Last seen 14 Feb 1960" },
    { name: "Fila", status: "Last seen 32 Jan 1419" },
  ];

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => ({
        ...prev,
        [message.chatName]: [...(prev[message.chatName] || []), message],
      }));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const openChatPage = (chatName) => {
    setActiveChat(chatName);
    if (!messages[chatName]) {
      setMessages((prev) => ({ ...prev, [chatName]: [] }));
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        chatName: activeChat,
        sender: "user",
        text: newMessage,
      };

      socket.emit("sendMessage", message);

      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), message],
      }));

      setNewMessage("");
    }
  };

  if (activeChat) {
    return (
      <div className="flex flex-col h-[50vh] bg-gray-100">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b flex items-center justify-between">
          <h2 className="text-lg font-medium ml-4 inline-block">
            {activeChat}
          </h2>
          <button
            onClick={() => setActiveChat(null)}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Back
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages[activeChat]?.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-4 rounded-lg max-w-md ${
                    message.sender === "user" ? "bg-gray-200" : "bg-orange-100"
                  }`}
                >
                  <p className="text-gray-700">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Start typing message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-fit bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search chat..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>
        <ul>
          {chats.map((chat, index) => (
            <li
              key={index}
              className="flex items-center justify-between px-4 py-3 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => openChatPage(chat.name)}
            >
              <div>
                <p className="font-medium text-gray-800">{chat.name}</p>
                <p className="text-sm text-gray-500">{chat.status}</p>
              </div>
              {chat.status === "Online" && (
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Placeholder */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        <img
          src="https://www.abm.me.uk/wp-content/uploads/start-chat.png"
          alt="Start Conversation"
          className="w-48 h-48 mb-4"
        />
        <p className="text-gray-500">Select a chat to view conversation</p>
      </div>
    </div>
  );
};

export default MessageCenter;

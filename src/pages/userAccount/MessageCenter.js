import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axiosInstance from "../../api/axiosInstance";
import { retrieveFromLocalStorage } from "../../hooks/constants";
import { FaPaperPlane } from "react-icons/fa";

const MessageCenter = () => {
  const [userSession, setUserSession] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const sessionData = retrieveFromLocalStorage(["userSession"]);
    if (sessionData && sessionData.userSession) {
      setUserSession(sessionData.userSession);
    }
  }, []);

  useEffect(() => {
    // if (!userSession?.accessToken) return;

    if (!userSession?.accessToken) {
      console.log("No access token found!"); // ✅ Check if user is authenticated
      return;
    }

    const token = userSession.accessToken;
    console.log("Access Token:", token); // ✅ Check if token is correct

    // axiosInstance
    //   .get("list-vendors-chat", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then(({ data }) => {
    //     setChats(
    //       data.data.map((chat) => ({
    //         name: chat.businessName,
    //         id: chat.vendorId,
    //         lastSeen: chat.lastSeen,
    //       }))
    //     );
    //   });

    axiosInstance
      .get("list-vendors-chat", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        console.log("API Response:", data); // ✅ Check what API returns

        setChats(
          data.data.map((chat) => ({
            name: chat.businessName,
            id: chat.vendorId,
            lastSeen: chat.lastSeen,
          }))
        );
      });

    const pusher = new Pusher("3d02be95059633abaaa3", { cluster: "us3" });
    const channel = pusher.subscribe("chat-channel");
    channel.bind("message-received", (message) => {
      setMessages((prev) => ({
        ...prev,
        [message.vendorId]: [...(prev[message.vendorId] || []), message],
      }));
    });

    return () => {
      channel.unbind("message-received");
      pusher.unsubscribe("chat-channel");
      pusher.disconnect();
    };
  }, [userSession]);

  const openChatPage = (vendorId) => {
    setActiveChat(vendorId);
    axiosInstance
      .get(`get-vendor-chat/${vendorId}`, {
        headers: { Authorization: `Bearer ${userSession.accessToken}` },
      })
      .then(({ data }) => {
        setMessages((prev) => ({ ...prev, [vendorId]: data.data }));
      });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const messageData = {
      vendor_id: activeChat,
      customer_id: userSession.userId,
      message: newMessage,
      sender_type: "customer",
    };

    axiosInstance
      .post("send-message", messageData, {
        headers: { Authorization: `Bearer ${userSession.accessToken}` },
      })
      .then(() => {
        setMessages((prev) => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), messageData],
        }));
      });

    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Message Center</h2>
        <input
          type="text"
          placeholder="Search chat..."
          className="w-full p-2 border rounded-md mb-4"
        />
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="flex items-center space-x-3 p-3 border-b cursor-pointer hover:bg-gray-200"
              onClick={() => openChatPage(chat.id)}
            >
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div>
                <p className="font-medium">{chat.name}</p>
                <p className="text-xs text-gray-500">
                  Last seen {chat.lastSeen}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className="p-4 bg-white border-b flex items-center justify-between">
              <h2 className="text-lg font-medium">
                {chats.find((c) => c.id === activeChat)?.name}
              </h2>
              <button
                onClick={() => setActiveChat(null)}
                className="text-red-500"
              >
                Back
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages[activeChat]?.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender_type === "customer"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-md ${
                      message.sender_type === "customer"
                        ? "bg-gray-200"
                        : "bg-orange-100"
                    }`}
                  >
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white border-t flex items-center space-x-2">
              <input
                type="text"
                placeholder="Start typing message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-orange-500 text-white rounded-md"
              >
                <FaPaperPlane />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to view conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;

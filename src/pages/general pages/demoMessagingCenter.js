
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import Spinner from "../../components/Spinners/pageLoadingSpinner";
import Input from "../../components/input";
import { useChatMessages, useListChat } from "../reuseableEffects";
import { useFormik } from "formik";
import { sendChat } from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";
import sendIcon from "../../assets/icons/send.svg";

const MessageCenter = () => {
  const chats = useListChat();
  const initialMessages = useChatMessages("RS0UWmpIJLltD");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const pusherRef = useRef(null);
  const channelRef = useRef(null);
  const messagesEndRef = useRef(null);

  console.log(chats, messages);

  // Update local messages when initial messages change
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Pusher
  useEffect(() => {
    // Initialize Pusher client with backend configuration (for PUBLIC channels)
    pusherRef.current = new Pusher("22bcae7f02729d546285", {
      cluster: "mt1",
      wsHost: window.location.hostname,
      wsPort: 6001,
      wssPort: 6001,
      forceTLS: false,
      encrypted: false,
      disableStats: true,
      enabledTransports: ['ws', 'wss'],
      // Remove auth config for public channels - uncomment below for private channels
      // authEndpoint: "/api/pusher/auth", // This should be your Laravel/backend auth endpoint
      // auth: {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`, // Your JWT/auth token
      //   },
      // },
    });

    // Subscribe to the chat channel - try public channel first
    const channelName = `chat-di52xEJHTFuQV-TO58749`; // Public channel (no "private-" prefix)
    console.log("Subscribing to channel:", channelName);
    channelRef.current = pusherRef.current.subscribe(channelName);
    
    // Also try common channel naming patterns (both public and private)
    const alternativeChannels = [
      `private-chat-di52xEJHTFuQV-TO58749`, // Private channel - needs auth
      `chat.di52xEJHTFuQV.TO58749`,
      `private-chat.di52xEJHTFuQV.TO58749`,
      `user-chat-di52xEJHTFuQV-TO58749`,
      `messages-di52xEJHTFuQV-TO58749`,
    ];
    
    alternativeChannels.forEach(altChannelName => {
      const altChannel = pusherRef.current.subscribe(altChannelName);
      console.log("Also subscribing to alternative channel:", altChannelName);
      
      altChannel.bind_global((eventName, data) => {
        console.log(`Event from ${altChannelName}: ${eventName}`, data);
      });
    });

    // Listen for multiple possible event names for new messages
    const messageEvents = ["new-message", "message-sent", "NewMessage", "MessageSent", "chat-message"];
    
    messageEvents.forEach(eventName => {
      channelRef.current.bind(eventName, (data) => {
        console.log(`Message received via ${eventName}:`, data);
        
        // Add the new message to local state
        setMessages(prevMessages => {
          // Check if message already exists to prevent duplicates
          const messageExists = prevMessages.some(msg => 
            msg.id === data.id || 
            (msg.message === data.message && msg.createdAt === data.createdAt)
          );
          
          if (messageExists) {
            console.log("Duplicate message detected, skipping...");
            return prevMessages;
          }
          
          return [...prevMessages, {
            message: data.message,
            sender: data.sender_type || data.sender,
            createdAt: data.timestamp || data.createdAt || new Date().toISOString(),
            id: data.id,
            ...data
          }];
        });
      });
    });

    // Listen for all events to debug
    channelRef.current.bind_global((eventName, data) => {
      console.log(`Pusher event received: ${eventName}`, data);
    });

    // Listen for typing indicators
    channelRef.current.bind("user-typing", (data) => {
      console.log("User typing:", data);
      // Handle typing indicator
    });

    // Listen for message status updates (delivered, read, etc.)
    channelRef.current.bind("message-status", (data) => {
      console.log("Message status update:", data);
      // Handle message status updates
    });

    // Connection state logging
    pusherRef.current.connection.bind("state_change", (states) => {
      console.log("Pusher connection state changed:", states.current);
    });

    // Error handling
    pusherRef.current.connection.bind("error", (err) => {
      console.error("Pusher connection error:", err);
    });

    // Cleanup on unmount
    return () => {
      if (channelRef.current) {
        channelRef.current.unbind_all();
        pusherRef.current.unsubscribe(`private-chat-di52xEJHTFuQV-TO58749`);
      }
      if (pusherRef.current) {
        pusherRef.current.disconnect();
      }
    };
  }, []);

  // Trigger typing indicator
  const handleTyping = () => {
    if (channelRef.current) {
      channelRef.current.trigger("client-typing", {
        user: "TO58749",
        typing: true,
      });
    }
  };

  // Stop typing indicator
  const handleStopTyping = () => {
    if (channelRef.current) {
      channelRef.current.trigger("client-typing", {
        user: "TO58749",
        typing: false,
      });
    }
  };

  const sendMessageForm = useFormik({
    initialValues: {
      vendor_id: "di52xEJHTFuQV",
      customer_id: "TO58749",
      message: "",
      sender_type: "customer",
    },

    onSubmit: async (values, { resetForm }) => {
      const { vendor_id, customer_id, message, sender_type } = values;
      let sendMessageData = { vendor_id, customer_id, message, sender_type };
      
      // Optimistically add the message to local state immediately
      const optimisticMessage = {
        message: message,
        sender: sender_type,
        createdAt: new Date().toISOString(),
        vendor_id,
        customer_id,
        sending: true // Flag to show sending state
      };
      
      setMessages(prevMessages => [...prevMessages, optimisticMessage]);
      resetForm();
      
      const { payload } = await dispatch(sendChat(sendMessageData));
      
      if (payload.statusCode === 200) {
        // Update the optimistic message to remove sending flag
        setMessages(prevMessages => 
          prevMessages.map((msg, index) => 
            index === prevMessages.length - 1 && msg.sending
              ? { ...msg, sending: false, id: payload.data?.id }
              : msg
          )
        );
        
        // Send real-time notification via Pusher (optional, if backend doesn't auto-broadcast)
        if (channelRef.current) {
          channelRef.current.trigger("client-message-sent", {
            vendor_id,
            customer_id,
            message,
            sender_type,
            timestamp: new Date().toISOString(),
          });
        }
        
        showSuccessMessage("Message sent!");
        handleStopTyping(); // Stop typing indicator
      } else {
        // Remove the optimistic message on failure
        setMessages(prevMessages => 
          prevMessages.filter((msg, index) => 
            !(index === prevMessages.length - 1 && msg.sending)
          )
        );
      }
    },
  });

  return (
    <div>
      <Spinner loading={useSelector((state) => state.user).loading} />
      <div className="px-4 py-6 border-b text-md font-bold">Message center</div>
      <div className="grid grid-cols-1 md:grid-cols-6 h-full">
        <div className="col-span-1 md:col-span-2 border p-3">
          <Input placeholder={"Search chat..."} />
          <div className="mt-4">
            <div className="flex items-center gap-2 border-b last:border-b-0 border-[#c4c4c430] py-2">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-bold text-primary">A</span>
              </div>
              <div className="text-xs">Agbada Specialist</div>
            </div>
            <div className="flex items-center gap-2 border-b last:border-b-0 border-[#c4c4c430] py-2">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-bold text-primary">A</span>
              </div>
              <div className="text-xs">Agbada Specialist</div>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-4 border h-full flex flex-col">
          <div className="px-4 py-6 border-b text-md font-bold">
            Agbada specialist
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.sender === "customer" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex flex-col max-w-[60%] ${
                      chat.sender === "customer" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-md w-fit text-xs relative ${
                        chat.sender === "customer"
                          ? "bg-primary/10 text-primary"
                          : "bg-brandGreen/10 text-brandGreen"
                      }`}
                    >
                      {chat.message}
                      {chat.sending && (
                        <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" 
                             title="Sending..."></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Message input form */}
          <div className="p-4 border-t">
            <form
              onSubmit={sendMessageForm.handleSubmit}
              className="w-full relative"
            >
              <Input
                placeholder="Start typing ..."
                customStyles="w-full pr-12"
                name={"message"}
                value={sendMessageForm.values.message}
                onChange={(e) => {
                  sendMessageForm.handleChange(e);
                  handleTyping(); // Trigger typing indicator
                }}
                onBlur={(e) => {
                  sendMessageForm.handleBlur(e);
                  handleStopTyping(); // Stop typing indicator
                }}
                onError={
                  sendMessageForm.touched.message && sendMessageForm.errors.message
                    ? sendMessageForm.errors.message
                    : null
                }
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
              >
                <img alt="send" src={sendIcon} className="size-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
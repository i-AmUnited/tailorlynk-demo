import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import Pusher from 'pusher-js';
import Spinner from "../../components/Spinners/pageLoadingSpinner";
import Input from "../../components/input";
import { useChatMessages, useListChat } from "../reuseableEffects";
import { useFormik } from "formik";
import { sendChat } from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";
import sendIcon from "../../assets/icons/send.svg";

const MessageCenter = () => {
  const [selectedVendorID, setSelectedVendorID] = useState("RS0UWmpIJLltD");
  const [selectedVendorName, setSelectedVendorName] = useState("Dez Stylez");
  const [showMessages, setShowMessages] = useState(false);
  const [realtimeMessages, setRealtimeMessages] = useState([]);
  
  const messages = useChatMessages(selectedVendorID);
  const chats = useListChat()
  
  const dispatch = useDispatch();
  const pusherRef = useRef(null);
  const channelRef = useRef(null);

  const userSessionData = useSelector((state) => state.user.userSession);
// console.log(userSessionData)

  // Initialize Pusher
  useEffect(() => {
    // Initialize Pusher with your credentials
    pusherRef.current = new Pusher('22bcae7f02729d546285', {
      cluster: 'mt1',
      encrypted: true,
      // For custom host configuration (if needed)
      // wsHost: 'your-custom-host',
      // wsPort: 6001,
      // wssPort: 6001,
      // forceTLS: false,
    });

    // Cleanup on unmount
    return () => {
      if (pusherRef.current) {
        pusherRef.current.disconnect();
      }
    };
  }, []);

  // Subscribe to chat channel when vendor changes
  useEffect(() => {
    if (!pusherRef.current || !selectedVendorID) return;

    // Unsubscribe from previous channel
    if (channelRef.current) {
      channelRef.current.unbind_all();
      pusherRef.current.unsubscribe(channelRef.current.name);
    }

    // Subscribe to new channel for selected vendor
    const channelName = `chat-${selectedVendorID}`;
    channelRef.current = pusherRef.current.subscribe(channelName);

    // Listen for new messages
    channelRef.current.bind('new-message', (data) => {
      console.log('New message received:', data);
      
      // Add the new message to realtime messages
      setRealtimeMessages(prev => [...prev, {
        id: data.id || Date.now(),
        message: data.message,
        sender: data.sender_type,
        vendor_id: data.vendor_id,
        customer_id: data.customer_id,
        timestamp: data.timestamp || new Date().toISOString()
      }]);
    });

    // Reset realtime messages when switching vendors
    setRealtimeMessages([]);

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind_all();
        pusherRef.current.unsubscribe(channelName);
      }
    };
  }, [selectedVendorID]);

  // Combine initial messages with realtime messages
  const allMessages = [...messages, ...realtimeMessages];

  const sendMessageForm = useFormik({
    initialValues: {
      vendor_id: selectedVendorID,
      customer_id: userSessionData.customerId,
      message: "",
      sender_type: "customer",
    },
    
    onSubmit: async (values, { resetForm }) => {
      const { vendor_id, customer_id, message, sender_type } = values;
      let sendMessageData = { vendor_id, customer_id, message, sender_type };
      const { payload } = await dispatch(sendChat(sendMessageData));
      if (payload.statusCode === 200) {
        showSuccessMessage("message sent!");
        resetForm();
        
        // Optionally add the sent message immediately to UI for better UX
        // (if your backend doesn't immediately broadcast it back)
        // setRealtimeMessages(prev => [...prev, {
        //   id: Date.now(),
        //   message: message,
        //   sender: sender_type,
        //   vendor_id: vendor_id,
        //   customer_id: customer_id,
        //   timestamp: new Date().toISOString()
        // }]);
      }
    },
  });

  // Update form when selected vendor changes
  React.useEffect(() => {
    sendMessageForm.setFieldValue('vendor_id', selectedVendorID);
  }, [selectedVendorID]);

  const handleChatClick = (vendorId, businessName) => {
    setSelectedVendorID(vendorId);
    setSelectedVendorName(businessName);
    setShowMessages(true); // Show messages on mobile
  };

  const handleBackToList = () => {
    setShowMessages(false);
  };

  return (
    <div>
      <Spinner loading={useSelector((state) => state.user).loading} />
      <div className="px-4 py-6 border-b text-md font-bold">Message center</div>
      
      {/* Mobile: Show either chat list OR messages */}
      <div className="md:hidden">
        {!showMessages ? (
          // Chat List View (Mobile)
          <div className="p-3">
            <Input placeholder={"Search chat..."} />
            <div className="mt-4">
              {chats.map((chat, index) => (
                <div 
                  key={index}
                  onClick={() => handleChatClick(chat.vendorId, chat.businessName)}
                  className={`flex items-center gap-2 border-b last:border-b-0 border-[#c4c4c430] py-2 cursor-pointer hover:bg-gray-50 ${
                    selectedVendorID === chat.vendorId ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">{chat.businessName.charAt(0).toUpperCase()}</span>
                    {/* <img src={profile_image} alt=""/> */}
                  </div>
                  <div className="text-xs">{chat.businessName}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Messages View (Mobile)
          <div className="h-full">
            <div className="px-4 py-6 border-b text-md font-bold flex items-center gap-3">
              <button 
                onClick={handleBackToList}
                className="flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {selectedVendorName}
            </div>
            <div className="flex-1 p-4 overflow-y-auto max-h-[450px]">
              <div className="p-4 grid gap-1">
                {allMessages.map((chat, index) => (
                  <div key={index} className={`flex ${chat.sender === "customer" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex flex-col max-w-[60%] ${ chat.sender === "customer" ? "items-end" : "items-start"}`}>
                      <div className={`p-2 rounded-md w-fit text-xs ${ chat.sender === "customer" ? "bg-primary/10 text-primary" : "bg-brandGreen/10 text-brandGreen" }`}>{chat.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed Input at Bottom */}
          <div className="p-4 border-t bg-white">
            <form
                  onSubmit={sendMessageForm.handleSubmit}
                  className="w-full relative"
                >
                  <Input
                    placeholder="Start typing ..."
                    customStyles="w-full pr-12"
                    name={"message"}
                    value={sendMessageForm.values.message}
                    onChange={sendMessageForm.handleChange}
                    onBlur={sendMessageForm.handleBlur}
                    onError={
                      sendMessageForm.touched.message && sendMessageForm.errors.message
                        ? sendMessageForm.errors.message
                        : null
                    }
                  />
                  <button
                    type="button"
                    onClick={sendMessageForm.handleSubmit}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
                  >
                    <img alt="send" src={sendIcon} className="size-5" />
                  </button>
                </form>
          </div>
          </div>
        )}
      </div>

      {/* Desktop: Show both chat list AND messages side by side */}
      <div className="hidden md:grid md:grid-cols-6 divide-x h-full">
        <div className="col-span-2 p-3">
          <Input placeholder={"Search chat..."} />
          <div className="mt-4 divide-y">
            {chats.map((chat, index) => (
              <div 
                key={index}
                onClick={() => handleChatClick(chat.vendorId, chat.businessName)}
                className={`flex items-center gap-2 border-[#c4c4c430] px-2 py-3 rounded-md cursor-pointer hover:bg-gray-50 ${
                  selectedVendorID === chat.vendorId ? 'bg-primary/5' : ''
                }`}
              >
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-bold text-primary">{chat.businessName.charAt(0).toUpperCase()}</span>
                </div>
                <div className={`text-xs font-medium ${
                  selectedVendorID === chat.vendorId ? 'font-semibold text-pretty text-primary' : ''
                }`}>{chat.businessName}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 flex flex-col h-full">
          <div className="px-4 py-6 border-b text-md font-bold">
            {selectedVendorName}
          </div>
          
          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[350px]">
            <div className="grid gap-1">
              {allMessages.map((chat, index) => (
                <div key={index} className={`flex ${chat.sender === "customer" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex flex-col max-w-[70%] ${ chat.sender === "customer" ? "items-end" : "items-start"}`}>
                    <div className={`p-2 rounded-md w-fit text-xs ${ chat.sender === "customer" ? "bg-primary/10 text-primary" : "bg-brandGreen/10 text-brandGreen" }`}>{chat.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Fixed Input at Bottom */}
          <div className="p-4 border-t bg-white">
            <form
              onSubmit={sendMessageForm.handleSubmit}
              className="w-full relative"
            >
              <Input
                placeholder="Start typing ..."
                customStyles="w-full pr-12"
                name={"message"}
                value={sendMessageForm.values.message}
                onChange={sendMessageForm.handleChange}
                onBlur={sendMessageForm.handleBlur}
                onError={
                  sendMessageForm.touched.message && sendMessageForm.errors.message
                    ? sendMessageForm.errors.message
                    : null
                }
              />
              <button
                type="button"
                onClick={sendMessageForm.handleSubmit}
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
}

export default MessageCenter;
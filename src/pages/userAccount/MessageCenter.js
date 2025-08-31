import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import Spinner from "../../components/Spinners/pageLoadingSpinner";
import Input from "../../components/input";
import { useChatMessages, useListChat } from "../reuseableEffects";
import { useFormik } from "formik";
import { sendChat } from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";
import sendIcon from "../../assets/icons/send.svg";

const chats = [
  {
    vendorName: "TechFlow Solutions",
    vendorID: "RS0UWmpIJLltD"
  },
  {
    vendorName: "Digital Nexus Corp",
    vendorID: "di52xEJHTFuQV"
  }
];

const MessageCenter = () => {
  const [selectedVendorID, setSelectedVendorID] = useState("RS0UWmpIJLltD");
  const [selectedVendorName, setSelectedVendorName] = useState("TechFlow Solutions");
  const [showMessages, setShowMessages] = useState(false);
  
  const messages = useChatMessages(selectedVendorID);
  const dispatch = useDispatch();

  const sendMessageForm = useFormik({
    initialValues: {
      vendor_id: selectedVendorID,
      customer_id: "TO58749",
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
      }
    },
  });

  // Update form when selected vendor changes
  React.useEffect(() => {
    sendMessageForm.setFieldValue('vendor_id', selectedVendorID);
  }, [selectedVendorID]);

  const handleChatClick = (vendorID, vendorName) => {
    setSelectedVendorID(vendorID);
    setSelectedVendorName(vendorName);
    setShowMessages(true); // Show messages on mobile
  };

  const handleBackToList = () => {
    setShowMessages(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
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
                  onClick={() => handleChatClick(chat.vendorID, chat.vendorName)}
                  className={`flex items-center gap-2 border-b last:border-b-0 border-[#c4c4c430] py-2 cursor-pointer hover:bg-gray-50 ${
                    selectedVendorID === chat.vendorID ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">{getInitials(chat.vendorName)}</span>
                  </div>
                  <div className="text-xs">{chat.vendorName}</div>
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
            <div className="p-4 grid gap-1">
              {messages.map((chat, index) => (
                <div key={index} className={`flex ${chat.sender === "customer" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex flex-col max-w-[60%] ${ chat.sender === "customer" ? "items-end" : "items-start"}`}>
                    <div className={`p-2 rounded-md w-fit text-xs ${ chat.sender === "customer" ? "bg-primary/10 text-primary" : "bg-brandGreen/10 text-brandGreen" }`}>{chat.message}</div>
                  </div>
                </div>
              ))}

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
          <div className="mt-4">
            {chats.map((chat, index) => (
              <div 
                key={index}
                onClick={() => handleChatClick(chat.vendorID, chat.vendorName)}
                className={`flex items-center gap-2 border-b last:border-b-0 border-[#c4c4c430] py-2 cursor-pointer hover:bg-gray-50 ${
                  selectedVendorID === chat.vendorID ? 'bg-primary/5' : ''
                }`}
              >
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-bold text-primary">{getInitials(chat.vendorName)}</span>
                </div>
                <div className="text-xs">{chat.vendorName}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 h-full">
          <div className="px-4 py-6 border-b text-md font-bold">
            {selectedVendorName}
          </div>
          <div className="p-4 grid gap-1">
            {messages.map((chat, index) => (
              <div key={index} className={`flex ${chat.sender === "customer" ? "justify-end" : "justify-start"}`}>
                <div className={`flex flex-col max-w-[60%] ${ chat.sender === "customer" ? "items-end" : "items-start"}`}>
                  <div className={`p-2 rounded-md w-fit text-xs ${ chat.sender === "customer" ? "bg-primary/10 text-primary" : "bg-brandGreen/10 text-brandGreen" }`}>{chat.message}</div>
                </div>
              </div>
            ))}

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
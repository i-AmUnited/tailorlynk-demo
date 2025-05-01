// import { useEffect, useState } from "react";
// import Pusher from "pusher-js";
// import { FaPaperPlane } from "react-icons/fa";
// import axiosInstance from "../../api/axiosInstance";
// import { retrieveFromLocalStorage } from "../../hooks/constants";

// export default function VendorChat() {
//   const [vendors, setVendors] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [selectedVendor, setSelectedVendor] = useState(null);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     const { userSession } = retrieveFromLocalStorage(["userSession"]);
//     const token = userSession?.data?.accessToken;

//     axiosInstance
//       .get("/list-vendors-chat", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => setVendors(response.data))
//       .catch((error) => console.error("Error fetching vendors:", error));
//   }, []);

//   useEffect(() => {
//     if (!selectedVendor) return;

//     const { userSession } = retrieveFromLocalStorage(["userSession"]);
//     const token = userSession?.data?.accessToken;

//     axiosInstance
//       .get(`/get-vendor-chat/${selectedVendor.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => setMessages(response.data))
//       .catch((error) => console.error("Error fetching messages:", error));
//   }, [selectedVendor]);

//   useEffect(() => {
//     const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
//       cluster: process.env.REACT_APP_PUSHER_CLUSTER,
//     });
//     const channel = pusher.subscribe("chat");

//     channel.bind("message-received", (data) => {
//       if (selectedVendor && data.vendorId === selectedVendor.id) {
//         setMessages((prev) => [...prev, data]);
//       }
//     });

//     return () => {
//       channel.unbind_all();
//       channel.unsubscribe();
//     };
//   }, [selectedVendor]);

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const { userSession } = retrieveFromLocalStorage(["userSession"]);
//     const token = userSession?.data?.accessToken;
//     const customerId = userSession?.data?.customerData?.customerId;

//     if (!customerId) {
//       console.error("Customer ID not found.");
//       return;
//     }

//     axiosInstance
//       .post(
//         "/send-message",
//         {
//           vendor_id: selectedVendor.id,
//           customer_id: customerId,
//           message: newMessage,
//           sender_type: "vendor",
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//       .then((response) => setMessages((prev) => [...prev, response.data]))
//       .catch((error) => console.error("Error sending message:", error));

//     setNewMessage("");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 p-4">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-white rounded-lg shadow-md p-4">
//         <h2 className="text-xl font-semibold mb-4">Message Center</h2>
//         <input
//           type="text"
//           placeholder="Search chat..."
//           className="w-full p-2 border rounded-md mb-4"
//         />
//         <ul>
//           {vendors.map((vendor) => (
//             <li
//               key={vendor.id}
//               className={`flex items-center space-x-3 p-3 border-b cursor-pointer hover:bg-gray-200 ${
//                 selectedVendor?.id === vendor.id ? "bg-gray-300" : ""
//               }`}
//               onClick={() => setSelectedVendor(vendor)}
//             >
//               <div className="w-3 h-3 bg-green-500 rounded-full" />
//               <div>
//                 <p className="font-medium">{vendor.name}</p>
//                 <p className="text-xs text-gray-500">
//                   Last seen {vendor.lastSeen}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Window */}
//       <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md p-4 ml-4">
//         {selectedVendor ? (
//           <>
//             <div className="p-4 bg-white border-b flex items-center justify-between">
//               <h2 className="text-lg font-medium">{selectedVendor.name}</h2>
//               <button
//                 onClick={() => setSelectedVendor(null)}
//                 className="text-red-500"
//               >
//                 Back
//               </button>
//             </div>
//             <div className="flex-1 p-4 overflow-y-auto space-y-4 h-96 border rounded-md">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${
//                     msg.sender_type === "customer"
//                       ? "justify-end"
//                       : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`p-3 rounded-lg max-w-md ${
//                       msg.sender_type === "customer"
//                         ? "bg-gray-200"
//                         : "bg-orange-100"
//                     }`}
//                   >
//                     <p>{msg.message}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="p-4 bg-white border-t flex items-center space-x-2">
//               <input
//                 type="text"
//                 placeholder="Start typing message"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="flex-1 p-2 border rounded-md"
//               />
//               <button
//                 onClick={sendMessage}
//                 className="p-2 bg-orange-500 text-white rounded-md"
//               >
//                 <FaPaperPlane />
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">
//             Select a chat to view conversation
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React from "react";

const MessageCenter = () => {
  return <div>MessageCenter</div>;
};

export default MessageCenter;

// import React, { useEffect, useRef, useState } from "react";
// import "../styles/adminSupport.css";

// import {
//   FiSend,
//   FiHeadphones,
//   FiUser,
//   FiMoreVertical, 
//   FiArrowLeft
// } from "react-icons/fi";

// import { RiVerifiedBadgeFill } from "react-icons/ri";

// const AdminSupport = () => {
//   const [messages, setMessages] = useState([
//     {
//       from: "user",
//       text: "Hello support, I need help with my withdrawal."
//     },
//     {
//       from: "admin",
//       text: "Hello 👋 Your withdrawal is currently being processed."
//     }
//   ]);

//   const [input, setInput] = useState("");

//   // MOBILE CHAT OPEN STATE
//   const [openChat, setOpenChat] = useState(false);

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth"
//     });
//   }, [messages]);

//   const sendReply = () => {
//     if (!input.trim()) return;

//     const newMessage = {
//       from: "admin",
//       text: input
//     };

//     setMessages((prev) => [...prev, newMessage]);

//     setInput("");
//   };

//   return (
//     <div className="admin-support-page">
//       <div className="admin-support-wrapper">

//         {/* SIDEBAR */}
//         <div
//           className={`admin-sidebar ${
//             openChat ? "hide-mobile" : ""
//           }`}
//         >
//           <div className="sidebar-top">
//             <h3>Chats</h3>
//           </div>

//           <div
//             className="chat-user active"
//             onClick={() => setOpenChat(true)}
//           >
//             <div className="chat-user-avatar">
//               <FiUser />
//             </div>

//             <div className="chat-user-details">
//               <h4>John Doe</h4>
//               <span>Need help with withdrawal</span>
//             </div>
//           </div>
//         </div>

//         {/* CHAT SECTION */}
//         <div
//           className={`admin-chat-section ${
//             openChat ? "show-mobile" : ""
//           }`}
//         >

//           {/* TOPBAR */}
//           <div className="admin-chat-top">

//             <div className="admin-chat-user">

//               {/* BACK BUTTON MOBILE */}
//               <button
//                 className="mobile-back-btn"
//                 onClick={() => setOpenChat(false)}
//               >
//                 <FiArrowLeft />
//               </button>

//               <div className="admin-avatar">
//                 <FiHeadphones />
//               </div>

//               <div className="admin-user-info">
//                 <div className="admin-name">
//                   <h4>Support Assistant</h4>
//                   <RiVerifiedBadgeFill className="verified-icon" />
//                 </div>

//                 <span>Online now</span>
//               </div>
//             </div>

//             <button className="top-action-btn">
//               <FiMoreVertical />
//             </button>
//           </div>

//           {/* MESSAGES */}
//           <div className="admin-chat-messages">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`admin-message ${
//                   msg.from === "admin"
//                     ? "admin-reply"
//                     : "user-message"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* INPUT */}
//           <div className="admin-input-box">
//             <input
//               type="text"
//               placeholder="Reply to user..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) =>
//                 e.key === "Enter" && sendReply()
//               }
//             />

//             <button onClick={sendReply}>
//               <FiSend />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSupport;

import React, {
  useEffect,
  useRef,
  useState
} from "react";

import axios from "axios";

import "../styles/adminSupport.css";

import {
  FiSend,
  FiHeadphones,
  FiUser,
  FiMoreVertical,
  FiArrowLeft
} from "react-icons/fi";

import { RiVerifiedBadgeFill } from "react-icons/ri";

const API_URL =
  process.env.REACT_APP_API_URL;

const AdminSupport = () => {

  // =========================
  // STATES
  // =========================

  const [chats, setChats] =
    useState([]);

  const [messages, setMessages] =
    useState([]);

  const [selectedUser,
    setSelectedUser] =
    useState(null);

  const [input, setInput] =
    useState("");

  const [openChat,
    setOpenChat] =
    useState(false);

  const messagesEndRef =
    useRef(null);

  // =========================
  // AUTO SCROLL
  // =========================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  // =========================
  // FETCH CHATS
  // =========================

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "adminToken"
          );

        const res =
          await axios.get(
            `${API_URL}/api/admin/support/chats`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setChats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  // =========================
  // FETCH SINGLE CHAT
  // =========================

  const fetchMessages =
    async (userId) => {
      try {
        const token =
          localStorage.getItem(
            "adminToken"
          );

        const res =
          await axios.get(
            `${API_URL}/api/admin/support/chat/${userId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setMessages(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  // =========================
  // OPEN CHAT
  // =========================

  const openUserChat =
    (chat) => {

      setSelectedUser(chat);

      fetchMessages(
        chat.userId
      );

      setOpenChat(true);
    };

  // =========================
  // SEND REPLY
  // =========================

  const sendReply =
    async () => {

      if (
        !input.trim() ||
        !selectedUser
      ) return;

      try {

        const token =
          localStorage.getItem(
            "adminToken"
          );

        const res =
          await axios.post(
            `${API_URL}/api/admin/support/reply/${selectedUser.userId}`,
            {
              message: input
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setMessages((prev) => [
          ...prev,
          res.data
        ]);

        setInput("");

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="admin-support-page">

      <div className="admin-support-wrapper">

        {/* SIDEBAR */}

        <div
          className={`admin-sidebar ${
            openChat
              ? "hide-mobile"
              : ""
          }`}
        >

          <div className="sidebar-top">
            <h3>Chats</h3>
          </div>

          {chats.map((chat) => (

            <div
              key={chat.userId}

              className={`chat-user ${
                selectedUser?.userId ===
                chat.userId
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                openUserChat(chat)
              }
            >

              <div className="chat-user-avatar">
                <FiUser />
              </div>

              <div className="chat-user-details">

                <h4>
                  {chat.name}
                </h4>

                <span>
                  {chat.lastMessage}
                </span>

              </div>

            </div>

          ))}

        </div>

        {/* CHAT SECTION */}

        <div
          className={`admin-chat-section ${
            openChat
              ? "show-mobile"
              : ""
          }`}
        >

          {/* TOPBAR */}

          <div className="admin-chat-top">

            <div className="admin-chat-user">

              <button
                className="mobile-back-btn"
                onClick={() =>
                  setOpenChat(false)
                }
              >
                <FiArrowLeft />
              </button>

              <div className="admin-avatar">
                <FiHeadphones />
              </div>

              <div className="admin-user-info">

                <div className="admin-name">

                  <h4>
                    {selectedUser?.name ||
                      "Support"}
                  </h4>

                  <RiVerifiedBadgeFill className="verified-icon" />

                </div>

                <span>
                  Online now
                </span>

              </div>

            </div>

            <button className="top-action-btn">
              <FiMoreVertical />
            </button>

          </div>

          {/* MESSAGES */}

          <div className="admin-chat-messages">

            {messages.map(
              (msg, index) => (

                <div
                  key={index}

                  className={`admin-message ${
                    msg.sender ===
                    "admin"
                      ? "admin-reply"
                      : "user-message"
                  }`}
                >
                  {msg.message}
                </div>

              )
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* INPUT */}

          <div className="admin-input-box">

            <input
              type="text"

              placeholder="Reply to user..."

              value={input}

              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }

              onKeyDown={(e) =>
                e.key === "Enter" &&
                sendReply()
              }
            />

            <button
              onClick={sendReply}
            >
              <FiSend />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminSupport;

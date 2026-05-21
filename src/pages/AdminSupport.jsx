import React, {
  useEffect,
  useRef,
  useState,
  useCallback
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

  const [loading, setLoading] =
    useState(true);

  const [chatLoading,
    setChatLoading] =
    useState(false);

  const [openChat,
    setOpenChat] =
    useState(false);

  const messagesEndRef =
    useRef(null);

  // =========================
  // TOKEN
  // =========================

  const getToken = () =>
    localStorage.getItem(
      "token"
    );

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

  const fetchChats =
    useCallback(async () => {

      try {

        const token =
          getToken();

        if (!token) {
          setLoading(false);
          return;
        }

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

        console.log(
          error?.response?.data ||
          error.message
        );

      } finally {

        setLoading(false);

      }

    }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // =========================
  // FETCH SINGLE CHAT
  // =========================

  const fetchMessages =
    async (userId) => {

      try {

        setChatLoading(true);

        const token =
          getToken();

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

        console.log(
          error?.response?.data ||
          error.message
        );

      } finally {

        setChatLoading(false);

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
          getToken();

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

        fetchChats();

      } catch (error) {

        console.log(
          error?.response?.data ||
          error.message
        );

      }
    };

  // =========================
  // FORMAT DATE LABEL
  // =========================

  const formatDateLabel = (
    date
  ) => {

    const today =
      new Date();

    const yesterday =
      new Date();

    yesterday.setDate(
      today.getDate() - 1
    );

    if (
      date.toDateString() ===
      today.toDateString()
    ) {
      return "Today";
    }

    if (
      date.toDateString() ===
      yesterday.toDateString()
    ) {
      return "Yesterday";
    }

    return date.toLocaleDateString(
      [],
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-support-page">
        Loading chats...
      </div>
    );
  }

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
            <h3>
              Chats
            </h3>
          </div>

          {chats.length === 0 ? (

            <div className="no-chats">
              No chats yet
            </div>

          ) : (

            chats.map((chat) => (

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

            ))

          )}

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

            {!selectedUser ? (

              <div className="empty-chat">
                Select a user chat
              </div>

            ) : chatLoading ? (

              <div className="empty-chat">
                Loading messages...
              </div>

            ) : (

              messages.map(
                (
                  msg,
                  index
                ) => {

                  // =========================
                  // SAFE DATE
                  // =========================

                  const hasValidDate =
                    msg.createdAt &&
                    !isNaN(
                      new Date(
                        msg.createdAt
                      ).getTime()
                    );

                  const messageDate =
                    hasValidDate
                      ? new Date(
                          msg.createdAt
                        )
                      : null;

                  const currentDate =
                    messageDate
                      ? messageDate.toDateString()
                      : "No Date";

                  const previousDate =
                    index > 0 &&
                    messages[
                      index - 1
                    ].createdAt
                      ? new Date(
                          messages[
                            index - 1
                          ].createdAt
                        ).toDateString()
                      : null;

                  const showDate =
                    currentDate !==
                    previousDate;

                  const time =
                    messageDate
                      ? messageDate.toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit"
                          }
                        )
                      : "";

                  return (

                    <React.Fragment
                      key={index}
                    >

                      {/* DATE */}

                      {showDate &&
                        messageDate && (
                          <div className="chat-date">
                            {formatDateLabel(
                              messageDate
                            )}
                          </div>
                        )}

                      {/* MESSAGE */}

                      <div
                        className={`admin-message ${
                          msg.sender ===
                          "admin"
                            ? "admin-reply"
                            : "user-message"
                        }`}
                      >

                        <div className="message-text">
                          {msg.message}
                        </div>

                        {time && (
                          <div className="message-time">
                            {time}
                          </div>
                        )}

                      </div>

                    </React.Fragment>
                  );
                }
              )

            )}

            <div ref={messagesEndRef} />

          </div>

          {/* INPUT */}

          {selectedUser && (

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
                  e.key ===
                    "Enter" &&
                  sendReply()
                }
              />

              <button
                onClick={sendReply}
              >
                <FiSend />
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default AdminSupport;

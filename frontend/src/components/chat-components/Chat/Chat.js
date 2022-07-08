import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

// import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import UserContainer from "../UserContainer/UserContainer";

let socket;

const Chat = () => {
  const params = useParams();
  const { user: name, room } = params;
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "http://localhost:5000";
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, name, room]);

  //to update messages array whenever a message is sent by admin or user
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  //function for sending messages
  const sendMessage = (event) => {
    //to prevent refresh when we press key
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div>
      <div className="outer">
        <div className="chat-container">
          <div className="search-container">
            <h1 className={"title"}>
              <img
                className="logo"
                src="https://image.flaticon.com/icons/svg/2950/2950581.svg"
                alt="logo"
              />
              ChatGram
            </h1>
          </div>

          <div className="conversation-list">
            <UserContainer users={users} />
          </div>

          <div className="new-message-container"></div>

          <div className="chat-title">
            <InfoBar room={room} />
          </div>

          <div className="chat-form">
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

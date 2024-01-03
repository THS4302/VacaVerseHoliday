"use client";
import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import { Input } from "@nextui-org/react";
import Convo from "../../../components/chat/conversation";
import Msg from "../../../components/chat/message";
import ChatOnline from "../../../components/chat/chatOnline";
import { createMessage, getConversations, getMsg } from "@/api/chat";
import { useAuth } from "@/context/authContext";
import { Conversation, Message, User } from "@/types/interfaces";
import { getUser } from "@/api/post";
import { io, Socket } from "socket.io-client";
// import "eventsource-polyfill";
import dynamic from "next/dynamic";
interface ArrivalMsg {
  sender: number;
  text: string;
  created_at: number;
}

export default function Chat() {
  const { user } = useAuth();
  const socket = useRef<Socket>();
  const [currUser, setCurrUser] = useState<User>();
  const [currentChat, setCurrentChat] = useState<Conversation>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessages] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentUserID =
    typeof localStorage !== "undefined" ? localStorage.getItem("userId") : null;
  const uid = parseInt(currentUserID ?? "0", 10);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  useEffect(() => {
    socket.current = io("ws://localhost:8081", {
      withCredentials: true,
      transports: ["websocket", "htmlfile", "xhr-multipart", "xhr-polling"],
    });
    socket.current.on("connect", () => {
      console.log("Socket connected from frontend!");
    });
    socket.current.on("getMessage", (data) => {
      alert(" message data:" + data.text);
      console.log("Message to log " + data.text);

      setArrivalMessage({
        message_id: data.message_id,
        convo_id: data.convo_id,
        sender: data.senderId,
        text: data.text,
        created_at: new Date(),
        receiver: data.receiverId,
      });
    });
    socket.current.on("disconnect", () => {
      console.log("Socket disconnected!");
    });

    return () => {
      // Disconnect the socket when the component unmounts
      socket.current?.disconnect();
    };
  }, [uid]);
  // useEffect(() => {}, [arrivalMessage, currentChat]);
  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender)
    ) {
      console.log("working");
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current?.emit("addUser", uid);
    socket.current?.on("getUsers", (users) => {
      // console.log("Received users from getUsers event:", users);
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(uid);
        setCurrUser(user.users);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const getConvo = async () => {
      try {
        const convoData = await getConversations(uid);
        setConversations(convoData.chat);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchUser();
    getConvo();
  }, [uid, currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const convoId = currentChat?.convo_id;
        if (convoId !== undefined) {
          const msgData = await getMsg(convoId);
          setMessages(msgData.message);
        } else {
          console.warn("No conversation ID available.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [currentChat, arrivalMessage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentChat) {
      const message = {
        convo_id: currentChat.convo_id,
        sender: uid,
        text: newMessage,
      };

      try {
        const newData = await createMessage(message);
        setMessages([...messages, newData.message]);

        const receiverId = currentChat?.members.find(
          (member) => member !== uid
        );
        // socket.current?.emit("sendMessage", {
        //   message_id: newData.message.message_id,
        //   convo_id: newData.message.convo_id,
        //   senderId: uid,
        //   receiverId: uid,
        //   text: newMessage,
        // });

        // Emit to the receiver
        socket.current?.emit("sendMessage", {
          message_id: newData.message.message_id,
          convo_id: newData.message.convo_id,
          senderId: uid,
          receiverId: receiverId,
          text: newMessage,
        });

        setNewMessages("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger h-[calc(100vh-70px)]">
      <div className="chatMenu w-1/4">
        <div className="chatMenuWrapper h-full p-10">
          <input
            placeholder="Search for friends..."
            className="chatMenuInput"
          />
          {conversations.length > 0 &&
            currUser &&
            Object.keys(currUser).length > 0 &&
            conversations.map((c) => (
              <div key={c.convo_id} onClick={() => setCurrentChat(c)}>
                <Convo
                  key={c.convo_id}
                  conversation={c}
                  currentUser={currUser as User}
                />
              </div>
            ))}
        </div>
      </div>

      <div className="chatBox w-1/2 h-[calc(100vh-70px)] overflow-y-auto">
        <div className="chatBoxWrapper p-10">
          {currentChat ? (
            <div>
              <div className="chatBoxTop">
                {messages
                  .filter((m) => m.convo_id === currentChat.convo_id)
                  .map((m) => (
                    <div key={m.message_id} ref={scrollRef}>
                      <Msg
                        key={m.message_id}
                        message={m}
                        own={m.sender === uid}
                      />
                    </div>
                  ))}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="send your message"
                    value={newMessage}
                    onChange={(e) => setNewMessages(e.target.value)}
                  ></textarea>
                  <button type="submit" className="chatSubmitButton">
                    Send
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="noConversationText">
                Open a conversation to start a chat.
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="chatOnline w-1/4 ">
        <div className="chatOnlineWrapper h-full p-10">
          <ChatOnline
         
          />
        </div>
      </div>
    </div>
  );
}

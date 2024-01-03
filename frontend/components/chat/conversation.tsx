"use client";
import React, { useState, useEffect } from "react";
import "./css/conversation.css";
import {
  Conversation as ConversationType,
  User as UserType,
} from "@/types/interfaces";
import { getUser } from "@/api/post";

interface ConversationProps {
  conversation: ConversationType;
  currentUser: UserType;
}

const ConversationComponent: React.FC<ConversationProps> = ({
  conversation,
  currentUser,
}) => {
  const [friends, setFriends] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendIds = conversation.members.filter(
          (memberId) => memberId != currentUser.userid
        );

        const friendsData = await Promise.all(
          friendIds.map(async (friendId) => {
            const { users } = await getUser(friendId);
            return users;
          })
        );

        setFriends(friendsData);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [conversation.members, currentUser]);

  return (
    <div>
      {friends.map((friend) => (
        <div key={friend.userid} className="friendContainer">
          <div className="conversation">
            <img
              className="conversationImg"
              src={
                friend.profile_url
                  ? friend.profile_url
                  : "https://i.pinimg.com/736x/e2/39/d2/e239d2b46a4229245ce4aae9362ee4d5.jpg"
              }
              alt=""
            />
            <span className="conversationName">{friend.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationComponent;

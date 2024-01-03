// components/chat/Chat.js
import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Avatar,
} from "@chakra-ui/react";

// Define a type for messages
type MessageType = {
  text: string;
  sender: string;
};
interface UserType {
  id: number;
  name: string;
}
interface ChatProps {
  activeUser: UserType | null;
}

const Chat: React.FC<ChatProps> = ({ activeUser }) => {
  const [newMessage, setNewMessage] = useState("");
  const [userMessages, setUserMessages] = useState<{
    [userId: number]: MessageType[];
  }>({});

  const handleSendMessage = () => {
    if (!activeUser) {
      return;
    }

    const userId = activeUser.id;

    if (!userMessages[userId]) {
      // Initialize messages for the user if not exists
      setUserMessages((prevMessages) => ({ ...prevMessages, [userId]: [] }));
    }

    setUserMessages((prevMessages) => ({
      ...prevMessages,
      [userId]: [...prevMessages[userId], { text: newMessage, sender: "user" }],
    }));

    setNewMessage("");
  };

  const messages = userMessages[activeUser?.id || 0] || [];

  return (
    <Box p={4}>
      <VStack spacing={4} align="start">
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Chat with {activeUser ? activeUser.name : ""}
          </Text>
        </Box>
        {/* Display messages */}
        <VStack align="start" spacing={2}>
          {messages.map((message, index) => (
            <HStack key={index} align="start">
              <Avatar size="sm" name={message.sender} />
              <Box>
                <Text>{message.sender}</Text>
                <Text>{message.text}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
        {/* Input field and send button */}
        <HStack>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Chat;

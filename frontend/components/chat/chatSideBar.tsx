// components/chat/Sidebar.js
import React from "react";
import { Box, Text, VStack, HStack, Avatar, Button } from "@chakra-ui/react";

// Define an interface for users
interface UserType {
  id: number;
  name: string;
}

// Define an interface for Sidebar props
interface SidebarProps {
  users: UserType[];
  setActiveUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const Sidebar: React.FC<SidebarProps> = ({ users, setActiveUser }) => {
  return (
    <Box p={4}>
      <VStack align="start" spacing={4}>
        <Text fontWeight="bold" fontSize="lg">
          Users
        </Text>
        {/* Toggle between users */}
        {users.map((user) => (
          <HStack key={user.id} align="center">
            <Avatar size="sm" name={user.name} />
            <Button onClick={() => setActiveUser(user)} variant="link">
              {user.name}
            </Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;

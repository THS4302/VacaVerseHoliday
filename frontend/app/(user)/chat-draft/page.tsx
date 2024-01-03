"use client";
import React, { useState, useEffect, useContext } from "react";

import { ContextProvider } from "../../../context/authContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import Sidebar from "@/components/chat/chatSideBar";
import Chat from "../../../components/chat/chat";
// const ChatEngine = dynamic(() =>
//   import("react-chat-engine").then((module) => module.ChatEngine)
// );
// const MessageFormSocial = d/ynamic(() =>
//   import("react-chat-engine").then((module) => module.MessageFormSocial)
// );
interface UserType {
  id: number;
  name: string;
}
const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  // Add more users as needed
];
export default function Chats() {
  const [activeUser, setActiveUser] = useState<UserType | null>(null);

  return (
    <div>
      <Grid templateColumns="repeat(10,1fr)" h="100vh" as={Tabs}>
        <GridItem colSpan={3} borderRight="1px solid gray">
          <Sidebar users={users} setActiveUser={setActiveUser} />
        </GridItem>

        <GridItem colSpan={7}>
          <Chat activeUser={activeUser} />
        </GridItem>
      </Grid>
    </div>
  );
}

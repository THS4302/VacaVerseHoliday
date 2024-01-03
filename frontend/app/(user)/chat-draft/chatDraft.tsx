"use client";
import React, { useState, useEffect, useContext } from "react";

import { ContextProvider } from "../../../context/authContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import Sidebar from "../../../components/chat/";
import Chat from "../../../components/chat/chat";
// const ChatEngine = dynamic(() =>
//   import("react-chat-engine").then((module) => module.ChatEngine)
// );
// const MessageFormSocial = d/ynamic(() =>
//   import("react-chat-engine").then((module) => module.MessageFormSocial)
// );
export default function Chats() {
  return (
    <div>
      <Grid templateColumns="repeat(10,1fr)" h="100vh" as={Tabs}>
        <GridItem colSpan={3} borderRight="1px solid gray">
          <Sidebar />
        </GridItem>

        <GridItem colSpan={7}>
          <Chat />
        </GridItem>
      </Grid>
    </div>
  );
}

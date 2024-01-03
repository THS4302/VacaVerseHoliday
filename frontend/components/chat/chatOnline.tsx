import React from "react";

// Import Tailwind CSS styles
import "./css/chatOnline.css";

export default function ChatOnline() {
  return (
    <div className="flex items-center chatOnlineFriend">
      <div className="chatOnlineImgContainer">
        <img
          className="chatOnlineImg rounded-full"
          src="https://i.pinimg.com/736x/b7/51/9b/b7519b7a9f0cb0861fdfd99ba8cba18c.jpg"
          alt=""
        />
        <div className="chatOnlineBadge"></div>
      </div>
      <div className="ml-1">Su thiri kyaw</div>
    </div>
  );
}

// "use client";
// import React, { useState, useEffect } from "react";

// import "./css/chatOnline.css";
// import {
//   Conversation as ConversationType,
//   User as UserType,
// } from "@/types/interfaces";

// interface OnlineProps {
//   setCurrentChat: React.Dispatch<React.SetStateAction<ConversationType | null>>;
//   currentId: number;
//   onlineUsers: UserType;
// }
// const ChatOnline: React.FC<OnlineProps> = ({
//   onlineUsers,
//   currentId,
//   setCurrentChat,
// }) => {
//   const [friends, setFriends] = useState([]);
//   const [onlineFriends, setOnlineFriends] = useState([]);
//   useEffect(() => {});
//   return (
//     <div className="flex items-center chatOnlineFriend">
//       <div className="chatOnlineImgContainer">
//         <img
//           className="chatOnlineImg rounded-full"
//           src="https://i.pinimg.com/736x/b7/51/9b/b7519b7a9f0cb0861fdfd99ba8cba18c.jpg"
//           alt=""
//         />
//         <div className="chatOnlineBadge"></div>
//       </div>
//       <div className="ml-1">Su thiri kyaw</div>
//     </div>
//   );
// };
// export default ChatOnline;

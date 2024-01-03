import React from "react";
import "./css/message.css";
import { Message } from "@/types/interfaces";
import moment from "moment";
import TimeAgo from "javascript-time-ago";
// Change the import to include the entire module
import en from "javascript-time-ago/locale/en"; // or the desired locale

// Initialize the time-ago library with the desired locale
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en");

interface MessageProps {
  own: boolean;
  message: Message; // Assuming `own` is a boolean
}

export default function Message({ message, own }: MessageProps) {
  const formattedCreated = moment(message.created_at).format("DD/MM/YYYY");
  const timeAgoString = timeAgo.format(new Date(message.created_at));

  return (
    <div className={`${own ? "message own" : "message"}`}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://i.pinimg.com/736x/e2/39/d2/e239d2b46a4229245ce4aae9362ee4d5.jpg"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{timeAgoString}</div>
    </div>
  );
}

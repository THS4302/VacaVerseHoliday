const Conversation = require("../model/conversationModel");
const Message = require("../model/messageModel");
const chatModel = require("../model/chatModel");
// Create a new conversation
// exports.createNewConvo = async (req, res) => {
//   try {
//     const newConvo = await Conversation.create({
//       members: [req.body.senderId, req.body.receiverId],
//     });

//     res.status(201).json(newConvo);
//   } catch (error) {
//     console.error("Error creating conversation:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.createNewConvo = async (req, res, next) => {
  console.log("In chat controller");
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  try {
    // Call the model function to get all users
    const chatUser = await chatModel.createNewConvo(senderId, receiverId);

    // Send the response to the client
    res.status(200).json({ chat: chatUser });
  } catch (error) {
    console.log("Error: " + error);
    // Handle the error and send an error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getConvoByUser = async (req, res, next) => {
  const userid = req.params.uid;
  try {
    const chats = await chatModel.getConvoByUser(userid);
    console.log(chats);

    res.status(200).json({ chat: chats });
  } catch (error) {
    console.log("Error: " + error);
    // Handle the error and send an error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//add messages
exports.addNewMessage = async (req, res, next) => {
  // const userid = req.params.uid;
  const { convo_id, sender, text } = req.body;
  try {
    const msg = await chatModel.createMessage(convo_id, sender, text);
    res.status(200).json({ message: msg });
  } catch (error) {
    console.log("Error: " + error);
    // Handle the error and send an error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getMsgByConvo = async (req, res, next) => {
  const convoID = req.params.convoID;
  try {
    const msg = await chatModel.getMessageByUser(convoID);
    res.status(200).json({ message: msg });
  } catch (error) {
    console.log("Error: " + error);
    // Handle the error and send an error response
    res.status(500).json({ error: "Internal Server Error" });
  }
};

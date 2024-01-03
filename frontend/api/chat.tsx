import { Message, Post, User, sendMsg } from "../types/interfaces";
const baseURL = process.env.SERVER_BASE_URL;
export async function getConversations(userid: number) {
  try {
    // console.log("in postByCat api");
    const post = `${baseURL}/api/getConvoByUser/${userid}`;
    const response = await fetch(post);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    throw error;
  }
}

export async function getMsg(convo_id: number) {
  try {
    // console.log("in postByCat api");
    const msg = `${baseURL}/api/getMessages/${convo_id}`;
    const response = await fetch(msg);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    throw error;
  }
}

export async function createMessage(message: sendMsg) {
  try {
    const msg = `${baseURL}/api/newMessage`;
    const response = await fetch(msg, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    throw error;
  }
}

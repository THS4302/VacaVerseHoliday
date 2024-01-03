const pool = require("../config/database"); // Assuming this file exports your pg.Pool instance

module.exports.createNewConvo = async (senderId, receiverId) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO conversations (members) VALUES ($1) RETURNING *",
      [[senderId, receiverId]]
    );
    const newConvo = result.rows[0];
    client.release();

    return newConvo;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};

module.exports.getConvoByUser = async (userid) => {
  try {
    if (!userid) {
      throw new Error("User ID is required.");
    }

    // Use pool.query to execute the SQL query
    const result = await pool.query(
      "SELECT * FROM conversations WHERE $1 = ANY(members)",
      [userid]
    );

    // Extract the conversations from the result
    const conversations = result.rows;

    console.log("All Conversations:", conversations);

    return conversations;
  } catch (error) {
    console.error("Error fetching conversations:", error.message);
    throw error;
  }
};

module.exports.createMessage = async (convoID, sender, text) => {
  try {
    // Use pool.query to execute the SQL query to insert a new message
    const result = await pool.query(
      "INSERT INTO messages (convo_id, sender, text) VALUES ($1, $2, $3) RETURNING *",
      [convoID, sender, text]
    );

    // Extract the newly created message from the result
    const newMessage = result.rows[0];

    console.log("New Message:", newMessage);

    return newMessage;
  } catch (error) {
    console.error("Error creating message:", error.message);
    throw error;
  }
};

module.exports.getMessageByUser = async (convoID) => {
  try {
    if (!convoID) {
      throw new Error("Convo ID is required.");
    }

    // Use pool.query to execute the SQL query
    const result = await pool.query(
      "SELECT * FROM messages WHERE convo_id = $1",
      [convoID]
    );

    // Extract the messages from the result
    const messages = result.rows;

    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    throw error;
  }
};

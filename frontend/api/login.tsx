import { Login } from "../types/interfaces";
const baseURL = process.env.SERVER_BASE_URL;
export async function changePassword(email:string, newPassword: string) {
    try {
      const changePasswordEndpoint = `${baseURL}/api/changePassword`;
      const response = await fetch(changePasswordEndpoint, {
        method: 'PUT', // Assuming your API endpoint supports a PUT request for changing the password
        headers: {
            "Content-Type": "application/json",
          //Authorization: `Bearer ${authToken}`, // Include the user token for authentication
        },
        body: JSON.stringify({
            email,
          newPassword,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
  
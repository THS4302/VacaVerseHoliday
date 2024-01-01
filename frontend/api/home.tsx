const baseURL = process.env.SERVER_BASE_URL;// Update this with your actual base URL

export async function getUserData(userId: number) {
  try {
    const userAPI = `${baseURL}/api/user/${userId}`;
    const response = await fetch(userAPI);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function getMostBooked(){
   try{

   const mostBookedAPI = `${baseURL}/api/mostBooked`;
    const response = await fetch(mostBookedAPI);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
}
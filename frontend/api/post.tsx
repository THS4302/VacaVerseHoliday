import { Post, User } from "../types/interfaces";
const baseURL = process.env.SERVER_BASE_URL;
export async function getUserPost(uid: number) {
  try {
    const yourPostEndpoint = `${baseURL}/api/retrieveAllPostByUser/${uid}`;
    const response = await fetch(yourPostEndpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error; // rethrow the error or handle it appropriately
  }
}

export async function getSavePost(uid: number) {
  try {
    const yourPostEndpoint = `${baseURL}/api/userLikedPosts/${uid}`;
    const response = await fetch(yourPostEndpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error; // rethrow the error or handle it appropriately
  }
}
export async function getAllCat() {
  try {
    const allCat = `${baseURL}/api/getAllCat`;
    const response = await fetch(allCat);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error; // rethrow the error or handle it appropriately
  }
}

export async function getPostbyCategory(userID: number, catID: number) {
  try {
    console.log("in postByCat api");
    const postCat = `${baseURL}/api/postByCat/${userID}/${catID}`;
    const response = await fetch(postCat);

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
export async function getUser(userID: number) {
  try {
    console.log("in postByCat api");
    const postCat = `${baseURL}/api/user/${userID}`;
    const response = await fetch(postCat);

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
export async function getPostByID(postid: number) {
  try {
    console.log("in postByCat api");
    const post = `${baseURL}/api/PostByID/${postid}`;
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
export async function getSimilarPost(
  placeid: number,
  userid: number,
  postid: number
) {
  try {
    console.log("in postByCat api");
    const post = `${baseURL}/api/similarPlacePosts/${placeid}/${userid}/${postid}`;
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
export async function UserDataByPost(userid: number) {
  try {
    console.log("in postByCat api");
    const user = `${baseURL}/api/user/${userid}`;
    const response = await fetch(user);

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
export async function getSaveCount(postid: number) {
  try {
    console.log("in postByCat api");
    const post = `${baseURL}/api/countSavedTimes/${postid}`;
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

export async function isPostSaved(userid: number) {
  try {
    console.log("in postByCat api");
    const isSaved = `${baseURL}/api/userLikedPosts/${userid}`;
    const response = await fetch(isSaved);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching posts by saved: ", error);
    throw error;
  }
}

export async function deletePostSaved(userid: number, postid: number) {
  try {
    console.log("in postByCat api");
    const isSaved = `${baseURL}/api/deleteSavePost/${userid}/${postid}`;
    const response = await fetch(isSaved, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching posts by saved: ", error);
    throw error;
  }
}

export async function saveThePost(userid: number, postid: number) {
  try {
    console.log("in postByCat api");
    const isSaved = `${baseURL}/api/savePost/${userid}/${postid}`;
    const response = await fetch(isSaved, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching posts by saved: ", error);
    throw error;
  }
}

export async function deletePost(postid: number) {
  try {
    console.log("in postByCat api");
    const post = `${baseURL}/api/deletePost/${postid}`;
    const response = await fetch(post, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching posts by saved: ", error);
    throw error;
  }
}

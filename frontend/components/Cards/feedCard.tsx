"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import "../Cards/card.css";
import { Post, User } from "../../types/interfaces";
import { getUser } from "@/api/post";
import defaultPic from "../../_assets/images/profilePic.png";

const FeedCard = ({ post }: { post: Post }) => {
  const { title, images, description, userid } = post;
  const [users, setUsers] = useState<User[]>([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        console.log("userid", userid);
        const getUserInfo = await getUser(userid);
        const userData = getUserInfo.users;
        console.log("API Response:", getUserInfo, userData);
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };

    fetchData();
  }, [userid]);

  useEffect(() => {
    console.log("users in feed ", users);
  }, [users]);

  const maxWords = 30;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDescription = () => {
    const words = description.split(" ");
    if (showFullDescription || words.length <= maxWords) {
      return description;
    }
    const truncatedDescription = words.slice(0, maxWords).join(" ");
    return `${truncatedDescription} ...`;
  };

  return (
    <div className="mt-4 container ">
      <Card shadow="md" className=" w-90">
        <CardBody>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <div className="flex mb-4">
            {images.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl}
                alt={`Image ${index}`}
                className="w-full h-32 object-cover p-2 "
              />
            ))}
          </div>
          <hr className="border-t border-gray-300 mb-2" />
          {/* {users.map((user, index) => (
            <div key={index} className="flex mb-4">
              {user && (
                <Image
                  className="w-10 h-10 rounded-full mr-2"
                  src={
                    user.profile_url ||
                    "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                  }
                  alt={`Profile of ${user.username}`}
                />
              )}
              <div>
                <p className="font-bold mt-2">{user.username}</p>
              </div>
            </div>
          ))} */}

          {/* Description section */}
          <div>
            <p className="text-gray-500">{getDescription()}</p>
            {description.split(" ").length > maxWords && (
              <button
                className="text-blue-500 cursor-pointer focus:outline-none"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FeedCard;

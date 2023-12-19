"use client";
import React, { useState, useEffect } from "react";
import profilePic from "../../../../_assets/images/profilePic.png";
import { Card, Button, Tabs, Tab } from "@nextui-org/react"; // Import Next UI Card components
import Link from "next/link";
import Image from "next/image";
import { getSavePost, getUserPost } from "../../../../api/post";
import { User, Post } from "../../../../types/interfaces";
import PostCard from "../../../../components/Cards/postCard";
const ProfileMain = () => {
  //   console.log(baseURL);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [activeTab, setActiveTab] = useState("yourPosts");

  const currentUserID =
    typeof localStorage !== "undefined" ? localStorage.getItem("userId") : null;
  const uid = parseInt(currentUserID ?? "0", 10);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let postData = [];
        if (activeTab === "yourPosts") {
          const userPost = await getUserPost(uid);
          postData = userPost.posts || [];
        } else if (activeTab === "savedPosts") {
          const savePost = await getSavePost(uid);
          postData = savePost.posts || [];
        }

        setPosts(postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="profile flex">
      <div className="userBio">
        <div>
          <Tabs
            variant="underlined"
            color="primary"
            selectedKey={activeTab}
            onSelectionChange={(newSelectedKey) =>
              setActiveTab(newSelectedKey as string)
            }
          >
            <Tab key="yourPosts" title="Your Posts"></Tab>
            <Tab key="savedPosts" title="Saved Posts"></Tab>
          </Tabs>
        </div>
        {loading ? (
          <div>hi</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                
                <Link
                  href={{
                    pathname: `/post/postDetail/${post.postid}`,
                  }}
                >
                  <PostCard post={post} />
                </Link>
              ))
            ) : (
              <div>No posts available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMain;

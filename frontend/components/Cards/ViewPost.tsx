"use client";
import { Post, User } from "@/types/interfaces";
import React, { useState, useEffect } from "react";

import save from "../../_assets/images/save.png";
import editIcon from "../../_assets/images/edit.png";
import deleteIcon from "../../_assets/images/bin.png";
import confirmSave from "../../_assets/images/bookmark.png";
import {
  UserDataByPost,
  deletePost,
  deletePostSaved,
  getSaveCount,
  isPostSaved,
  saveThePost,
} from "@/api/post";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
export default function ViewPost({ userPost }: { userPost: Post }) {
  const [isSaved, setIsSaved] = useState(false);
  var currentUserID = localStorage.getItem("userId");
  const uid = parseInt(currentUserID ?? "0", 10);

  const navigate = useRouter();
  const [selectedImage, setSelectedImage] = useState(userPost.images[0]);
  const [otherUser, setOtherUser] = useState<User[]>([]);
  const [saveCount, setSaveCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const formattedCreatedDate = moment(userPost.created_time).format(
    "DD/MM/YYYY"
  );
  const formattedUpdatedDate = moment(userPost.updated_time).format(
    "DD/MM/YYYY"
  );

  useEffect(() => {
    const fetchUserDataAndCount = async () => {
      try {
        const userData = await UserDataByPost(userPost.userid);
        const usersData = userData.users || [];
        setOtherUser(usersData);

        const countData = await getSaveCount(userPost.postid);
        const count = countData.count;
        setSaveCount(count[0].savecount);
      } catch (error) {
        console.error("Error fetching user data or save count:", error);
      }
    };

    const fetchUserLikedPosts = async () => {
      try {
        const responseData = await isPostSaved(uid);
        const likedPosts = responseData.posts || [];
        const isPostLiked = likedPosts
          .map((post: Post) => post.postid)
          .includes(userPost.postid);

        setIsSaved(isPostLiked);
      } catch (error) {
        console.error("Error fetching user saved posts:", error);
      }
    };

    fetchUserDataAndCount();
    fetchUserLikedPosts();
  }, [isSaved]);

  const handleSave = async () => {
    try {
      if (isSaved) {
        const deleteSave = await deletePostSaved(uid, userPost.postid);
        setIsSaved(false);
      } else {
        const savingPost = await saveThePost(uid, userPost.postid);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error saving/posting:", error);
    }
  };

  const handleSmallImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const onHandleEdit = () => {
    if (uid == userPost.userid) {
      const editPostUrl = `/editPost/${userPost.postid}`;
      navigate.push(editPostUrl);
    } else {
      alert("You are unauthorized");
    }
  };
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const onHandleDelete = async () => {
    if (uid == userPost.userid) {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );

      if (shouldDelete) {
        try {
          const responseData = await deletePost(userPost.postid);
          console.log("Success:", responseData.posts);
          navigate.push("/post/myPost");
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      } else {
        console.log("Deletion canceled by the user");
      }
    } else {
      alert("You are unauthorized");
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="bg-white shadow-lg flex">
        {/* Left Section */}
        <div className="w-1/2 items-center">
          <Image
            src={selectedImage}
            alt="First Image"
            className="main-image object-cover cursor-pointer w-full  mr-1  p-1"
            width={500}
            height={700}
          />

          <div className="small-images flex justify-center">
            {userPost.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="small-image w-1/4 object-cover h-17 p-2 cursor-pointer"
                onClick={() => handleSmallImageClick(image)}
              />
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="border-r-2 border-gray-300 h-full"></div>

        {/* Right Section */}
        <div className="w-1/2 p-4">
          <div className="post-details">
            <div className="title mb-4">
              <h1 className="text-2xl font-bold mr-4">{userPost.title}</h1>
              <div className="flex items-center">
                <div className="save-count mr-2">{saveCount}</div>
                <Image
                  src={isSaved ? confirmSave : save}
                  alt="Save Logo"
                  className="save-logo cursor-pointer w-6 h-6"
                  onClick={handleSave}
                />
              </div>
            </div>

            {uid !== userPost.userid && otherUser.length > 0 && (
              <div className="userName">
                created by{" "}
                <span
                  className="profile-link cursor-pointer"
                  onClick={() =>
                    navigate.push("/othersProfile/" + otherUser[0].userid)
                  }
                >
                  {otherUser[0].username}
                </span>
              </div>
            )}

            <Link
              key={userPost.locationid}
              href={`/book-place/${userPost.locationid}`}
              className="toPlacedetail cursor-pointer"
            >
              <div className="place-name">{userPost.place_name} </div>
            </Link>

            <div className="description mb-4">{userPost.description}</div>

            {/* Created date */}
            <div className="created-date mb-4">
              Created: {formattedCreatedDate}
              {userPost.updated_time && (
                <div className="updated-time">
                  Updated: {formattedUpdatedDate}
                </div>
              )}
              {uid === userPost.userid && (
                <div className="icons flex">
                  <Image
                    src={editIcon}
                    alt="Edit Icon"
                    className="edit-icon cursor-pointer w-6 h-6"
                    onClick={onHandleEdit}
                  />
                  <Image
                    src={deleteIcon}
                    alt="Delete Icon"
                    className="delete-icon cursor-pointer w-6 h-6"
                    onClick={onHandleDelete}
                  />
                </div>
              )}
            </div>

            {/* Updated Time (if not null) */}
          </div>
        </div>
      </div>
    </div>
  );
}

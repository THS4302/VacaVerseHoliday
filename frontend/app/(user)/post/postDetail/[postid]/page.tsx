"use client";
import React, { useState, useEffect } from "react";
import { getPostByID, getSimilarPost } from "@/api/post";
import { Post } from "@/types/interfaces";
import ViewPost from "@/components/Cards/ViewPost";
import ArrowButton from "@/components/Arrow/arrow";

export default function postDetail({
  params,
}: {
  params: { postid: string };
}) {
  const [post, setPost] = useState<Post[]>([]);
  const [similarPost, setSimilarPosts] = useState<Post[]>([]);
  const idOfPost = parseInt(params.postid);

  useEffect(() => {
    const fetchPostByID = async () => {
      try {
        const response = await getPostByID(idOfPost);

        const postData = response.posts || [];
        const postArray = Array.isArray(postData) ? postData : [postData];

        console.log("Response Data:", postData);
        console.log("Post Data:", postArray);
        setPost(postArray);

        // Extract placeid from the details of the specific post
        const placeid = postArray.length > 0 ? postArray[0].locationid : null;
        const userid = postArray.length > 0 ? postArray[0].userid : null;
        const postid = postArray.length > 0 ? postArray[0].postid : null;
        console.log(placeid);
        // Now fetch similar posts based on the retrieved placeid
        if (placeid && userid && postid) {
          fetchSimilarPosts(placeid, userid, postid);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    const fetchSimilarPosts = async (
      placeid: number,
      userid: number,
      postid: number
    ) => {
      try {
        const response = await getSimilarPost(placeid, userid, postid);
        const postData = response.posts || [];
        const postArray = Array.isArray(postData) ? postData : [postData];

        console.log("Response Data (Similar Posts):", postData);
        console.log("Similar Posts Data:", postArray);
        setSimilarPosts(postArray);
      } catch (error) {
        console.error("Error fetching similar posts:", error);
      }
    };

    fetchPostByID();
  }, [idOfPost]);

  return (
    <div>
      <div> My Post: {params.postid}</div>
      <div className="container-fluid detailBox col-10">
        {post ? (
          post.map((userPost) => (
            <div key={userPost.postid} className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <ArrowButton direction="previous"></ArrowButton>
                <ViewPost userPost={userPost} />
              </div>
              <ArrowButton direction="next"></ArrowButton>
            </div>
          ))
        ) : (
          <div>No more post</div>
        )}
      </div>
    </div>
  );
}
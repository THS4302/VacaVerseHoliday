"use client";
import React, { useState, useEffect, Key } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { getAllCat, getPostbyCategory } from "../../../../api/post";
import { Category, Post } from "@/types/interfaces";
import { usePathname } from "next/navigation";
import FeedCard from "../../../../components/Cards/feedCard";
import SearchIcon from "../../../../_assets/images/search.png";
import Image from "next/image";
import Link from "next/link";

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cat, setCat] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("following");
  const userid = localStorage.getItem("userId");
  const currentUserID =
    typeof localStorage !== "undefined" ? localStorage.getItem("userId") : null;
  const uid = parseInt(currentUserID ?? "0", 10);
  const pathname = usePathname();

  const getCatTabDetail = async (catID: number) => {
    try {
      setLoading(true);
      const getPostByCat = await getPostbyCategory(uid, catID);
      const postData = getPostByCat.posts || [];
      setPosts(postData);
      console.log(postData);
    } catch (error) {
      console.error("Error fetching posts by category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const getCat = await getAllCat();
        const catsData = getCat.categories.rows || [];

        console.log("catsData:", catsData);
        console.log("selected:", selected);

        setCat(catsData);

        if (selected !== "following") {
          let idSelected = parseInt(selected);

          getCatTabDetail(idSelected);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selected]);

  return (
    <div className="flex justify-center flex-wrap gap-4">
      <div className="row">
        <div className="col-12 col-md-6 col-sm-4 flex justify-center items-center text-center">
          <Tabs
            variant="underlined"
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={(newSelectedKey: Key) =>
              setSelected(newSelectedKey as string)
            }
          >
            <Tab key="following" title="For you" />
            {cat.length > 0 &&
              cat.map((category) => (
                <Tab key={category.cat_id} title={category.cat_name} />
              ))}
          </Tabs>

          {/* <Image src={SearchIcon} alt="Search Icon" className="w-5 h-5 ml-5" /> */}
        </div>
        <div className="col-12">
          {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <Link
                  href={{
                    pathname: `/post/postDetail/${post.postid}`,
                  }}
                >
                  <FeedCard key={post.post_id} post={post} />
                </Link>
              ))}
            </div>
          ) : (
            <p>No posts to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}

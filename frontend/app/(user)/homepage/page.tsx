// pages/index.js
"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import {User,Place,Post} from "../../../types/interfaces";
import { getMostBooked, getUserData,getRecommended } from "@/api/home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PostCard from "@/components/Cards/postCard";
const HomePage = () => {
  const [user, setUser] = useState<User>({username: '', userid:0, profile_url:''});
  const [placeImages, setPlaceImages] = useState<Place[]>([]);
  const [mostBooked, setMostBooked] = useState<Place[]>([]);
  const [recommended, setRecommended] = useState<Place[]>([]);
  const [mostPopular, setMostPopular] = useState<Post[]>([]);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userIdString = localStorage.getItem('userId');
        const userId = userIdString !== null ? parseInt(userIdString, 10) : null;
        // Fetch user data
        if (userId !== null) {
        const userData = await getUserData(userId);
        if (userData.users.length > 0) {
          const userProfile = userData.users[0];
          setUser(userProfile);
        }
      }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    const fetchPlaceImages = async () => {
      try {
        const imageResponse = await fetch("/api/imageSlideshow");
        const imageData = await imageResponse.json();

        if (Array.isArray(imageData.images.rows)) {
          setPlaceImages(imageData.images.rows);
        } else {
          console.error(
            "Images data rows is not an array:",
            imageData.images.rows
          );
        }
      } catch (error) {
        console.error("Error fetching place images:", error);
      }
    };

    const fetchMostBooked = async () => {
      try {
     
        const mostBookedData = await getMostBooked();
       

        if (Array.isArray(mostBookedData.mostBooked)) {
          setMostBooked(mostBookedData.mostBooked);
        } else {
          console.error(
            "Most Booked data is not an array:",
            mostBookedData.mostBooked
          );
        }
      } catch (error) {
        console.error("Error fetching most booked data:", error);
      }
    };

    const fetchRecommended = async () => {
      try {
        const userIdString = localStorage.getItem("userId");
       
        const userId = userIdString !== null ? parseInt(userIdString, 10) : null;
        // Fetch user data
        if (userId !== null) {
        const recommendedData = await getRecommended(userId);
     
        
       
    

        if (Array.isArray(recommendedData.recommendedPlaces)) {
          setRecommended(recommendedData.recommendedPlaces);
        } else {
          console.error(
            "Recommended data is not an array:",
            recommendedData.recommendedPlaces
          );
        }
      }

      } catch (error) {
        console.error("Error fetching most recommended data:", error);
      }
    };

    const fetchMostPopular = async () => {
      try {
        const mostPopularResponse = await fetch("http:/localhost:8081/api/mostSavedPosts");
        const mostPopularData = await mostPopularResponse.json();

        if (Array.isArray(mostPopularData.mostSavedPosts)) {
          setMostPopular(mostPopularData.mostSavedPosts);
        } else {
          console.error(
            "Most Popular data is not an array:",
            mostPopularData.mostSavedPosts
          );
        }
      } catch (error) {
        console.error("Error fetching most popular data:", error);
      }
    };

    // Fetch user details
    fetchUserData();
    fetchMostBooked();
    fetchMostPopular();
    fetchRecommended();

    // Fetch place images
    fetchPlaceImages();
  }, []);

  const settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "custom-slider",
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "custom-slider",
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const settings3 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "custom-slider",
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
   
      <div className="user-welcome">Welcome, {user.username}!</div>

      {/* Image Slideshow for Places */}
      <div className="Places">
        <Slider {...settings1}>
          {placeImages.map((image, index) => (
            <div key={index} className="place-slide">
              <img
                src={image.place_image}
                className="slideshow-images"
                alt={`Place ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Most Booked Section */}
      <div className="MostBookedPlaces">
        <div className="mostbooked-title">Most Booked</div>
        <Slider {...settings2} className="mostbooked-slider">
          {mostBooked.length > 0 &&
            mostBooked.map((place) => (
              <Link legacyBehavior
                key={place.placeid}
                href={`/book-place/${place.placeid}`}
              >
                <a className="place-card-link no-underline">
                  <div
                    key={place.placeid}
                    className="place-card mostbooked-slide"
                  >
                    <img src={place.place_image} alt={place.place_name} />
                    <div className="places-card-info">
                      <h3 className="places-card-title black-text">
                        {place.place_name}
                      </h3>
                      <p className="places-card-cat black-text">
                        {place.cat_name}
                      </p>
                      <p className="places-card-description black-text">
                        {place.description}
                      </p>
                      <p className="places-card-rating black-text">
                        Rating: {place.rating}/5
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
        </Slider>
      </div>

      <div className="Recommended">
        <div className="recommended-title">Recommended</div>
        {recommended.length === 0 ? (
          <div>No recommended places</div>
        ) : (
          <Slider {...settings2} className="mostbooked-slider">
            {recommended.map((place:Place) => (
              <Link legacyBehavior
                key={place.placeid}
                href={`/book-place/${place.placeid}`}
              >
                <a className="place-card-link no-underline">
                  <div
                    key={place.placeid}
                    className="place-card mostbooked-slide"
                  >
                    <img src={place.place_image} alt={place.place_name} />
                    <div className="places-card-info">
                      <h3 className="places-card-title black-text">
                        {place.place_name}
                      </h3>
                      <p className="places-card-cat black-text">
                        {place.cat_name} {/* Assuming cat_id is the category ID */}
                      </p>
                      <p className="places-card-description black-text">
                        {place.description}
                      </p>
                      <p className="places-card-rating black-text">
                        Rating: {place.rating}/5
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </Slider>
        )}
      </div>

      <div className="MostBookedPlaces">
        <div className="mostbooked-title">Most Popular Posts</div>
        <Slider {...settings2} className="mostbooked-slider">
          {mostPopular.length > 0 &&
            mostPopular.map((post) => (
              <Link legacyBehavior
                key={post.postid}
                href={`/post-details/${post.postid}`}
              >
                <a className="card-link">
                  <PostCard post={post} />
                </a>
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomePage;

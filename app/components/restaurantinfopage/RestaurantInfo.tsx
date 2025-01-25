import React, { useState } from "react";
import RestaurantTime from "./RestaurantTime";
import Link from "next/link";
import { favoriteRestaurant } from "@/app/lib/FavoriteData";

type RestaurantInfoProps = {
  data: {
    restaurantName: string;
    restaurantAddress: string;
    googleMapUrl: string;
    website: string | null;
    phoneNumber: string | null;
    imageUrl: string;
    weekdayText: string[];
    addedBy: {
      name: string;
      username: string;
      profilePictureUrl: string;
    };
    restaurantUsername: string;
    likedByUser: boolean;
  };
};

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ data }) => {
  const [isLiked, setIsLiked] = useState(data.likedByUser);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await favoriteRestaurant({
        isFavorite: !isLiked,
        restaurantUsername: data.restaurantUsername,
      });
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      alert("An error occurred while updating the favorite status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg">
      {/* Image */}
      <img
        src={data.imageUrl || "https://placehold.co/600x400"}
        alt={data.restaurantName}
        className="w-full h-64 object-cover rounded-t-lg"
      />

      {/* Name */}
      <h2 className="text-3xl font-bold mt-4 text-gray-800 text-left">
        {data.restaurantName}
      </h2>

      {/* Address */}
      {data.restaurantAddress && (
        <p className="text-gray-600 mt-2 text-left font-light">
          {data.restaurantAddress}
        </p>
      )}

      {/* Added By */}
      <p className="mt-4 text-sm font-semibold text-gray-700">Added by</p>

      {/* Profile */}
      <Link href={`/profile/${data.addedBy.username}/favorites`}>
        <div className="bg-gray-50 p-4 rounded-lg mt-2 flex items-center">
          <img
            src={data.addedBy.profilePictureUrl}
            alt={data.addedBy.name}
            className="w-12 h-12 rounded-full shadow-md"
          />
          <div className="ml-4">
            <p className="text-sm font-semibold text-gray-700">
              {data.addedBy.name}
            </p>
            <p className="text-sm text-gray-500">@{data.addedBy.username}</p>
          </div>
        </div>
      </Link>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6 justify-center items-center">
        <a
          href={data.googleMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Open in Maps
        </a>
        {data.website && (
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Open Website
          </a>
        )}
        {data.phoneNumber && (
          <a href={`tel:${data.phoneNumber}`} className="btn btn-primary">
            Call
          </a>
        )}

        {/* Liked Button */}
        <button
          onClick={toggleLike}
          disabled={loading}
          className="btn btn-primary flex items-center space-x-2"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={isLiked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{isLiked ? "Liked" : "Not Liked"}</span>
            </>
          )}
        </button>
      </div>

      {/* Opening Hours */}
      {data.weekdayText && data.weekdayText.length > 0 && (
        <div className="mt-6">
          <RestaurantTime weekdayText={data.weekdayText} />
        </div>
      )}
    </div>
  );
};

export default RestaurantInfo;

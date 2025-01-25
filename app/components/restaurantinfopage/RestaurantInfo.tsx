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
    <div className="max-w-2xl mx-auto p-0 sm:p-4 rounded-lg bg-white shadow-md overflow-hidden">
      {/* Image */}
      <img
        src={data.imageUrl || "https://placehold.co/600x400"}
        alt={data.restaurantName}
        className="w-full h-48 sm:h-64 object-cover"
      />

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Name */}
        <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-800 w-full text-left break-words">
          {data.restaurantName}
        </h2>

        {/* Address */}
        {data.restaurantAddress && (
          <p className="text-gray-600 mt-2 text-left font-light text-sm sm:text-base break-words">
            {data.restaurantAddress}
          </p>
        )}

        {/* Added By */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg -mx-4 sm:-mx-6 flex items-center space-x-4">
          <img
            src={data.addedBy.profilePictureUrl}
            alt={data.addedBy.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md"
          />
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {data.addedBy.name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              @{data.addedBy.username}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6 justify-center items-stretch sm:items-center space-y-3 sm:space-y-0">
          <a
            href={data.googleMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full sm:w-auto text-center"
          >
            Open in Maps
          </a>
          {data.website && (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full sm:w-auto text-center"
            >
              Open Website
            </a>
          )}
          {data.phoneNumber && (
            <a
              href={`tel:${data.phoneNumber}`}
              className="btn btn-primary w-full sm:w-auto text-center"
            >
              Call
            </a>
          )}

          {/* Like Button */}
          <button
            onClick={toggleLike}
            disabled={loading}
            className="btn btn-primary flex justify-center items-center space-x-2 w-full sm:w-auto"
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
    </div>
  );
};

export default RestaurantInfo;

import React, { useState } from "react";
import RestaurantTime from "./RestaurantTime";
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
    <div className="max-w-2xl mx-auto p-0 sm:p-4 rounded-lg bg-white overflow-hidden">
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
        <div className="flex flex-row items-center justify-center space-x-2 mt-6 w-full">
          {/* Google Maps Button */}
          <a
            href={data.googleMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex items-center justify-center p-2 w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full sm:rounded-md"
            title="Open in Maps"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 sm:mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              />
            </svg>
            <span className="hidden sm:inline">Maps</span>
          </a>

          {/* Website Button */}
          {data.website && (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center justify-center p-2 w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full sm:rounded-md"
              title="Open Website"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 sm:mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <span className="hidden sm:inline">Website</span>
            </a>
          )}

          {/* Phone Button */}
          {data.phoneNumber && (
            <a
              href={`tel:${data.phoneNumber}`}
              className="btn btn-primary flex items-center justify-center p-2 w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full sm:rounded-md"
              title="Call"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 sm:mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              <span className="hidden sm:inline">Call</span>
            </a>
          )}

          {/* Like Button (unchanged) */}
          <button
            onClick={toggleLike}
            disabled={loading}
            className="btn btn-primary flex justify-center items-center space-x-2 w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full sm:rounded-md"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 sm:h-6 sm:w-6 ${
                    isLiked ? "text-red-500" : "fill"
                  }`}
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
                <span className="hidden sm:inline">
                  {isLiked ? "Liked" : "Not Liked"}
                </span>
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

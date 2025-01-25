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
      <p className="mt-4 text-sm font-semibold text-gray-700">
        Added by {data.addedBy.name}
      </p>

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
      <div className="flex justify-center gap-4 mt-6">
        <a
          href={data.googleMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Open in Maps
        </a>
        {data.website && (
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Open Website
          </a>
        )}
        {data.phoneNumber && (
          <a
            href={`tel:${data.phoneNumber}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Call
          </a>
        )}
      </div>

      {/* Liked Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={toggleLike}
          disabled={loading}
          className={`px-4 py-2 rounded-lg shadow transition flex items-center gap-2 ${
            isLiked
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-400 text-white hover:bg-gray-500"
          } ${loading ? "btn-disabled" : ""}`}
        >
          {loading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          {isLiked ? "Liked" : "Not Liked"}
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

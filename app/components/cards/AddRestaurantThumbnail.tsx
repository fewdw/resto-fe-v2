import { favoriteRestaurant } from "@/app/lib/FavoriteData";
import Link from "next/link";
import React, { useState } from "react";
import Tag from "./Tag";

interface Rating {
  tag: {
    id: number;
    name: string;
    type: string;
    emoji: string;
  };
  votes: number;
}

interface Restaurant {
  restaurantImage: string;
  restaurantName: string;
  restaurantUsername: string;
  restaurantAddress: string;
  ratings: Rating[];
  likedByUser: boolean;
}

interface ThumbnailProps {
  restaurant: Restaurant;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ restaurant }) => {
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(restaurant);

  const topTags = restaurant.ratings
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 8); // Limit to top 8 tags

  const handleFavoriteToggle = async () => {
    try {
      setIsFavoriteLoading(true);
      await favoriteRestaurant({
        isFavorite: !currentRestaurant.likedByUser,
        restaurantUsername: currentRestaurant.restaurantUsername,
      });
      setCurrentRestaurant((prev) => ({
        ...prev,
        likedByUser: !prev.likedByUser,
      }));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-base-100">
      <Link href={`/restaurant/${restaurant.restaurantUsername}`}>
        <div>
          <figure className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
            {restaurant.restaurantImage ? (
              <img
                src={restaurant.restaurantImage}
                alt={restaurant.restaurantName}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
              />
            ) : (
              <div className="h-full w-full rounded-lg bg-gray-200 animate-pulse"></div>
            )}
          </figure>
          <h2 className="text-lg font-semibold mb-2 text-center">
            {restaurant.restaurantName}
          </h2>
          <p className="text-sm text-gray-600 text-center mb-3">
            {restaurant.restaurantAddress}
          </p>
        </div>
      </Link>

      <div className="grid grid-cols-4 gap-2 mb-3">
        {topTags.map((rating) => (
          <Tag
            key={rating.tag.id}
            emoji={rating.tag.emoji}
            name={rating.tag.name}
            votes={rating.votes}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          className={`btn btn-circle ${
            currentRestaurant.likedByUser ? "btn-error" : "btn-outline"
          }`}
          onClick={handleFavoriteToggle}
          disabled={isFavoriteLoading}
        >
          {isFavoriteLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={currentRestaurant.likedByUser ? "currentColor" : "none"}
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
          )}
        </button>
      </div>
    </div>
  );
};

export default Thumbnail;

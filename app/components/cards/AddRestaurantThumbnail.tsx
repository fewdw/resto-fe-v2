import Link from "next/link";
import React, { useState } from "react";
import { addRestaurant } from "@/app/lib/RestaurantData";
import { favoriteRestaurant } from "@/app/lib/FavoriteData";

type RestaurantThumbnailProps = {
  restaurant: {
    placeId: string;
    description: string;
    username: string | null;
    added: boolean;
    likedByUser: boolean;
  };
};

const AddRestaurantThumbnail: React.FC<RestaurantThumbnailProps> = ({
  restaurant,
}) => {
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(restaurant);

  const handleFavoriteToggle = async () => {
    try {
      setIsFavoriteLoading(true);
      await favoriteRestaurant({
        isFavorite: !currentRestaurant.likedByUser,
        restaurantUsername: currentRestaurant.username!,
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

  const handleAddRestaurant = async () => {
    try {
      setIsAddLoading(true);
      const data = await addRestaurant(currentRestaurant.placeId);
      setCurrentRestaurant({
        ...currentRestaurant,
        added: true,
        username: data.restaurantUsername,
      });
    } catch (error) {
      console.error("Error adding restaurant:", error);
    } finally {
      setIsAddLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between border rounded-lg p-6 shadow-md hover:shadow-lg transition bg-base-100">
      <div>
        <h2 className="text-xl font-semibold mb-2 text-center">
          {currentRestaurant.description}
        </h2>
      </div>
      <div className="mt-4">
        {currentRestaurant.added ? (
          <div className="flex justify-between items-center">
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
            {currentRestaurant.username && (
              <Link
                href={`/restaurant/${currentRestaurant.username}`}
                className="btn btn-outline"
              >
                Visit Page
              </Link>
            )}
          </div>
        ) : (
          <button
            className="btn btn-primary w-full"
            onClick={handleAddRestaurant}
            disabled={isAddLoading}
          >
            {isAddLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Add"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddRestaurantThumbnail;

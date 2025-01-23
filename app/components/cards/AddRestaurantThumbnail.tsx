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
      // Update likedByUser status
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
      // Update the restaurant to reflect "added" status
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
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{currentRestaurant.description}</h2>

      {/* Show "Added by you" or added by someone */}
      {currentRestaurant.added && (
        <p className="text-sm text-gray-500">
          Added by:{" "}
          {currentRestaurant.username
            ? currentRestaurant.username === "you"
              ? "You!"
              : currentRestaurant.username
            : "Unknown"}
        </p>
      )}

      {currentRestaurant.added ? (
        <div className="mt-2 flex gap-4">
          {/* Favorite Button */}
          <button
            className="btn"
            onClick={handleFavoriteToggle}
            disabled={isFavoriteLoading}
          >
            {isFavoriteLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : currentRestaurant.likedByUser ? (
              "❤️ Favorite"
            ) : (
              "🖤 Favorite"
            )}
          </button>
          {/* Visit Page Button */}
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
        <div className="mt-2">
          {/* Add Button */}
          <button
            className="btn btn-primary"
            onClick={handleAddRestaurant}
            disabled={isAddLoading}
          >
            {isAddLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Add"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddRestaurantThumbnail;

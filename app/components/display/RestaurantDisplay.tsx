// components/RestaurantDisplay.tsx
import React from "react";
import { Restaurant } from "@/app/types/user";
import Thumbnail from "../cards/Thumbnail";

interface RestaurantDisplayProps {
  restaurants: Restaurant[];
}

const RestaurantDisplay: React.FC<RestaurantDisplayProps> = ({
  restaurants,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <Thumbnail
          key={restaurant.restaurantUsername}
          restaurant={restaurant}
        />
      ))}
    </div>
  );
};

export default RestaurantDisplay;

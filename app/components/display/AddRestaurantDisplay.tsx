import React from "react";
import AddRestaurantThumbnail from "../cards/AddRestaurantThumbnail";

type RestaurantSearchResult = {
  placeId: string;
  description: string;
  username: string | null;
  added: boolean;
  likedByUser: boolean;
};

interface AddRestaurantDisplayProps {
  results: RestaurantSearchResult[];
}

const AddRestaurantDisplay: React.FC<AddRestaurantDisplayProps> = ({
  results,
}) => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((restaurant) => (
        <AddRestaurantThumbnail
          key={restaurant.placeId}
          restaurant={restaurant}
        />
      ))}
    </div>
  );
};

export default AddRestaurantDisplay;

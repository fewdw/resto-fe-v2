// components/card/Thumbnail.tsx
import Link from "next/link";
import React from "react";

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
}

interface ThumbnailProps {
  restaurant: Restaurant;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ restaurant }) => {
  const topTags = restaurant.ratings.sort((a, b) => b.votes - a.votes);

  return (
    <div className="w-full p-3 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out transform">
      <Link href={`/restaurant/${restaurant.restaurantUsername}`}>
        <div className="relative">
          <figure className="relative w-full h-48 rounded-lg overflow-hidden">
            {restaurant.restaurantImage ? (
              <img
                src={restaurant.restaurantImage}
                alt={restaurant.restaurantName}
                className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out"
              />
            ) : (
              <div className="h-full w-full rounded-lg bg-gray-200 animate-pulse"></div>
            )}
          </figure>
          <div className="p-3 space-y-2">
            <h2 className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-300">
              {restaurant.restaurantName}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {restaurant.restaurantAddress}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {topTags.map((rating) => (
                <div
                  key={rating.tag.id}
                  className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs md:text-sm shadow-sm hover:bg-gray-200 transition duration-300"
                >
                  <span className="text-lg">{rating.tag.emoji}</span>
                  <span className="hidden md:inline">{rating.tag.name}</span>
                  <span className="font-bold">{rating.votes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Thumbnail;

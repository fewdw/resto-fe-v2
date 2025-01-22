"use client";
import { useEffect, useState } from "react";
import { Restaurant } from "@/app/types/user";
import {
  getRestaurantsAdded,
  getRestaurantsFavorite,
} from "@/app/lib/UserData";
import RestaurantDisplay from "@/app/components/display/RestaurantDisplay";

const Page = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRestaurantsFavorite(0);
      setRestaurants(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        {restaurants === null ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner text-primary mt-36"></span>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center mt-36">
            <span>User has not added any restaurants yet</span>
          </div>
        ) : (
          <RestaurantDisplay restaurants={restaurants} />
        )}
      </div>
    </div>
  );
};

export default Page;

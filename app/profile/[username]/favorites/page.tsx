"use client";

import { useEffect, useState } from "react";
import { Restaurant } from "@/app/types/user";
import { getRestaurantsFavoriteByUsername } from "@/app/lib/UserData";
import RestaurantDisplay from "@/app/components/display/RestaurantDisplay";

const Page = ({ params }: { params: Promise<{ username: string }> }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setUsername(resolvedParams.username);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      const data = await getRestaurantsFavoriteByUsername(0, username);
      setRestaurants(data);
    };

    fetchData();
  }, [username]);

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

"use client";
import { getRestaurantsByPopular } from "@/app/lib/RestaurantData";
import { Restaurant } from "@/app/types/user";
import { useEffect, useState } from "react";
import RestaurantDisplay from "../display/RestaurantDisplay";

const Popular: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurantsByPopular(0);
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching popular restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (restaurants.length === 0)
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        No restaurants found
      </div>
    );

  return <RestaurantDisplay restaurants={restaurants} />;
};

export default Popular;

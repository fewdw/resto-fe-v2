"use client";

import React, { useEffect, useState } from "react";
import RestaurantInfo from "@/app/components/restaurantinfopage/RestaurantInfo";
import RestaurantTime from "@/app/components/restaurantinfopage/RestaurantTime";
import { getRestaurantByUsername } from "@/app/lib/RestaurantData";
import { getRatings } from "@/app/lib/RatingData";
import RestaurantTags from "@/app/components/restaurantinfopage/RestaurantTags";

const Page = ({ params }: { params: Promise<{ username: string }> }) => {
  const [restaurantData, setRestaurantData] = useState<null | {
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
  }>(null);
  const [tags, setTags] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
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
      try {
        const data = await getRestaurantByUsername(username);
        setRestaurantData({
          restaurantName: data.restaurantApiInfo.restaurantName,
          restaurantAddress: data.restaurantApiInfo.restaurantAddress,
          googleMapUrl: data.restaurantApiInfo.googleMapUrl,
          website: data.restaurantApiInfo.website,
          phoneNumber: data.restaurantApiInfo.phoneNumber,
          imageUrl: data.restaurantApiInfo.imageUrl,
          weekdayText: data.restaurantApiInfo.weekdayText,
          addedBy: {
            name: data.userInfoAddedBy.name,
            username: data.userInfoAddedBy.username,
            profilePictureUrl: data.userInfoAddedBy.profilePictureUrl,
          },
        });

        // Fetching tags (ratings) for the restaurant
        const tagData = await getRatings(username);
        setTags(tagData);
      } catch (err) {
        setError("Failed to fetch restaurant data or tags.");
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="min-h-screen p-6">
      {error ? (
        <div className="text-red-500 text-center mt-36">{error}</div>
      ) : restaurantData === null ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner text-primary mt-36"></span>
        </div>
      ) : (
        <>
          {/* Display Restaurant Info */}
          <RestaurantInfo data={restaurantData} />

          {/* Display Restaurant Tags */}
          {tags.length === 0 ? (
            <div className="text-center mt-6">
              No tags available for this restaurant.
            </div>
          ) : (
            <RestaurantTags tags={tags} />
          )}
        </>
      )}
    </div>
  );
};

export default Page;

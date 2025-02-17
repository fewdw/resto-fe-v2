"use client";
import React, { useState, useEffect } from "react";
import { getTags } from "@/app/lib/Tags";
import { searchRestaurantThumbnails } from "@/app/lib/RestaurantData";
import { Tag } from "@/app/types/tag";
import { Restaurant } from "@/app/types/user";
import RestaurantDisplay from "../display/RestaurantDisplay";

const Search: React.FC = () => {
  const [isStrictTags, setIsStrictTags] = useState<boolean>(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [groupedTags, setGroupedTags] = useState<{ [key: string]: Tag[] }>({});
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags = await getTags();
      setTags(fetchedTags);
      const grouped = fetchedTags.reduce((acc, tag) => {
        if (!acc[tag.type]) {
          acc[tag.type] = [];
        }
        acc[tag.type].push(tag);
        return acc;
      }, {} as { [key: string]: Tag[] });
      setGroupedTags(grouped);
    };
    fetchTags();
  }, []);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const results = await searchRestaurantThumbnails(0, {
        strictTags: isStrictTags,
        tags: selectedTags,
      });
      setRestaurants(results);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const toggleTagSelection = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.some((t) => t.id === tag.id)
        ? prev.filter((t) => t.id !== tag.id)
        : [...prev, tag]
    );
  };

  const formatTypeHeader = (type: string) => {
    return type.replace(/_/g, " ");
  };

  return (
    <div>
      <div className="space-y-6 p-4 max-w-4xl mx-auto">
        {/* Search Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <select
            className="select select-bordered w-full md:max-w-[10rem] flex-shrink-0"
            value={isStrictTags.toString()}
            onChange={(e) => setIsStrictTags(e.target.value === "true")}
          >
            <option value="true">Strict</option>
            <option value="false">Non-strict</option>
          </select>
          <button
            onClick={handleSearch}
            className="btn bg-red-500 text-white flex items-center w-full md:w-auto text-sm md:text-base px-4 py-2 md:px-6 md:py-3 flex-shrink-0 hover:bg-red-600"
          >
            {isLoading && (
              <span className="loading loading-spinner loading-xs mr-2"></span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            Search
          </button>
        </div>

        {/* Tags Display */}
        {Object.entries(groupedTags).map(([type, typeTags]) => (
          <div key={type} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {formatTypeHeader(type)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {typeTags.map((tag) => (
                <div
                  key={tag.id}
                  onClick={() => toggleTagSelection(tag)}
                  className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-colors ${
                    selectedTags.some((t) => t.id === tag.id)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <span className="mr-2">{tag.emoji}</span>
                  <span>{tag.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Restaurants Display */}
      <div className="pt-8">
        {restaurants.length > 0 ? (
          <RestaurantDisplay restaurants={restaurants} />
        ) : hasSearched ? (
          <div className="text-center text-gray-500 py-8">
            No restaurants found. Try adjusting your tags.
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            Select your tags and search to find restaurants
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

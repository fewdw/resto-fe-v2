"use client";
import React, { useState, useEffect } from "react";
import { getTags } from "@/app/lib/Tags";
import { searchRestaurantThumbnails } from "@/app/lib/RestaurantData";
import { Tag } from "@/app/types/tag";
import { Restaurant } from "@/app/types/user";
import RestaurantDisplay from "../display/RestaurantDisplay";

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isStrictTags, setIsStrictTags] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [groupedTags, setGroupedTags] = useState<{ [key: string]: Tag[] }>({});
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

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
      const results = await searchRestaurantThumbnails(0, {
        searchBar: searchTerm,
        strictTags: isStrictTags,
        tags: selectedTags,
      });
      setRestaurants(results);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
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
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
          className="border p-2 rounded"
        />
        <div className="flex items-center">
          <input
            type="radio"
            id="strictTagsFalse"
            name="strictTags"
            checked={isStrictTags === false}
            onChange={() => setIsStrictTags(false)}
            className="mr-2"
          />
          <label htmlFor="strictTagsFalse" className="mr-4">
            Loose Tags
          </label>
          <input
            type="radio"
            id="strictTagsTrue"
            name="strictTags"
            checked={isStrictTags === true}
            onChange={() => setIsStrictTags(true)}
            className="mr-2"
          />
          <label htmlFor="strictTagsTrue">Strict Tags</label>
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {Object.entries(groupedTags).map(([type, typeTags]) => (
        <div key={type} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            {formatTypeHeader(type)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {typeTags.map((tag) => (
              <div
                key={tag.id}
                onClick={() => toggleTagSelection(tag)}
                className={`flex items-center px-3 py-1 rounded-full cursor-pointer ${
                  selectedTags.some((t) => t.id === tag.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                <span className="mr-2">{tag.emoji}</span>
                <span>{tag.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {restaurants.length > 0 ? (
        <RestaurantDisplay restaurants={restaurants} />
      ) : hasSearched ? (
        <div className="text-center text-gray-500 py-8">
          No restaurants found. Try adjusting your search.
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          Select your tags and search to find restaurants
        </div>
      )}
    </div>
  );
};

export default Search;

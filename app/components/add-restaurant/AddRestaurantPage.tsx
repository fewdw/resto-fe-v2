import React, { useState } from "react";
import AddRestaurantDisplay from "../display/AddRestaurantDisplay";
import { searchRestaurants } from "@/app/lib/RestaurantData";
import { RestaurantSearchResult } from "@/app/types/restaurant";

const AddRestaurantPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RestaurantSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty searches
    try {
      setIsSearching(true);
      const data: RestaurantSearchResult[] = await searchRestaurants(query);
      setResults(data);
    } catch (error) {
      console.error("Error searching restaurants:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add a Restaurant</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input input-bordered w-full max-w-xs"
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary flex items-center justify-center"
          disabled={isSearching}
        >
          {isSearching ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Search"
          )}
        </button>
      </div>
      <AddRestaurantDisplay results={results} />
    </div>
  );
};

export default AddRestaurantPage;

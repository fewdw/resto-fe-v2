import React, { useState } from "react";
import AddRestaurantDisplay from "../display/AddRestaurantDisplay";
import { searchRestaurants } from "@/app/lib/RestaurantData";
import { RestaurantSearchResult } from "@/app/types/restaurant";

const AddRestaurantPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RestaurantSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      setIsSearching(true);
      setHasSearched(false);
      const data: RestaurantSearchResult[] = await searchRestaurants(query);
      setResults(data);
      setHasSearched(true);
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
    <div className="p-6 flex flex-col min-h-screen">
      <div className="w-full max-w-lg mx-auto mt-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Let People Know What You Like 🍽️✨
        </h1>
        <div className="w-full flex gap-2">
          <input
            type="text"
            placeholder="Type here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input input-bordered w-full"
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary w-32"
            disabled={isSearching}
          >
            {isSearching ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>
      {hasSearched && results.length === 0 && !isSearching && (
        <p className="text-center mt-4 text-gray-500">No items found.</p>
      )}
      <AddRestaurantDisplay results={results} />
    </div>
  );
};

export default AddRestaurantPage;

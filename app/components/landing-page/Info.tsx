import React from "react";

const Info = () => {
  return (
    <div>
      <section className="bg-white text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-red-700">
              How it works?
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Step 1 */}
            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition ">
              <div className="flex justify-center items-center mb-4 text-4xl text-red-700">
                📝
              </div>
              <h2 className="text-xl font-bold text-red-700 text-center">
                Add Your Favorite Restaurants
              </h2>
              <p className="mt-1 text-sm text-blue-950 text-left">
                Easily add your favorite dining spots, and help others discover
                the best places to eat.
              </p>
            </div>

            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition">
              <div className="flex justify-center items-center mb-4 text-4xl text-red-700">
                🏷️
              </div>
              <h2 className="text-xl font-bold text-red-700 text-center">
                Tag Restaurants with Unique Labels
              </h2>
              <p className="mt-1 text-sm text-blue-950 text-left">
                Label your favorite spots with tags like "romantic" or
                "family-friendly" to help others find exactly what they're
                craving.
              </p>
            </div>

            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition">
              <div className="flex justify-center items-center mb-4 text-4xl text-red-700">
                🔍
              </div>
              <h2 className="text-xl font-bold text-red-700 text-center">
                Explore Popular Tags and Filters
              </h2>
              <p className="mt-1 text-sm text-blue-950 text-left">
                Browse trending tags or filter by categories to find the perfect
                restaurant for any occasion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Info;

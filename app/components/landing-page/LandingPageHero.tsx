import React from "react";

const LandingPageHero = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Discover Amazing Restaurants,
            <strong className="font-extrabold text-red-700 sm:block">
              {" "}
              Share Your Favorites.{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Find the best dining spots with personalized tags, filters, and
            recommendations from a community of food enthusiasts like you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingPageHero;

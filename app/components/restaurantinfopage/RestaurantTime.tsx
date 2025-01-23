import React from "react";

type RestaurantTimeProps = {
  weekdayText: string[];
};

const RestaurantTime: React.FC<RestaurantTimeProps> = ({ weekdayText }) => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="flex justify-center">
      <ul className="mt-2 text-gray-700 space-y-1 w-fit text-left">
        {weekdayText.map((hour, index) => {
          const isToday = hour.startsWith(today);
          return (
            <li
              key={index}
              className={`flex items-center ${
                isToday ? "bg-yellow-100 font-bold" : ""
              }`}
            >
              {hour}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantTime;

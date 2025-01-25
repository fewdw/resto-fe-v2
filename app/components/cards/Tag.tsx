import React from "react";

interface TagProps {
  emoji: string;
  name: string;
  votes: number;
}

const Tag: React.FC<TagProps> = ({ emoji, name, votes }) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs md:text-sm shadow hover:bg-gray-200 transition duration-300">
      <span className="text-base">{emoji}</span>
      <span className="">{name}</span>
      <span className="text-gray-600 font-semibold">{votes}</span>
    </div>
  );
};

export default Tag;

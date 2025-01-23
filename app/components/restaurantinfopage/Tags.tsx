import React from "react";

type TagProps = {
  emoji: string;
  name: string;
  votes: number;
  userVoted: boolean;
};

const formatVotes = (votes: number): string => {
  if (votes === 0) return "";
  if (votes >= 1000) return `${Math.floor(votes / 1000)}k`;
  return votes.toString();
};

const Tag: React.FC<TagProps> = ({ emoji, name, votes, userVoted }) => {
  const formattedVotes = formatVotes(votes);

  const badgeClass = userVoted
    ? "inline-flex items-center space-x-2 bg-blue-500 text-white rounded-full px-3 py-2 text-sm md:text-base"
    : "inline-flex items-center space-x-2 bg-gray-200 text-gray-700 rounded-full px-3 py-2 text-sm md:text-base";

  return (
    <div className={badgeClass}>
      <span className="text-lg">{emoji}</span>
      <span>{name}</span>
      <span className="font-bold">{formattedVotes}</span>
    </div>
  );
};

export default Tag;

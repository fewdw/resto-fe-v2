import { addRating } from "@/app/lib/RatingData";
import { useParams } from "next/navigation";
import React, { useState } from "react";

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
  const [isVoted, setIsVoted] = useState(userVoted);
  const [currentVotes, setCurrentVotes] = useState(votes);
  const { username } = useParams<{ username: string }>();

  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the user is in the middle of submitting a rating

  const badgeClass = isVoted
    ? "inline-flex items-center space-x-2 bg-blue-500 text-white rounded-full px-3 py-2 text-sm md:text-base"
    : "inline-flex items-center space-x-2 bg-gray-200 text-gray-700 rounded-full px-3 py-2 text-sm md:text-base";

  const handleRating = async () => {
    if (isSubmitting) return; // Prevent submitting if already in progress

    setIsSubmitting(true); // Set submitting to true when user clicks
    const newVotes = isVoted ? currentVotes - 1 : currentVotes + 1;
    setIsVoted(!isVoted);
    setCurrentVotes(newVotes);

    try {
      // Call backend to handle the rating logic
      await addRating(username, name, !isVoted);
    } catch (error) {
      console.error("Error updating rating:", error);
    } finally {
      setIsSubmitting(false); // Re-enable button once request completes
    }
  };

  const formattedVotes = formatVotes(currentVotes);

  return (
    <div className={badgeClass} onClick={handleRating}>
      <span className="text-lg">{emoji}</span>
      <span>{name}</span>
      <span className="font-bold">{formattedVotes}</span>

      {/* Show loader when submitting */}
      {isSubmitting && (
        <span className="loading loading-spinner loading-xs ml-2"></span>
      )}
    </div>
  );
};

export default Tag;

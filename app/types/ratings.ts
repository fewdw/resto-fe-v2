type RatingTag = {
  id: number;
  name: string;
  type: string;
  emoji: string;
};

type Rating = {
  id: number;
  name: string;
  tag: RatingTag;
  votes: number;
  userVoted: boolean;
};

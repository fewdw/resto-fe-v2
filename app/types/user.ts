export interface UserProfile {
  name: string;
  picture: string;
  username: string;
  owner: boolean;
}

export interface RestaurantRatingTag {
  id: number;
  name: string;
  type: string;
  emoji: string;
}

export interface RestaurantRating {
  tag: RestaurantRatingTag;
  votes: number;
}

export interface Restaurant {
  restaurantImage: string;
  restaurantName: string;
  restaurantUsername: string;
  restaurantAddress: string;
  ratings: RestaurantRating[];
  likedByUser: boolean;
}

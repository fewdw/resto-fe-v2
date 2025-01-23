export type RestaurantApiInfo = {
  restaurantName: string;
  restaurantAddress: string;
  placeId: string;
  googleMapUrl: string;
  website: string | null;
  phoneNumber: string | null;
  imageUrl: string;
  weekdayText: string[];
  restaurantUsername: string;
};

export type UserInfoAddedBy = {
  name: string;
  username: string;
  profilePictureUrl: string;
};

export type RestaurantData = {
  restaurantApiInfo: RestaurantApiInfo;
  userInfoAddedBy: UserInfoAddedBy;
  likedByUser: boolean;
};

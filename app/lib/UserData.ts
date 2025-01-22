import { BACKEND_URL } from "@/config";
import { Restaurant, UserProfile } from "@/app/types/user";

export const fetchUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/user/profile`, {
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }
    const data: UserProfile = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export const getRestaurantsAdded = async (
  page: number
): Promise<Restaurant[] | null> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/user/added/${page}`, {
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }
    const data: Restaurant[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return null;
  }
};

export const getRestaurantsFavorite = async (
  page: number
): Promise<Restaurant[] | null> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/favorites/${page}`, {
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }
    const data: Restaurant[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return null;
  }
};

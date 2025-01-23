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

    localStorage.setItem("user", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export const fetchUserProfileById = async (
  username: string
): Promise<UserProfile | null> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/user/profile/${username}`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("User not found");
    }
    const data: UserProfile = await response.json();

    localStorage.setItem("user", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export const getUserFromStorage = (): UserProfile | null => {
  try {
    const userData = localStorage.getItem("user");
    if (!userData) return null;
    return JSON.parse(userData) as UserProfile;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

export const storeUserInStorage = (user: UserProfile): void => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
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

export const getRestaurantsAddedByUsername = async (
  page: number,
  username: string
): Promise<Restaurant[] | null> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/user/added/${username}/${page}`,
      {
        credentials: "include",
      }
    );
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

export const getRestaurantsFavoriteByUsername = async (
  page: number,
  username: string
): Promise<Restaurant[] | null> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/favorites/${username}/${page}`,
      {
        credentials: "include",
      }
    );
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

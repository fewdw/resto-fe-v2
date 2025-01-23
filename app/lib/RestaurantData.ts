import { BACKEND_URL } from "@/config";
import {
  AddRestaurantResponse,
  RestaurantData,
  RestaurantSearchResult,
} from "../types/restaurant";

//RestaurantData.ts
export async function getRestaurantByUsername(
  username: string
): Promise<RestaurantData> {
  const response = await fetch(`${BACKEND_URL}/api/restaurants/${username}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch restaurant data");
  }
  return response.json();
}

export async function searchRestaurants(
  query: string
): Promise<RestaurantSearchResult[]> {
  const endpoint = `${BACKEND_URL}/api/restaurants/search?query=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RestaurantSearchResult[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching restaurant search results:", error);
    throw error;
  }
}

export async function addRestaurant(
  placeId: string
): Promise<AddRestaurantResponse> {
  const endpoint = `${BACKEND_URL}/api/restaurants?placeId=${encodeURIComponent(
    placeId
  )}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to add restaurant. Status: ${response.status}`);
    }

    const data: AddRestaurantResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding restaurant:", error);
    throw error;
  }
}

import { BACKEND_URL } from "@/config";
import { FavoriteRestaurantRequest } from "../types/favorite";

export async function favoriteRestaurant(
  request: FavoriteRestaurantRequest
): Promise<void> {
  const endpoint = `${BACKEND_URL}/api/favorites/favorite`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        is_favorite: request.isFavorite,
        restaurantUsername: request.restaurantUsername,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle favorite. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
}

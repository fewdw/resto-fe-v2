import { BACKEND_URL } from "@/config";
import { RestaurantData } from "../types/restaurant";

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

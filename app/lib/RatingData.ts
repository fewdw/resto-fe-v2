import { BACKEND_URL } from "@/config";

export async function getRatings(username: string): Promise<any[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/ratings/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ratings for username: ${username}`);
    }

    const data = await response.json();

    // Ensure data is an array before returning
    if (Array.isArray(data)) {
      return data;
    } else {
      throw new Error("Received data is not an array.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

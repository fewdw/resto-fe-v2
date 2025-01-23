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

export async function addRating(
  restaurantUsername: string,
  tagName: string,
  is_like: boolean
) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        restaurantUsername,
        tagName,
        is_like,
      }),
    });

    // Check if the response is not OK (4xx errors)
    if (!response.ok) {
      throw new Error(`Failed to send rating: ${response.statusText}`);
    }

    // If status is 200, we don't need to handle a response body
    // Just return nothing or you can return a success flag if needed
    if (response.status === 200) {
      return;
    }

    // If you expect other responses with JSON, you can handle them here
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

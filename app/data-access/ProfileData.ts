import { BACKEND_URL } from "@/config";

interface ProfileResponse {
  name: string;
  picture: string;
  username: string;
  owner: boolean;
}

async function getProfile(): Promise<ProfileResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/user/profile`);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized access. Please login.");
      }
      if (response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      }
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Failed to fetch profile:", error.message);
    throw error;
  }
}

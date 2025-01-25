import { BACKEND_URL } from "@/config";

export async function isLoggedIn(cookies: string): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/user/auth`, {
      headers: {
        Cookie: cookies,
      },
      method: "GET",
      credentials: "include",
    });
    console.log("Response status:", response);

    console.log("Response status:", response.status);
    return response.status === 200;
  } catch (error) {
    console.error("Error occurred during fetch:", error);
    return false;
  }
}

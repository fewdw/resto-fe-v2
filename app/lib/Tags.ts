import { BACKEND_URL } from "@/config";
import { Tag } from "../types/tag";

export async function getTags(): Promise<Tag[]> {
  const response = await fetch(`${BACKEND_URL}/api/tags`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tags: ${response.statusText}`);
  }

  const tags: Tag[] = await response.json();
  return tags;
}

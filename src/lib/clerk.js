import { useAuth } from "@clerk/nextjs";

export async function getAuthToken() {
  const { getToken } = useAuth();
  const token = await getToken();
  return token;
}

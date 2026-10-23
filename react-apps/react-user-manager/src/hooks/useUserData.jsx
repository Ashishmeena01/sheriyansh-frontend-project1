import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/usersApi";

export default function useUserData(userId) {
  return useQuery({
    queryKey: ["userData", userId],
    queryFn: () => getUser(userId),
    enabled: Boolean(userId),
  });
}

import apiClient from "./apiClient";

export function login(username, password) {
  return apiClient.post("/auth/login", {
    username,
    password,
    expiresInMins: 60,
  });
}

export function getCurrentUser(accessToken) {
  return apiClient.get("/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

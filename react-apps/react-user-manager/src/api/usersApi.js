import apiClient from "./apiClient";

export function createUser(user) {
  return apiClient.post("/users/add", user);
}

export function getUsers(){
  return apiClient.get("/users");
}

export function getUser(id) {
  return apiClient.get(`/users/${encodeURIComponent(id)}`);
}

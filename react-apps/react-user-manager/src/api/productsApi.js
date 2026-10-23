import apiClient from "./apiClient";

export function getProducts() {
  return apiClient.get("/products?limit=30");
}

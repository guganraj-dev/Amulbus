import axios from "axios";

const API_URL = "http://localhost:5000";

export const register = (userData) => axios.post(`${API_URL}/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/login`, userData);
export const getProducts = () => axios.get(`${API_URL}/products`);
export const addProduct = (product, token) => axios.post(`${API_URL}/products`, product, {
  headers: { Authorization: token },
});
export const updateProduct = (id, product, token) => axios.put(`${API_URL}/products/${id}`, product, {
  headers: { Authorization: token },
});
export const deleteProduct = (id, token) => axios.delete(`${API_URL}/products/${id}`, {
  headers: { Authorization: token },
});

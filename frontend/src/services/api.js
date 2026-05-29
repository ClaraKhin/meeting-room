import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

const authHeader = (userId) => ({
  headers: {
    "x-user-id": userId,
  },
});

export const getErrorMessage = (error) => {
  return error.response?.data?.message || "Something went wrong";
};

export const userApi = {
  getById(userId) {
    return api.get(`/users/${userId}`, authHeader(userId));
  },
  getAll(currentUserId) {
    return api.get("/users", authHeader(currentUserId));
  },
  create(currentUserId, data) {
    return api.post("/users", data, authHeader(currentUserId));
  },
  updateRole(currentUserId, userId, role) {
    return api.put(`/users/${userId}/role`, { role }, authHeader(currentUserId));
  },
  delete(currentUserId, userId) {
    return api.delete(`/users/${userId}`, authHeader(currentUserId));
  },
};

export const bookingApi = {
  getAll(currentUserId) {
    return api.get("/bookings", authHeader(currentUserId));
  },
  create(currentUserId, data) {
    return api.post("/bookings", data, authHeader(currentUserId));
  },
  delete(currentUserId, bookingId) {
    return api.delete(`/bookings/${bookingId}`, authHeader(currentUserId));
  },
  getSummary(currentUserId) {
    return api.get("/bookings/summary", authHeader(currentUserId));
  },
  getGroupedByUser(currentUserId) {
    return api.get("/bookings/grouped-by-user", authHeader(currentUserId));
  },
};

export default api;

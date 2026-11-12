import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5010/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Create Profile
export const createProfile = (data) =>
  API.post("/create-profile", data);

// Login
export const loginUser = (data) =>
  API.post("/login", data);

// Get Users
export const getUsers = () =>
  API.get("/users");

// Get Profile
export const getProfile = () =>
  API.get("/profile");

// Get Conversations
export const getConversations = () =>
  API.get("/messages/conversations");

// Get Messages
export const getMessages = (userId) =>
  API.get(`/messages/${userId}`);

// Send Message
export const sendMessage = (userId, data) =>
  API.post(`/messages/${userId}`, data);
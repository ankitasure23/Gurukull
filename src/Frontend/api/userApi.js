// src/api/userApi.js
const API_URL = "http://localhost:5000/api/users";

// --- Signup ---
export const signupUser = async (userData) => {
    const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    });
    return res.json();
};

// --- Login ---
export const loginUser = async (credentials) => {
    const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    });
    return res.json();
};

// --- Get All Users ---
export const getUsers = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

// --- Get One User ---
export const getUserById = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
};

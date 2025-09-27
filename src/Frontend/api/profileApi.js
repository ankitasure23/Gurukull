const BASE_URL = "http://localhost:5000/api";

export const getProfile = async (token) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
// Update user profile
export const updateProfile = async (token, data) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Delete offline content
export const deleteOfflineContent = async (token, contentId) => {
  const res = await fetch(`${BASE_URL}/profile/offline/${contentId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

import { useState, useEffect } from "react";

export default function UserInfoForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    language: "",
  });

  // Fetch current user profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/profile", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setFormData({
            name: data.user.full_name || "",
            email: data.user.email || "",
            school: data.user.school || "",
            language: data.user.language || "English",
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // <-- Paste your handleSubmit function here
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          school: formData.school,
          language: formData.language,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Profile updated ✅");
      } else {
        alert("Error updating profile: " + (data.error || data.message || "unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert(" Oops!.......Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        className="w-full p-2 border rounded"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <input
        className="w-full p-2 border rounded"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        className="w-full p-2 border rounded"
        name="school"
        value={formData.school}
        onChange={handleChange}
        placeholder="School"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Save Changes
      </button>
    </form>
  );
}

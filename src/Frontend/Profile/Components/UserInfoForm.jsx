import { useState } from "react";

export default function UserInfoForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated ✅");
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
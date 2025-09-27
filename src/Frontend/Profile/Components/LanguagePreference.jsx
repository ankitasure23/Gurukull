import { useState, useEffect } from "react";

export default function LanguagePreference() {
  const [language, setLanguage] = useState("en");

  // Fetch current language from backend when component mounts
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
        if (data.user && data.user.language) {
          setLanguage(data.user.language);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle language change and update backend
  const handleChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);

    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language: newLang }),
    })
      .then((res) => res.json())
      .then((data) => {
        // optional: handle success message
        console.log("Language updated:", data.user.language);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="space-y-3">
      <select
        className="w-full p-2 rounded-md border border-purple-700/60 
                   bg-white/10 text-purple-900 font-bold 
                   focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={language}
        onChange={handleChange}
      >
        <option value="en" className="bg-purple-900 text-white">English</option>
        <option value="bn" className="bg-purple-900 text-white">Bengali</option>
        <option value="hi" className="bg-purple-900 text-white">Hindi</option>
      </select>
    </div>
  );
}

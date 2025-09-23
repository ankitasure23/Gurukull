import { useState } from "react";

export default function LanguagePreference() {
  const [language, setLanguage] = useState("en");

  return (
    <div className="space-y-3">
      <select
        className="w-full p-2 rounded-md border border-purple-700/60 
                   bg-white/10 text-purple-900 font-bold 
                   focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en" className="bg-purple-900 text-white">English</option>
        <option value="bn" className="bg-purple-900 text-white">Bengali</option>
        <option value="hi" className="bg-purple-900 text-white">Hindi</option>
      </select>
    </div>
  );
}

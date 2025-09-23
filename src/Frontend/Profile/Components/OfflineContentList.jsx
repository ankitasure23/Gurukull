import { useState } from "react";

export default function OfflineContentList() {
  const [downloads, setDownloads] = useState([
    { id: 1, title: "Math Quiz - Fractions" },
    { id: 2, title: "Science Video - Plants" },
    { id: 3, title: "English Quiz - Verbs"},
    { id: 4, title: "Social Studies Video - Climate"},
    { id: 5, title: "Moral Science - Moral Stories"},
  ]);

  const removeDownload = (id) =>
    setDownloads(downloads.filter((item) => item.id !== id));

  return (
    <div className="space-y-3">
      {downloads.length === 0 ? (
        <p className="text-gray-500">No downloads yet.</p>
      ) : (
        <ul className="space-y-2">
          {downloads.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <span>{item.title}</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeDownload(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
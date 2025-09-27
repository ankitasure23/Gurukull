import { useState, useEffect } from "react";

export default function OfflineContentList() {
  const [downloads, setDownloads] = useState([]);

  // Fetch offline content from backend on mount
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
        if (data.offlineContent) setDownloads(data.offlineContent);
      })
      .catch((err) => console.error(err));
  }, []);

  // Remove download both locally and on backend
  const removeDownload = (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`http://localhost:5000/api/profile/offline/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setDownloads(downloads.filter((item) => item._id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="space-y-3">
      {downloads.length === 0 ? (
        <p className="text-gray-500">No downloads yet.</p>
      ) : (
        <ul className="space-y-2">
          {downloads.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <span>{item.title}</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeDownload(item._id)}
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

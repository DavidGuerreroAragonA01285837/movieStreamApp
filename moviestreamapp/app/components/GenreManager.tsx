"use client";

import { useState, useEffect } from "react";

interface Genre {
  _id: string;
  genre_id: number;
  name: string;
}

export default function GenreManager() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [newGenreName, setNewGenreName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch genres
  const fetchGenres = async () => {
    try {
      const res = await fetch("/api/genres");
      const data = await res.json();
      setGenres(data);
    } catch (error) {
      setMessage("Error fetching genres");
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  // Create genre
  const handleCreate = async () => {
    if (!newGenreName.trim()) {
      setMessage("Genre name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/genres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newGenreName }),
      });

      if (res.ok) {
        setNewGenreName("");
        setMessage("Genre created successfully");
        await fetchGenres();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to create genre");
      }
    } catch (error) {
      setMessage("Error creating genre");
    } finally {
      setLoading(false);
    }
  };

  // Update genre
  const handleUpdate = async (id: string) => {
    if (!editingName.trim()) {
      setMessage("Genre name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/genres/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName }),
      });

      if (res.ok) {
        setEditingId(null);
        setEditingName("");
        setMessage("Genre updated successfully");
        await fetchGenres();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to update genre");
      }
    } catch (error) {
      setMessage("Error updating genre");
    } finally {
      setLoading(false);
    }
  };

  // Delete genre
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this genre?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/genres/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("Genre deleted successfully");
        await fetchGenres();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to delete genre");
      }
    } catch (error) {
      setMessage("Error deleting genre");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Section */}
      <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-lg mb-4 text-blue-900 dark:text-blue-100">
          Create New Genre
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newGenreName}
            onChange={(e) => setNewGenreName(e.target.value)}
            placeholder="Genre name..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            onKeyPress={(e) => e.key === "Enter" && handleCreate()}
          />
          <button
            onClick={handleCreate}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("Error")
              ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
              : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
          }`}
        >
          {message}
        </div>
      )}

      {/* Genres List */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Genres ({genres.length})</h3>
        {genres.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No genres found</p>
        ) : (
          <div className="space-y-2">
            {genres.map((genre) => (
              <div
                key={genre._id}
                className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                {editingId === genre._id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    autoFocus
                    className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                ) : (
                  <div>
                    <p className="font-medium text-black dark:text-white">
                      {genre.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {genre.genre_id}
                    </p>
                  </div>
                )}
                <div className="flex gap-2 ml-4">
                  {editingId === genre._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(genre._id)}
                        disabled={loading}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(genre._id);
                          setEditingName(genre.name);
                        }}
                        className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(genre._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

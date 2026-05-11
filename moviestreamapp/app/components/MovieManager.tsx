"use client";

import { useState, useEffect } from "react";

interface Genre {
  genre_id: number;
  name: string;
}

interface Movie {
  _id: string;
  movie_id: number;
  sku: string;
  title: string;
  genre: Genre[];
  list_price: number;
  views: number;
  summary: string;
}

interface AllGenres {
  _id: string;
  genre_id: number;
  name: string;
}

export default function MovieManager() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allGenres, setAllGenres] = useState<AllGenres[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    sku: "",
    title: "",
    list_price: 0,
    views: 0,
    summary: "",
    selectedGenres: [] as number[],
  });

  // Fetch movies and genres
  const fetchMovies = async () => {
    try {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      setMessage("Error fetching movies");
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await fetch("/api/genres");
      const data = await res.json();
      setAllGenres(data);
    } catch (error) {
      setMessage("Error fetching genres");
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  // Search movies
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset form
  const resetForm = () => {
    setFormData({
      sku: "",
      title: "",
      list_price: 0,
      views: 0,
      summary: "",
      selectedGenres: [],
    });
  };

  // Create movie
  const handleCreate = async () => {
    if (!formData.title.trim() || !formData.sku.trim()) {
      setMessage("Title and SKU are required");
      return;
    }

    setLoading(true);
    try {
      const selectedGenresObjects = allGenres
        .filter((g) => formData.selectedGenres.includes(g.genre_id))
        .map((g) => ({ genre_id: g.genre_id, name: g.name }));

      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          genre: selectedGenresObjects,
        }),
      });

      if (res.ok) {
        resetForm();
        setMessage("Movie created successfully");
        await fetchMovies();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to create movie");
      }
    } catch (error) {
      setMessage("Error creating movie");
    } finally {
      setLoading(false);
    }
  };

  // Edit movie
  const handleEditStart = (movie: Movie) => {
    setEditingId(movie._id);
    setFormData({
      sku: movie.sku,
      title: movie.title,
      list_price: movie.list_price,
      views: movie.views,
      summary: movie.summary,
      selectedGenres: movie.genre.map((g) => g.genre_id),
    });
  };

  // Update movie
  const handleUpdate = async (id: string) => {
    if (!formData.title.trim() || !formData.sku.trim()) {
      setMessage("Title and SKU are required");
      return;
    }

    setLoading(true);
    try {
      const selectedGenresObjects = allGenres
        .filter((g) => formData.selectedGenres.includes(g.genre_id))
        .map((g) => ({ genre_id: g.genre_id, name: g.name }));

      const res = await fetch(`/api/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          genre: selectedGenresObjects,
        }),
      });

      if (res.ok) {
        setEditingId(null);
        resetForm();
        setMessage("Movie updated successfully");
        await fetchMovies();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to update movie");
      }
    } catch (error) {
      setMessage("Error updating movie");
    } finally {
      setLoading(false);
    }
  };

  // Delete movie
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this movie?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/movies/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("Movie deleted successfully");
        await fetchMovies();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to delete movie");
      }
    } catch (error) {
      setMessage("Error deleting movie");
    } finally {
      setLoading(false);
    }
  };

  const toggleGenre = (genreId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedGenres: prev.selectedGenres.includes(genreId)
        ? prev.selectedGenres.filter((id) => id !== genreId)
        : [...prev.selectedGenres, genreId],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Create/Edit Section */}
      <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="font-semibold text-lg mb-4 text-green-900 dark:text-green-100">
          {editingId ? "Edit Movie" : "Create New Movie"}
        </h3>

        <div className="space-y-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Movie title..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          />

          <input
            type="text"
            value={formData.sku}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, sku: e.target.value }))
            }
            placeholder="SKU..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          />

          <textarea
            value={formData.summary}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, summary: e.target.value }))
            }
            placeholder="Summary..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              value={formData.list_price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  list_price: parseFloat(e.target.value) || 0,
                }))
              }
              placeholder="Price..."
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            <input
              type="number"
              value={formData.views}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  views: parseInt(e.target.value) || 0,
                }))
              }
              placeholder="Views..."
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          {/* Genres Selection */}
          <div>
            <label className="block text-sm font-medium mb-2 text-green-900 dark:text-green-100">
              Genres (Select at least one):
            </label>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((genre) => (
                <button
                  key={genre.genre_id}
                  onClick={() => toggleGenre(genre.genre_id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    formData.selectedGenres.includes(genre.genre_id)
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
            {formData.selectedGenres.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                No genres selected
              </p>
            )}
          </div>

          <div className="flex gap-2">
            {editingId ? (
              <>
                <button
                  onClick={() => handleUpdate(editingId)}
                  disabled={loading}
                  className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleCreate}
                disabled={loading}
                className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            )}
          </div>
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

      {/* Search Section */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies by title, SKU, or summary..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
        />
      </div>

      {/* Movies List */}
      <div>
        <h3 className="font-semibold text-lg mb-4">
          Movies ({filteredMovies.length})
        </h3>
        {filteredMovies.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No movies found</p>
        ) : (
          <div className="space-y-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie._id}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-black dark:text-white mb-1">
                      {movie.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      SKU: {movie.sku} | ID: {movie.movie_id}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {movie.summary}
                    </p>
                    <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Price:
                        </span>
                        <p className="font-medium text-black dark:text-white">
                          ${movie.list_price.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Views:
                        </span>
                        <p className="font-medium text-black dark:text-white">
                          {movie.views.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Genres:
                        </span>
                        <p className="font-medium text-black dark:text-white">
                          {movie.genre.length}
                        </p>
                      </div>
                    </div>

                    {/* Genres Display */}
                    {movie.genre.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {movie.genre.map((g) => (
                          <span
                            key={g.genre_id}
                            className="px-2 py-1 bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 rounded text-xs font-medium"
                          >
                            {g.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditStart(movie)}
                      className="px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import GenreManager from "./components/GenreManager";
import MovieManager from "./components/MovieManager";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"genres" | "movies">("movies");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            🎬 Movie Stream Database Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your movies and genres without authentication. Simple, direct database interaction.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-300 dark:border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab("movies")}
            className={`px-6 py-3 font-medium transition border-b-2 ${
              activeTab === "movies"
                ? "text-green-600 dark:text-green-400 border-green-600 dark:border-green-400"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            🎥 Movies
          </button>
          <button
            onClick={() => setActiveTab("genres")}
            className={`px-6 py-3 font-medium transition border-b-2 ${
              activeTab === "genres"
                ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            🏷️ Genres
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === "movies" && <MovieManager />}
          {activeTab === "genres" && <GenreManager />}
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-black dark:text-white mb-2">
            ℹ️ About This Interface
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>
              ✅ <strong>Genres:</strong> Create, read, update, delete genre records
            </li>
            <li>
              ✅ <strong>Movies:</strong> Manage movies with embedded genre relationships
            </li>
            <li>
              ✅ <strong>Relationships:</strong> See how genres are embedded in movies
            </li>
            <li>
              ℹ️ No authentication required. Edit your data directly and see your schema in action.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

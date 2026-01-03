"use client";

import { useState } from "react";

type GitHubUser = {
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
};

export default function GitHubSearch() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const res = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!res.ok) {
        // Handles 404, 403, etc.
        throw new Error("User not found");
      }

      const data: GitHubUser = await res.json();
      setUser(data);
    } catch (err) {
      setError("User not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        GitHub Profile Finder
      </h1>

      {/* SEARCH BAR */}
      <form onSubmit={handleSearch} className="mb-6 flex flex-col gap-4 justify-center">
        <input
          type="text"
          placeholder="Enter GitHub username"
          className="px-4 py-2 bg-white rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="bg-white text-black rounded py-2 cursor-pointer w-32">
            Search
        </button>
      </form>

      {/* LOADING STATE */}
      {loading && <p>Loading...</p>}

      {/* ERROR STATE */}
      {error && (
        <p className="text-red-400 font-medium">{error}</p>
      )}

      {/* SUCCESS STATE */}
      {user && (
        <div className="bg-white text-black p-6 rounded-lg w-80 text-center">
          <img
            src={user.avatar_url}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">
            {user.name || "No name"}
          </h2>
          <p className="text-gray-600">
            {user.bio || "No bio available"}
          </p>
          <p className="mt-4 font-medium">
            Followers: {user.followers}
          </p>
        </div>
      )}
    </div>
  );
}

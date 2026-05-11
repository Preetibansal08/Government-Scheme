import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroImage from "../assets/hero.png"; // Use correct relative path

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const handleSearch = () => {
    console.log("Search for:", search, "Category:", category);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="relative w-full h-[90vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Government Scheme Portal</h1>
          <p className="text-xl mb-6">
            Discover schemes tailored for you. Complete your profile to get personalized recommendations.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for schemes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-3 rounded-l-lg w-full focus:outline-none"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 rounded-r-lg border-l border-gray-300 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="employment">Employment</option>
            </select>
            <button
              onClick={handleSearch}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition text-white"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20">
        <Link
          to="/schemes"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-bold mb-2">Explore Schemes</h2>
          <p className="text-gray-600">Browse all government schemes available for citizens.</p>
        </Link>

        <Link
          to="/recommendations"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-bold mb-2">Get Recommendations</h2>
          <p className="text-gray-600">
            Receive schemes recommended based on your profile. Login to access personalized suggestions.
          </p>
        </Link>

        <Link
          to="/profile"
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
        >
          <h2 className="text-xl font-bold mb-2">Your Profile</h2>
          <p className="text-gray-600">Complete and manage your profile to get tailored recommendations.</p>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Government Scheme Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
import { useEffect, useState } from "react";
import API from "../api/api";

export default function SchemesPage() {
  const [schemes, setSchemes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all schemes
  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await API.get("/schemes");
      setSchemes(res.data.schemes);
      setMessage("");
    } catch (err) {
      setMessage("Error fetching schemes");
      setSchemes([]);
    }
    setLoading(false);
  };

  // Search schemes by keyword
  const searchSchemes = async () => {
    if (!keyword.trim()) return fetchSchemes();
    setLoading(true);
    try {
      const res = await API.get(`/schemes/search?keyword=${keyword}`);
      setSchemes(res.data.schemes);
      setMessage(res.data.schemes.length === 0 ? "No schemes found" : "");
    } catch (err) {
      setMessage("Error searching schemes");
      setSchemes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Government Schemes</h1>

        {/* Search bar */}
        <div className="flex gap-2 mb-6 justify-center">
          <input
            type="text"
            placeholder="Search schemes..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded-lg p-3 flex-1 max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={searchSchemes}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
          >
            Search
          </button>
        </div>

        {/* Loading & Messages */}
        {loading && <p className="text-center text-gray-500 mb-4">Loading schemes...</p>}
        {message && !loading && <p className="text-center text-red-500 mb-4">{message}</p>}

        {/* Schemes grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <h2 className="font-bold text-xl mb-2">{scheme.name}</h2>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-2">
                {scheme.category}
              </span>
              <p className="text-gray-600 mb-2">{scheme.description}</p>
              <p className="text-gray-700 mb-1">
                <strong>Benefits:</strong> {scheme.benefits}
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Amount:</strong> ₹{scheme.benefit_amount}
              </p>
              <a
                href={scheme.application_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition inline-block"
              >
                Apply Here
              </a>
            </div>
          ))}
        </div>

        {/* Empty state illustration */}
        {!loading && schemes.length === 0 && (
          <div className="text-center mt-10 text-gray-400">
            <p>No schemes available at the moment.</p>
            <img
              src="/src/assets/no-schemes.png"
              alt="No Schemes"
              className="mx-auto mt-4 w-48"
            />
          </div>
        )}
      </div>
    </div>
  );
}
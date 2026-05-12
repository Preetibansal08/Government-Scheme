import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function RecommendationsPage() {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const res = await API.get("/schemes/recommendations");
      if (res.data.success) {
        if (res.data.recommendations.length === 0) {
          setMessage("No recommendations yet. Complete your profile to get personalized scheme suggestions!");
        } else {
          setRecommendations(res.data.recommendations);
          setMessage("");
        }
      } else {
        setMessage(res.data.message || "Failed to fetch recommendations");
      }
    } catch (err) {
      console.error(err.response || err);
      setMessage(err.response?.data?.message || "Error fetching recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const filteredRecommendations = recommendations.filter(scheme => {
    if (filter === "all") return true;
    return scheme.category?.toLowerCase() === filter.toLowerCase();
  });

  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    if (sortBy === "amount") {
      return (b.benefit_amount || 0) - (a.benefit_amount || 0);
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "agriculture", label: "Agriculture" },
    { value: "education", label: "Education" },
    { value: "health", label: "Health" },
    { value: "employment", label: "Employment" },
    { value: "housing", label: "Housing" },
    { value: "women", label: "Women & Child" },
    { value: "senior", label: "Senior Citizens" },
  ];

  const getCategoryBadgeColor = (category) => {
    const colors = {
      Agriculture: "bg-green-100 text-green-700",
      Education: "bg-blue-100 text-blue-700",
      Health: "bg-red-100 text-red-700",
      Employment: "bg-purple-100 text-purple-700",
      Housing: "bg-orange-100 text-orange-700",
      "Women & Child": "bg-pink-100 text-pink-700",
      "Senior Citizens": "bg-gray-100 text-gray-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Recommended Schemes For You
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your profile, we've selected these government schemes that match your eligibility
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
        </div>

        {/* Profile Summary Card */}
        {user && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-8 border border-blue-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.full_name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.full_name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <Link
                to="/profile"
                className="px-4 py-2 bg-[#1a237e] text-white rounded-lg hover:bg-[#0d1757] transition text-sm"
              >
                Update Profile for Better Recommendations
              </Link>
            </div>
          </div>
        )}

        {/* Filters and Sort Section */}
        {recommendations.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setFilter(cat.value)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      filter === cat.value
                        ? "bg-[#1a237e] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a237e]"
                >
                  <option value="relevance">Relevance</option>
                  <option value="amount">Highest Amount</option>
                  <option value="name">Scheme Name</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a237e] mb-4"></div>
            <p className="text-gray-500">Finding best schemes for you...</p>
          </div>
        )}

        {/* Message State */}
        {message && !loading && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-yellow-800 font-semibold">{message}</p>
                <Link
                  to="/profile"
                  className="inline-block mt-2 text-[#1a237e] font-semibold hover:underline"
                >
                  Complete Your Profile →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Grid */}
        {!loading && !message && sortedRecommendations.length > 0 && (
          <>
            <div className="mb-4 text-right text-sm text-gray-500">
              Showing {sortedRecommendations.length} of {recommendations.length} recommendations
            </div>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {sortedRecommendations.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2"></div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(scheme.category)}`}>
                        {scheme.category || "General"}
                      </span>
                    </div>

                    <h2 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2">
                      {scheme.name}
                    </h2>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {scheme.description}
                    </p>

                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <p className="text-gray-700 text-sm">
                        <strong className="text-[#1a237e]">Benefits:</strong> {scheme.benefits}
                      </p>
                    </div>

                    {scheme.benefit_amount && (
                      <div className="flex items-center justify-between mb-4 p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-gray-600">Benefit Amount</span>
                        <span className="font-bold text-green-700 text-lg">
                          ₹{scheme.benefit_amount.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <a
                        href={scheme.application_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-gradient-to-r from-[#1a237e] to-[#283593] hover:from-[#0d1757] hover:to-[#1a237e] text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold"
                      >
                        Apply Now →
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(scheme.application_link);
                          alert("Application link copied to clipboard");
                        }}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                        title="Copy application link"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-3 text-xs text-gray-400 border-t pt-2">
                      <span>Based on your profile eligibility</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/schemes"
                className="inline-block px-6 py-3 bg-white border-2 border-[#1a237e] text-[#1a237e] rounded-lg hover:bg-[#1a237e] hover:text-white transition-all duration-300 font-semibold"
              >
                Browse All Government Schemes
              </Link>
            </div>
          </>
        )}

        {/* No Results State */}
        {!loading && !message && filteredRecommendations.length === 0 && recommendations.length > 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No schemes in this category</h3>
            <p className="text-gray-600">Try selecting a different category to see more recommendations</p>
            <button
              onClick={() => setFilter("all")}
              className="mt-4 px-4 py-2 bg-[#1a237e] text-white rounded-lg hover:bg-[#0d1757] transition"
            >
              View All Categories
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button for Profile */}
      {!user && (
        <Link
          to="/register"
          className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Register for Recommendations
        </Link>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

export default function SchemesPage() {
  const [schemes, setSchemes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const schemesPerPage = 9;

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

  // Filter by category
  const filteredSchemes = schemes.filter(scheme => {
    if (category === "all") return true;
    return scheme.category?.toLowerCase() === category.toLowerCase();
  });

  // Sort schemes
  const sortedSchemes = [...filteredSchemes].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "amount") {
      return (b.benefit_amount || 0) - (a.benefit_amount || 0);
    } else if (sortBy === "category") {
      return a.category?.localeCompare(b.category || "");
    }
    return 0;
  });

  // Pagination
  const indexOfLastScheme = currentPage * schemesPerPage;
  const indexOfFirstScheme = indexOfLastScheme - schemesPerPage;
  const currentSchemes = sortedSchemes.slice(indexOfFirstScheme, indexOfLastScheme);
  const totalPages = Math.ceil(sortedSchemes.length / schemesPerPage);

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchSchemes();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Government Schemes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through all available government schemes and find the ones that match your needs
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Schemes
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search by scheme name, benefits, or description..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent"
                />
                <button
                  onClick={searchSchemes}
                  className="bg-[#1a237e] hover:bg-[#0d1757] text-white px-6 py-3 rounded-lg transition shadow-md"
                >
                  <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      category === cat.value
                        ? "bg-[#1a237e] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a237e]"
              >
                <option value="name">Scheme Name</option>
                <option value="amount">Benefit Amount (High to Low)</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {!loading && sortedSchemes.length > 0 && (
          <div className="mb-4 text-right text-sm text-gray-500">
            Showing {indexOfFirstScheme + 1} to {Math.min(indexOfLastScheme, sortedSchemes.length)} of {sortedSchemes.length} schemes
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a237e] mb-4"></div>
            <p className="text-gray-500">Loading schemes...</p>
          </div>
        )}

        {/* Message State */}
        {message && !loading && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-yellow-800 font-semibold">{message}</p>
            </div>
          </div>
        )}

        {/* Schemes Grid */}
        {!loading && !message && currentSchemes.length > 0 && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {currentSchemes.map((scheme) => (
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
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !message && sortedSchemes.length > 0 && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg transition ${
                      currentPage === pageNum
                        ? "bg-[#1a237e] text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !message && schemes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No schemes available</h3>
            <p className="text-gray-600">Please check back later for new government schemes</p>
          </div>
        )}
      </div>
    </div>
  );
}
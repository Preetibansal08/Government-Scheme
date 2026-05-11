import { useEffect, useState } from "react";
import API from "../api/api";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const res = await API.get("/schemes/recommendations"); // GET request with token
      if (res.data.success) {
        if (res.data.recommendations.length === 0) {
          setMessage("No recommendations yet. Complete your profile!");
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-yellow-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Recommended Schemes for You
        </h1>

        {loading && <p className="text-center text-gray-500 mb-4">Loading recommendations...</p>}
        {message && !loading && <p className="text-center text-red-500 mb-4">{message}</p>}

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <h2 className="font-bold text-xl mb-2">{scheme.name}</h2>
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-2">
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
                className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition inline-block"
              >
                Apply Here
              </a>
            </div>
          ))}
        </div>

        {!loading && recommendations.length === 0 && (
          <div className="text-center mt-10 text-gray-400">
            <p>Complete your profile to get personalized recommendations.</p>
            <img
              src="/src/assets/no-recommendations.png"
              alt="No Recommendations"
              className="mx-auto mt-4 w-48"
            />
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function RegisterPage() {
  const { login } = useContext(AuthContext); // use login function
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/register", { email, password, full_name: fullName });

      // use AuthContext login function
      login(res.data.token, res.data.user);

      navigate("/profile"); // optional, login() can handle redirect
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="bg-white rounded-xl shadow-xl p-10 max-w-md w-full relative overflow-hidden">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 relative z-10">Create Account</h1>
        {error && <p className="text-red-500 mb-4 relative z-10">{error}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4 relative z-10">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            className="bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-lg shadow-md"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-gray-700 relative z-10">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer font-semibold hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
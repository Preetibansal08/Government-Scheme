import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center px-6 py-3 shadow-md">
      <div className="font-bold text-xl">
        <Link to="/">GovScheme Portal</Link>
      </div>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        {!user && <Link to="/schemes">Schemes</Link>}
        {user && <Link to="/recommendations">Recommendations</Link>}
        {user && <Link to="/profile">Profile</Link>}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}

        {user && (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSchemesDropdownOpen, setIsSchemesDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Top Bar - Government Style */}
      <div className="bg-[#1a237e] text-white text-xs py-1 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">🇮🇳</span>
            <span>भारत सरकार</span>
            <span>|</span>
            <span>Government of India</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-300 transition">Skip to main content</a>
            <a href="#" className="hover:text-yellow-300 transition">Screen Reader Access</a>
            <a href="#" className="hover:text-yellow-300 transition">हिन्दी</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3 py-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-xl">🇮🇳</span>
              </div>
              <Link to="/" className="flex flex-col">
                <span className="font-bold text-xl text-[#1a237e]">GovScheme Portal</span>
                <span className="text-xs text-gray-500 hidden sm:block">Government of India Initiative</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-[#1a237e] font-medium transition-colors"
              >
                Home
              </Link>

              {/* Schemes Dropdown */}
              <div className="relative group">
                <button 
                  className="text-gray-700 hover:text-[#1a237e] font-medium transition-colors flex items-center gap-1"
                >
                  Schemes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link to="/schemes" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1a237e]">
                      All Schemes
                    </Link>
                    <Link to="/schemes?category=agriculture" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1a237e]">
                      Agriculture
                    </Link>
                    <Link to="/schemes?category=education" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1a237e]">
                      Education
                    </Link>
                    <Link to="/schemes?category=health" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1a237e]">
                      Health
                    </Link>
                    <Link to="/schemes?category=employment" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1a237e]">
                      Employment
                    </Link>
                    <hr className="my-1" />
                    <Link to="/schemes?category=women" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1a237e]">
                      Women & Child
                    </Link>
                    <Link to="/schemes?category=senior" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#1a237e]">
                      Senior Citizens
                    </Link>
                  </div>
                </div>
              </div>

              {user && (
                <>
                  <Link 
                    to="/recommendations" 
                    className="text-gray-700 hover:text-[#1a237e] font-medium transition-colors"
                  >
                    Recommended
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-[#1a237e] font-medium transition-colors"
                  >
                    My Profile
                  </Link>
                </>
              )}

              <Link to="/about" className="text-gray-700 hover:text-[#1a237e] font-medium transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#1a237e] font-medium transition-colors">
                Contact
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-[#1a237e] border border-[#1a237e] rounded-lg hover:bg-[#1a237e] hover:text-white transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-[#1a237e] text-white rounded-lg hover:bg-[#0d1757] transition-all duration-300 shadow-md"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                    </div>
                    <span className="text-sm text-gray-700 hidden lg:block">
                      {user.full_name?.split(" ")[0] || user.email?.split("@")[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                
                <div>
                  <button
                    onClick={() => setIsSchemesDropdownOpen(!isSchemesDropdownOpen)}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg flex justify-between items-center"
                  >
                    Schemes
                    <svg className={`w-4 h-4 transition-transform ${isSchemesDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isSchemesDropdownOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      <Link to="/schemes" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                        All Schemes
                      </Link>
                      <Link to="/schemes?category=agriculture" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                        Agriculture
                      </Link>
                      <Link to="/schemes?category=education" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                        Education
                      </Link>
                      <Link to="/schemes?category=health" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                        Health
                      </Link>
                      <Link to="/schemes?category=employment" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                        Employment
                      </Link>
                    </div>
                  )}
                </div>

                {user && (
                  <>
                    <Link to="/recommendations" className="px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      Recommended
                    </Link>
                    <Link to="/profile" className="px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      My Profile
                    </Link>
                  </>
                )}

                <Link to="/about" className="px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
                <Link to="/contact" className="px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>

                <hr className="my-2" />

                {!user ? (
                  <div className="flex gap-3 px-3">
                    <Link to="/login" className="flex-1 text-center px-4 py-2 text-[#1a237e] border border-[#1a237e] rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      Login
                    </Link>
                    <Link to="/register" className="flex-1 text-center px-4 py-2 bg-[#1a237e] text-white rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="px-3">
                    <div className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.full_name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Small Auth Bar for Mobile (when logged out) */}
      {!user && (
        <div className="md:hidden bg-blue-50 py-2 px-4 text-center text-sm">
          <span className="text-gray-600">Get personalized scheme recommendations - </span>
          <Link to="/register" className="text-[#1a237e] font-semibold">Register Now</Link>
        </div>
      )}
    </>
  );
}
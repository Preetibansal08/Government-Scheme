import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroImage from "../assets/hero.png";
import API from "../api/api";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [featuredSchemes, setFeaturedSchemes] = useState([]);

  useEffect(() => {
    fetchFeaturedSchemes();
  }, []);

  const fetchFeaturedSchemes = async () => {
    try {
      const res = await API.get("/schemes?limit=6");
      setFeaturedSchemes(res.data.schemes || []);
    } catch (err) {
      setFeaturedSchemes([
        { id: 1, name: "Pradhan Mantri Kisan Samman Nidhi", category: "Agriculture", description: "Income support to farmers" },
        { id: 2, name: "Ayushman Bharat Scheme", category: "Health", description: "Health insurance for poor families" },
        { id: 3, name: "PM Awas Yojana", category: "Housing", description: "Housing for all" },
        { id: 4, name: "Beti Bachao Beti Padhao", category: "Education", description: "Save girl child, educate girl child" },
        { id: 5, name: "Startup India", category: "Employment", description: "Support for startups" },
        { id: 6, name: "Swachh Bharat Mission", category: "Sanitation", description: "Clean India mission" },
      ]);
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      window.location.href = `/schemes?search=${search}&category=${category}`;
    }
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      Agriculture: "bg-green-100 text-green-700",
      Health: "bg-red-100 text-red-700",
      Housing: "bg-orange-100 text-orange-700",
      Education: "bg-blue-100 text-blue-700",
      Employment: "bg-purple-100 text-purple-700",
      Sanitation: "bg-teal-100 text-teal-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-white to-green-500 z-20"></div>
        
        <div
          className="relative w-full h-[85vh] flex items-center justify-center text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${HeroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 text-white px-4 max-w-5xl">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-orange-500 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                Government of India Initiative
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeIn">
              Empowering Citizens Through{" "}
              <span className="text-orange-400">Government Schemes</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-3xl mx-auto">
              Discover, Apply, and Benefit from 1000+ Government Schemes designed for your welfare
            </p>

            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search schemes by name, category, or eligibility..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a237e] text-gray-900"
                  />
                </div>
                
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a237e] text-gray-900 bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="agriculture">Agriculture & Farming</option>
                  <option value="education">Education & Learning</option>
                  <option value="health">Health & Wellness</option>
                  <option value="employment">Employment & Jobs</option>
                  <option value="housing">Housing & Shelter</option>
                  <option value="women">Women & Child</option>
                  <option value="senior">Senior Citizens</option>
                </select>
                
                <button
                  onClick={handleSearch}
                  className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-white shadow-md flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="text-gray-500 text-sm">Popular:</span>
                <button onClick={() => setSearch("Farmer")} className="text-gray-500 text-sm hover:text-[#1a237e] transition">Farmer</button>
                <button onClick={() => setSearch("Education")} className="text-gray-500 text-sm hover:text-[#1a237e] transition">Education</button>
                <button onClick={() => setSearch("Health Insurance")} className="text-gray-500 text-sm hover:text-[#1a237e] transition">Health Insurance</button>
                <button onClick={() => setSearch("Housing Loan")} className="text-gray-500 text-sm hover:text-[#1a237e] transition">Housing Loan</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slideUp">
              <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
              <div className="text-sm opacity-90">Government Schemes</div>
            </div>
            <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
              <div className="text-3xl md:text-4xl font-bold mb-2">10 Crore+</div>
              <div className="text-sm opacity-90">Beneficiaries Served</div>
            </div>
            <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl md:text-4xl font-bold mb-2">28+</div>
              <div className="text-sm opacity-90">States & UTs Covered</div>
            </div>
            <div className="animate-slideUp" style={{ animationDelay: "0.3s" }}>
              <div className="text-3xl md:text-4xl font-bold mb-2">₹50,000 Cr+</div>
              <div className="text-sm opacity-90">Annual Budget Allocation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Schemes Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Government Schemes
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the most impactful schemes currently empowering millions of Indian citizens
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2"></div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{scheme.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryBadgeColor(scheme.category)}`}>
                    {scheme.category}
                  </span>
                  <p className="text-gray-600 mb-4">{scheme.description}</p>
                  <Link
                    to={`/schemes/${scheme.id}`}
                    className="inline-flex items-center text-[#1a237e] font-semibold hover:text-orange-500 transition group"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/schemes"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a237e] text-white rounded-lg hover:bg-[#0d1757] transition font-semibold shadow-md hover:shadow-xl"
            >
              View All Schemes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How to Get Started
            </h2>
            <p className="text-gray-600 text-lg">
              Three simple steps to access government schemes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Create Profile</h3>
              <p className="text-gray-600">Register and complete your profile with basic details</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Recommendations</h3>
              <p className="text-gray-600">Receive personalized scheme suggestions based on your profile</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Apply Online</h3>
              <p className="text-gray-600">Apply directly through our portal or get application guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/schemes"
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Explore All Schemes</h3>
              <p className="text-gray-600">Browse through 1000+ government schemes categorized by department and benefit</p>
            </Link>

            <Link
              to="/recommendations"
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Personalized Recommendations</h3>
              <p className="text-gray-600">Get schemes matched to your profile - age, income, occupation, and location</p>
            </Link>

            <Link
              to="/profile"
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Complete Your Profile</h3>
              <p className="text-gray-600">Fill your details to unlock personalized scheme recommendations</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Important Updates Section */}
      <div className="py-20 bg-[#fff8e1]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-orange-500"></div>
            <h2 className="text-2xl font-bold text-gray-800">Important Updates & Announcements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">PM Kisan 15th Installment Released</h3>
                  <p className="text-gray-600 text-sm">15th installment of ₹2000 released for eligible farmers</p>
                  <span className="text-xs text-gray-400 mt-2 inline-block">Posted: Dec 15, 2024</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Ayushman Bharat Card Registration Open</h3>
                  <p className="text-gray-600 text-sm">Free health insurance up to ₹5 lakhs for eligible families</p>
                  <span className="text-xs text-gray-400 mt-2 inline-block">Posted: Dec 10, 2024</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold mb-1">PM Scholarship Scheme 2024-25</h3>
                  <p className="text-gray-600 text-sm">Applications open for meritorious students</p>
                  <span className="text-xs text-gray-400 mt-2 inline-block">Posted: Dec 5, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Discover Schemes for You?
          </h2>
          <p className="text-white text-lg mb-8 opacity-90">
            Create your profile now and get personalized scheme recommendations
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-orange-600 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg transform hover:scale-105"
          >
            Register Now - It's Free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a237e] text-gray-300 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">About Portal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Feedback</a></li>
                <li><a href="#" className="hover:text-white transition">Sitemap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/schemes" className="hover:text-white transition">All Schemes</Link></li>
                <li><Link to="/recommendations" className="hover:text-white transition">Recommendations</Link></li>
                <li><Link to="/profile" className="hover:text-white transition">My Profile</Link></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Grievance Redressal</a></li>
                <li><a href="#" className="hover:text-white transition">RTI</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition">Facebook</a>
                <a href="#" className="hover:text-white transition">Twitter</a>
                <a href="#" className="hover:text-white transition">YouTube</a>
                <a href="#" className="hover:text-white transition">Email</a>
              </div>
              <p className="text-sm mt-4">Toll Free: 1800-XXX-XXXX</p>
              <p className="text-sm mt-2">help@govschemeportal.in</p>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-6 text-center text-sm">
            <p>© 2024 Government of India. All rights reserved. | Last Updated: December 2024</p>
            <p className="mt-2">Content owned & maintained by Ministry of Electronics & Information Technology</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from { 
            transform: translateY(30px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
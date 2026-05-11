import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    age: "",
    income: "",
    occupation: "",
    education_level: "",
    location_state: "",
    location_district: "",
    family_size: "",
    profile_image: null, // File
  });
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  // Predefined options to match scheme eligibility
  const occupationOptions = [
    "farmer",
    "agriculture worker",
    "entrepreneur",
    "business owner",
    "startup founder",
    "student",
    "others",
  ];

  const educationOptions = [
    "10th_pass",
    "12th_pass",
    "intermediate",
    "graduate",
    "postgraduate",
    "others",
  ];

  // Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile");
      const data = res.data.profile;

      setProfile({
        ...data,
        profile_image_preview: data.profile_image
          ? `http://localhost:3000/uploads/${data.profile_image}`
          : null,
      });

      setForm({
        age: data.age || "",
        income: data.income || "",
        occupation: data.occupation || "",
        education_level: data.education_level || "",
        location_state: data.location_state || "",
        location_district: data.location_district || "",
        family_size: data.family_size || "",
        profile_image: null,
      });
    } catch (err) {
      console.log("No profile yet");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, profile_image: e.target.files[0] });
      setProfile({
        ...profile,
        profile_image_preview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("age", Number(form.age));
    data.append("income", Number(form.income));
    data.append("occupation", form.occupation);
    data.append("education_level", form.education_level);
    data.append("location_state", form.location_state);
    data.append("location_district", form.location_district);
    data.append("family_size", Number(form.family_size));
    if (form.profile_image) data.append("profile_image", form.profile_image);

    try {
      const res = await API.post("/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const savedProfile = res.data.profile;
      setProfile({
        ...savedProfile,
        profile_image_preview: savedProfile.profile_image
          ? `http://localhost:3000/uploads/${savedProfile.profile_image}`
          : null,
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl flex max-w-5xl w-full overflow-hidden">
        {/* Left section - Profile card */}
        <div className="bg-gradient-to-b from-blue-500 to-purple-600 w-1/3 flex flex-col items-center justify-center p-6 text-white">
          <div
            className="relative w-32 h-32 mb-4 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={
                profile?.profile_image_preview ||
                "/src/assets/default-avatar.png"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <div className="absolute bottom-0 right-0 bg-white text-blue-600 rounded-full p-1 shadow-md">
              ✏️
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          <h2 className="text-xl font-bold">
            {user?.full_name || "Your Name"}
          </h2>
          <p className="mt-2 text-sm">{user?.email}</p>
          {profile && (
            <p className="mt-2 text-sm opacity-80">
              Location: {profile.location_state}, {profile.location_district}
            </p>
          )}
          {profile && (
            <p className="mt-2 text-sm opacity-80">
              Age: {profile.age} | Income: {profile.income} | Occupation:{" "}
              {profile.occupation} | Education: {profile.education_level} |
              Family: {profile.family_size}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 w-full">
            <button
              onClick={() => navigate("/schemes", { state: { profile } })}
              className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 rounded-lg shadow-md"
            >
              View All Schemes
            </button>
            <button
              onClick={() =>
                navigate("/recommendations", { state: { profile } })
              }
              className="w-full bg-purple-500 hover:bg-purple-600 transition text-white font-semibold py-2 rounded-lg shadow-md"
            >
              Recommended For Me
            </button>
          </div>
        </div>

        {/* Right section - Profile form */}
        <div className="w-2/3 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Update Your Profile
          </h1>
          {message && <p className="text-green-500 mb-4">{message}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Age */}
            <div className="col-span-1">
              <label className="block text-gray-700 font-semibold mb-1">
                Age
              </label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
            </div>

            {/* Income */}
            <div className="col-span-1">
              <label className="block text-gray-700 font-semibold mb-1">
                Income
              </label>
              <input
                type="number"
                value={form.income}
                onChange={(e) => setForm({ ...form, income: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
            </div>

            {/* Occupation */}
            <div className="col-span-1">
              <label className="block text-gray-700 font-semibold mb-1">
                Occupation
              </label>
              <select
                value={form.occupation}
                onChange={(e) =>
                  setForm({ ...form, occupation: e.target.value })
                }
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              >
                <option value="">Select Occupation</option>
                {occupationOptions.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            {/* Education Level */}
            <div className="col-span-1">
              <label className="block text-gray-700 font-semibold mb-1">
                Education Level
              </label>
              <select
                value={form.education_level}
                onChange={(e) =>
                  setForm({ ...form, education_level: e.target.value })
                }
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              >
                <option value="">Select Education</option>
                {educationOptions.map((edu) => (
                  <option key={edu} value={edu}>
                    {edu}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div className="col-span-1">
              <label className="block text-gray-700 font-semibold mb-1">
                State
              </label>
              <input
                type="text"
                value={form.location_state}
                onChange={(e) =>
                  setForm({ ...form, location_state: e.target.value })
                }
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
            </div>

            {/* District */}
            <div className="col-span-1">
              <label className="block text-gray-700 font-semibold mb-1">
                District
              </label>
              <input
                type="text"
                value={form.location_district}
                onChange={(e) =>
                  setForm({ ...form, location_district: e.target.value })
                }
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
            </div>

            {/* Family Size */}
            <div className="col-span-1">
              <label className="block text-gray-700 font-semibold mb-1">
                Family Size
              </label>
              <input
                type="number"
                value={form.family_size}
                onChange={(e) =>
                  setForm({ ...form, family_size: e.target.value })
                }
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-md w-full mt-4"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

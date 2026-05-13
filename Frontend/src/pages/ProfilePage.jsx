import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { speak as speakUtil, stopSpeech } from "../utils/speak.js";
import defaultAvatar from "../assets/default-avatar2.png";

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
    gender: "",
    profile_image: null,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [voiceLang, setVoiceLang] = useState("en-US");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const speechTimeoutRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const occupationOptions = [
    { en: "farmer", hi: "किसान" },
    { en: "agriculture worker", hi: "कृषि कार्यकर्ता" },
    { en: "entrepreneur", hi: "उद्यमी" },
    { en: "business owner", hi: "व्यवसायी" },
    { en: "startup founder", hi: "स्टार्टअप संस्थापक" },
    { en: "student", hi: "छात्र" },
    { en: "others", hi: "अन्य" },
  ];

  const educationOptions = [
    { en: "10th_pass", hi: "दसवीं पास" },
    { en: "12th_pass", hi: "बारहवीं पास" },
    { en: "intermediate", hi: "इंटरमीडिएट" },
    { en: "graduate", hi: "स्नातक" },
    { en: "postgraduate", hi: "स्नातकोत्तर" },
    { en: "others", hi: "अन्य" },
  ];

  const genderOptions = [
    { en: "male", hi: "पुरुष" },
    { en: "female", hi: "महिला" },
    { en: "other", hi: "अन्य" },
  ];

  const speak = (text, forceLang = null) => {
    if (!text) return;
    
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    
    setMessage(text);
    setMessageType("info");
    
    const langToUse = forceLang || voiceLang;
    speakUtil(text, langToUse);
    
    speechTimeoutRef.current = setTimeout(() => setMessage(""), 4000);
  };

  const speakInHindi = (hindiText) => {
    if (!hindiText) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    
    setMessage(hindiText);
    setMessageType("info");
    speakUtil(hindiText, "hi-IN");
    
    hoverTimeoutRef.current = setTimeout(() => setMessage(""), 4000);
  };

  const showSuccessMessage = (text) => {
    setMessage(text);
    setMessageType("success");
    setTimeout(() => setMessage(""), 4000);
  };

  const getMessage = (key) => {
    const messages = {
      welcome: {
        "en-US": "Welcome to your profile! Fill in your details to get personalized scheme recommendations.",
        "hi-IN": "अपने प्रोफ़ाइल में आपका स्वागत है! व्यक्तिगत योजनाओं की सिफारिश पाने के लिए विवरण भरें।",
      },
      age: { "en-US": "Please enter your age", "hi-IN": "कृपया अपनी आयु दर्ज करें" },
      income: { "en-US": "Please enter your monthly income", "hi-IN": "कृपया अपनी मासिक आय दर्ज करें" },
      occupation: { "en-US": "Please select your occupation", "hi-IN": "कृपया अपना पेशा चुनें" },
      education: { "en-US": "Please select your highest education", "hi-IN": "कृपया अपनी उच्चतम शिक्षा चुनें" },
      state: { "en-US": "Please enter your state", "hi-IN": "कृपया अपना राज्य दर्ज करें" },
      district: { "en-US": "Please enter your district", "hi-IN": "कृपया अपना जिला दर्ज करें" },
      family: { "en-US": "Please enter your family size", "hi-IN": "कृपया अपने परिवार का आकार दर्ज करें" },
      gender: { "en-US": "Please select your gender", "hi-IN": "कृपया अपना लिंग चुनें" },
      profileSaved: { "en-US": "Your profile has been updated successfully!", "hi-IN": "आपकी प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई है!" },
      viewSchemes: { "en-US": "You can see all schemes here. Explore to find suitable ones for you!", "hi-IN": "आप यहाँ सभी योजनाएँ देख सकते हैं। आपके लिए उपयुक्त योजनाओं का पता लगाएँ!" },
      recommendations: { "en-US": "Just saved your profile! You can see all recommended schemes suitable for you.", "hi-IN": "आपकी प्रोफ़ाइल अभी-अभी सहेजी गई है! आप यहाँ आपके लिए सुझाई गई योजनाएँ देख सकते हैं।" },
    };
    return messages[key][voiceLang] || messages[key]["en-US"];
  };

  const speakWelcome = () => {
    const welcomeMsg = getMessage("welcome");
    speak(welcomeMsg, voiceLang);
  };

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
        gender: data.gender || "",
        profile_image: null,
      });

      if (data.age) setIsEditing(false);

      setTimeout(() => {
        speakWelcome();
      }, 500);
    } catch (err) {
      console.log("No profile yet");
      setIsEditing(true);
      setTimeout(() => {
        speakWelcome();
      }, 500);
    }
  };

  useEffect(() => {
    fetchProfile();
    
    return () => {
      stopSpeech();
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (profile !== null || true) {
      stopSpeech();
      setTimeout(() => {
        speakWelcome();
      }, 100);
    }
  }, [voiceLang]);

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
    data.append("gender", form.gender);
    if (form.profile_image) data.append("profile_image", form.profile_image);

    try {
      const res = await API.post("/profile", data, { headers: { "Content-Type": "multipart/form-data" } });
      const savedProfile = res.data.profile;
      setProfile({
        ...savedProfile,
        profile_image_preview: savedProfile.profile_image
          ? `http://localhost:3000/uploads/${savedProfile.profile_image}`
          : null,
      });

      showSuccessMessage(getMessage("profileSaved"));
      speak(getMessage("profileSaved"), voiceLang);
      setIsEditing(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating profile");
      setMessageType("error");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  const handleNavigate = (path, customMessage) => {
    if (customMessage) speak(customMessage, voiceLang);
    navigate(path, { state: { profile } });
  };

  const testVoice = () => {
    const testMsg = voiceLang === "en-US" 
      ? "Testing voice in English" 
      : "हिंदी में आवाज़ का परीक्षण";
    speak(testMsg, voiceLang);
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 8;
    if (form.age) completed++;
    if (form.income) completed++;
    if (form.occupation) completed++;
    if (form.education_level) completed++;
    if (form.location_state) completed++;
    if (form.location_district) completed++;
    if (form.family_size) completed++;
    if (form.gender) completed++;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar - Indian Government Style */}
      <div className="bg-[#1a237e] text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>भारत सरकार</span>
            <span>|</span>
            <span>Government of India</span>
          </div>
          <div className="flex gap-4">
            <span>My Profile</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your personal information and preferences
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
        </div>

        {/* Notification Message */}
        {message && (
          <div className={`fixed top-20 right-5 p-4 rounded-lg shadow-lg z-50 animate-slideIn ${
            messageType === "success" ? "bg-green-500 text-white" :
            messageType === "error" ? "bg-red-500 text-white" :
            "bg-blue-500 text-white"
          }`}>
            <div className="flex items-center gap-2">
              {messageType === "success" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {messageType === "error" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              {messageType === "info" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2"></div>
              
              <div className="p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 cursor-pointer group" onClick={() => fileInputRef.current.click()}>
                  <img
                    src={profile?.profile_image_preview || defaultAvatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />

                <h2 className="text-xl font-bold text-gray-800">{user?.full_name || "Your Name"}</h2>
                <p className="text-gray-500 text-sm mt-1">{user?.email}</p>

                {/* Profile Completion */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Profile Completion</span>
                    <span className="font-semibold text-[#1a237e]">{getCompletionPercentage()}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getCompletionPercentage()}%` }}
                    ></div>
                  </div>
                </div>

                {/* Profile Info */}
                {profile && profile.age && (
                  <div className="mt-6 text-left space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Location:</span>
                      <span className="text-gray-700">{profile.location_state}, {profile.location_district}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Age:</span>
                      <span className="text-gray-700">{profile.age} years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Income:</span>
                      <span className="text-gray-700">₹{profile.income}/month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Occupation:</span>
                      <span className="text-gray-700">{profile.occupation}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Education:</span>
                      <span className="text-gray-700">{profile.education_level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Gender:</span>
                      <span className="text-gray-700">{profile.gender}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Family Size:</span>
                      <span className="text-gray-700">{profile.family_size} members</span>
                    </div>
                  </div>
                )}

                {/* Language and Voice */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <select 
                    value={voiceLang} 
                    onChange={(e) => setVoiceLang(e.target.value)} 
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]"
                  >
                    <option value="en-US">English</option>
                    <option value="hi-IN">हिन्दी</option>
                  </select>
                  
                  <button
                    type="button"
                    onClick={testVoice}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-sm flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    Test
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button 
                    onClick={() => handleNavigate("/schemes", getMessage("viewSchemes"))} 
                    className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 rounded-lg shadow-md flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    View All Schemes
                  </button>
                  <button 
                    onClick={() => handleNavigate("/recommendations", getMessage("recommendations"))} 
                    className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-lg shadow-md flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Recommended For Me
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] px-6 py-5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Update Profile Information</h2>
                    <p className="text-blue-100 text-sm mt-1">Fill in your details to get personalized scheme recommendations</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-5 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-white transition-all duration-200 font-medium"
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                </div>
              </div>

              <div className="p-6">
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Age *</label>
                        <input 
                          type="number" 
                          value={form.age} 
                          onChange={(e) => setForm({ ...form, age: e.target.value })} 
                          onFocus={() => speak(getMessage("age"), voiceLang)} 
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition" 
                          placeholder="Enter your age"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Monthly Income (₹) *</label>
                        <input 
                          type="number" 
                          value={form.income} 
                          onChange={(e) => setForm({ ...form, income: e.target.value })} 
                          onFocus={() => speak(getMessage("income"), voiceLang)} 
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition" 
                          placeholder="Enter monthly income"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Occupation *</label>
                        <select 
                          value={form.occupation} 
                          onChange={(e) => setForm({ ...form, occupation: e.target.value })} 
                          onFocus={() => speak(getMessage("occupation"), voiceLang)}
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition"
                          required
                        >
                          <option value="">Select Occupation</option>
                          {occupationOptions.map((opt) => (
                            <option 
                              key={opt.en} 
                              value={opt.en}
                              onMouseEnter={() => speakInHindi(opt.hi)}
                            >
                              {opt.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Education Level *</label>
                        <select 
                          value={form.education_level} 
                          onChange={(e) => setForm({ ...form, education_level: e.target.value })} 
                          onFocus={() => speak(getMessage("education"), voiceLang)}
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition"
                          required
                        >
                          <option value="">Select Education</option>
                          {educationOptions.map((opt) => (
                            <option 
                              key={opt.en} 
                              value={opt.en}
                              onMouseEnter={() => speakInHindi(opt.hi)}
                            >
                              {opt.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Gender *</label>
                        <select 
                          value={form.gender} 
                          onChange={(e) => setForm({ ...form, gender: e.target.value })} 
                          onFocus={() => speak(getMessage("gender"), voiceLang)}
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition"
                          required
                        >
                          <option value="">Select Gender</option>
                          {genderOptions.map((opt) => (
                            <option 
                              key={opt.en} 
                              value={opt.en}
                              onMouseEnter={() => speakInHindi(opt.hi)}
                            >
                              {opt.en.charAt(0).toUpperCase() + opt.en.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">State *</label>
                        <input 
                          type="text" 
                          value={form.location_state} 
                          onChange={(e) => setForm({ ...form, location_state: e.target.value })} 
                          onFocus={() => speak(getMessage("state"), voiceLang)} 
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition" 
                          placeholder="Enter your state"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">District *</label>
                        <input 
                          type="text" 
                          value={form.location_district} 
                          onChange={(e) => setForm({ ...form, location_district: e.target.value })} 
                          onFocus={() => speak(getMessage("district"), voiceLang)} 
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition" 
                          placeholder="Enter your district"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Family Size *</label>
                        <input 
                          type="number" 
                          value={form.family_size} 
                          onChange={(e) => setForm({ ...form, family_size: e.target.value })} 
                          onFocus={() => speak(getMessage("family"), voiceLang)} 
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition" 
                          placeholder="Number of family members"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button type="submit" className="flex-1 bg-gradient-to-r from-[#1a237e] to-[#283593] hover:from-[#0d1757] hover:to-[#1a237e] text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md">
                        Save Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Profile Information Yet</h3>
                    <p className="text-gray-500 mb-6">Click "Edit Profile" to add your details and get personalized scheme recommendations</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 bg-gradient-to-r from-[#1a237e] to-[#283593] text-white rounded-lg hover:from-[#0d1757] hover:to-[#1a237e] transition-all duration-300 font-medium"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tips Card */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-800">Why complete your profile?</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Accurate profile information helps us match you with relevant government schemes and provides personalized recommendations based on your eligibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
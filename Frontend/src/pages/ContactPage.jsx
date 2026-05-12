import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (API call)
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-2xl shadow-lg mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions? We're here to help you with scheme discovery and application assistance
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2"></div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                
                {/* Office Address */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Visit Us</h3>
                      <p className="text-gray-600 text-sm">
                        Ministry of Electronics & IT<br />
                        Electronics Niketan, 6 CGO Complex,<br />
                        Lodhi Road, New Delhi - 110003
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Call Us</h3>
                      <p className="text-gray-600 text-sm">Toll Free: 1800-XXX-XXXX</p>
                      <p className="text-gray-600 text-sm">Phone: 011-2436XXXX</p>
                      <p className="text-gray-600 text-sm">Working Hours: 9:00 AM - 5:30 PM (Mon-Fri)</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email Us</h3>
                      <p className="text-gray-600 text-sm">help@govschemeportal.in</p>
                      <p className="text-gray-600 text-sm">support@meity.gov.in</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition">
                      <span className="text-blue-600 text-sm">FB</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition">
                      <span className="text-blue-600 text-sm">TW</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition">
                      <span className="text-red-600 text-sm">YT</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center hover:bg-purple-200 transition">
                      <span className="text-purple-600 text-sm">IG</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] px-6 py-5">
                <h2 className="text-xl font-bold text-white">Send us a Message</h2>
                <p className="text-blue-100 text-sm mt-1">We'll get back to you within 2-3 business days</p>
              </div>

              <div className="p-6">
                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-700">Thank you for contacting us! We'll respond shortly.</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition resize-none"
                      placeholder="Please describe your query in detail..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#1a237e] to-[#283593] hover:from-[#0d1757] hover:to-[#1a237e] text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-6 bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-700 text-sm">Q: How do I find schemes I'm eligible for?</p>
                  <p className="text-gray-500 text-sm mt-1">A: Complete your profile with accurate information and visit the Recommendations page for personalized scheme suggestions.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 text-sm">Q: Is this portal free to use?</p>
                  <p className="text-gray-500 text-sm mt-1">A: Yes, this is a completely free Government of India initiative for citizens.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 text-sm">Q: How do I apply for a scheme?</p>
                  <p className="text-gray-500 text-sm mt-1">A: Click the "Apply Here" button on any scheme card to visit the official application portal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
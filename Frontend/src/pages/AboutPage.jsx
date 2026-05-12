import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const schemes = [
    {
      category: "Pension & Retirement",
      schemes: [
        { name: "Employees' Pension Scheme", description: "Retirement security for employees covered under EPF Act" },
        { name: "Indira Gandhi National Old Age Pension Scheme", description: "Financial assistance for elderly (60+) below BPL" },
        { name: "Indira Gandhi National Disability Pension Scheme", description: "Pension support for Divyangjans aged 18+ from BPL families" },
        { name: "Indira Gandhi National Widow Pension Scheme", description: "Social security for widows from below poverty line families" }
      ]
    },
    {
      category: "Disability & Elderly Care",
      schemes: [
        { name: "Gharaunda - Group Home for Adults Scheme", description: "Residential care for adults with disabilities" },
        { name: "Garima Greh Shelter Homes for Transgender Persons", description: "Shelter for destitute and abandoned transgender persons" },
        { name: "Financial Assistance to Destitute Elderly and Disabled", description: "Monthly aid for elderly (60+) and severely disabled persons" }
      ]
    },
    {
      category: "Education & Employment",
      schemes: [
        { name: "Financial Assistance For Purchase Of Stationery", description: "Support for SC/ST/OBC/Minorities students for stationery" },
        { name: "Handloom Rebate Scheme", description: "Special rebates for handloom cooperatives during festivals" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-2xl shadow-lg mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Government Scheme Portal
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Empowering citizens through accessible and transparent government welfare schemes
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h2>
            <p className="text-gray-600">
              To bridge the gap between government welfare schemes and citizens by providing a 
              single, accessible platform that simplifies discovery, eligibility checking, and 
              application for various central and state government schemes.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Our Vision</h2>
            <p className="text-gray-600">
              A digitally empowered India where every eligible citizen can easily discover, access, 
              and benefit from government welfare schemes without information barriers or complex processes.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Smart Search</h3>
              <p className="text-gray-500 text-sm">Find schemes by name, category, or eligibility criteria</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Personalized Recommendations</h3>
              <p className="text-gray-500 text-sm">Get schemes matched to your profile and eligibility</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Direct Application</h3>
              <p className="text-gray-500 text-sm">Apply directly through official scheme portals</p>
            </div>
          </div>
        </div>

        {/* Schemes Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Schemes We Cover</h2>
          
          {schemes.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-xl font-semibold text-[#1a237e] mb-4 border-l-4 border-orange-500 pl-3">
                {section.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.schemes.map((scheme, schemeIdx) => (
                  <div key={schemeIdx} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition border border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-1">{scheme.name}</h4>
                    <p className="text-gray-500 text-sm">{scheme.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-[#1a237e] to-[#283593] rounded-2xl p-8 mb-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">1000+</div>
              <div className="text-sm opacity-90">Schemes Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">10 Cr+</div>
              <div className="text-sm opacity-90">Beneficiaries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">28+</div>
              <div className="text-sm opacity-90">States Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-sm opacity-90">Categories</div>
            </div>
          </div>
        </div>

        {/* Contact & Support */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Need Help?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-2">
                For assistance with scheme discovery or application process, please reach out to our support team.
              </p>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Toll Free: 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>help@govschemeportal.in</span>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <Link
                to="/contact"
                className="px-6 py-2 bg-[#1a237e] text-white rounded-lg hover:bg-[#0d1757] transition"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-xs text-gray-400 border-t pt-6">
          <p>This portal is a Government of India initiative under the Ministry of Electronics & Information Technology</p>
          <p className="mt-1">Information provided is based on official scheme documents. Please verify details on official portals before applying.</p>
        </div>
      </div>
    </div>
  );
}
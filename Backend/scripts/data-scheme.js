const sequelize = require('../src/config/database');
const Scheme = require('../src/models/Scheme');

const schemes = [
    {
        scheme_code: "PM-KISAN-001",
        name: "PM Kisan Samman Nidhi",
        description: "Income support scheme for small and marginal farmers",
        category: "Agriculture",
        eligibility_criteria: {
            min_age: 18,
            max_income: 200000,
            eligible_occupations: ["farmer", "agriculture worker"]
        },
        benefits: "₹6000 per year in three equal installments",
        benefit_amount: 6000,
        official_website: "https://pmkisan.gov.in",
        application_link: "https://pmkisan.gov.in/RegistrationForm.aspx",
        guidelines_link: "https://pmkisan.gov.in/Documents/Guidelines.pdf",
        documents_required: [
            "Aadhar Card",
            "Land Records",
            "Bank Account Details",
            "Passport Size Photo"
        ],
        helpline_number: "155261",
        helpline_email: "pmkisan-mp@gov.in",
        application_process: "Online application through PM-KISAN portal or CSC centers",
        contact_department: "Ministry of Agriculture"
    },
    {
        scheme_code: "PM-AWAS-002",
        name: "PM Awas Yojana (Urban)",
        description: "Housing scheme for urban poor",
        category: "Housing",
        eligibility_criteria: {
            max_income: 300000,
            no_house: true,
            min_age: 18
        },
        benefits: "₹2.67 lakh subsidy for house construction",
        benefit_amount: 267000,
        official_website: "https://pmaymis.gov.in",
        application_link: "https://pmaymis.gov.in/AppForm.aspx",
        guidelines_link: "https://pmaymis.gov.in/PDF/PMay_Guidelines.pdf",
        documents_required: [
            "Aadhar Card",
            "Income Certificate",
            "Bank Account",
            "Ration Card",
            "Passport Size Photo"
        ],
        helpline_number: "1800116446",
        helpline_email: "support-pmay@gov.in",
        application_process: "Apply online through PMAY portal or Common Service Centers",
        application_deadline: "2025-12-31",
        contact_department: "Ministry of Housing and Urban Affairs"
    },
    {
        scheme_code: "NSP-003",
        name: "National Scholarship Portal",
        description: "Scholarship for meritorious students from economically weaker sections",
        category: "Education",
        eligibility_criteria: {
            max_income: 250000,
            min_education: "12th_pass",
            min_age: 16,
            max_age: 25
        },
        benefits: "Scholarship up to ₹50,000 per year",
        benefit_amount: 50000,
        official_website: "https://scholarships.gov.in",
        application_link: "https://scholarships.gov.in/student/login",
        guidelines_link: "https://scholarships.gov.in/guidelines",
        documents_required: [
            "Aadhar Card",
            "Income Certificate",
            "Previous Year Marksheet",
            "Bank Account Details",
            "Caste Certificate (if applicable)"
        ],
        helpline_number: "0120-6619540",
        helpline_email: "helpdesk@nsp.gov.in",
        application_process: "Online application through National Scholarship Portal",
        application_deadline: "2025-10-31",
        contact_department: "Ministry of Education"
    },
    {
        scheme_code: "STARTUP-004",
        name: "Startup India Scheme",
        description: "Funding and support for startups",
        category: "Business",
        eligibility_criteria: {
            max_age: 35,
            eligible_occupations: ["entrepreneur", "business owner", "startup founder"]
        },
        benefits: "Funding up to ₹10 lakh, tax benefits",
        benefit_amount: 1000000,
        official_website: "https://www.startupindia.gov.in",
        application_link: "https://www.startupindia.gov.in/registration",
        guidelines_link: "https://www.startupindia.gov.in/content/dam/invest-india/Startup%20India%20Action%20Plan.pdf",
        documents_required: [
            "Business Plan",
            "Incorporation Certificate",
            "PAN Card",
            "Bank Account",
            "Director Details"
        ],
        helpline_number: "1800115566",
        helpline_email: "support@startupindia.gov.in",
        application_process: "Register on Startup India portal, submit documents for recognition",
        contact_department: "Department for Promotion of Industry and Internal Trade"
    },
    {
        scheme_code: "AYUSHMAN-005",
        name: "Ayushman Bharat Yojana",
        description: "Health insurance for poor families",
        category: "Healthcare",
        eligibility_criteria: {
            max_income: 200000,
            family_size: { min: 1 }
        },
        benefits: "Health cover up to ₹5 lakh per family",
        benefit_amount: 500000,
        official_website: "https://pmjay.gov.in",
        application_link: "https://pmjay.gov.in/register",
        guidelines_link: "https://pmjay.gov.in/sites/default/files/2019-06/AB_PMJAY_Guidelines.pdf",
        documents_required: [
            "Aadhar Card",
            "Ration Card",
            "Income Certificate",
            "Family Member Details"
        ],
        helpline_number: "14555",
        helpline_email: "support@pmjay.gov.in",
        application_process: "Check eligibility at nearest empaneled hospital or CSC",
        contact_department: "Ministry of Health and Family Welfare"
    }
];

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to database\n');
        
        let addedCount = 0;
        let existingCount = 0;
        
        for (const scheme of schemes) {
            const [created, instance] = await Scheme.findOrCreate({
                where: { scheme_code: scheme.scheme_code },
                defaults: scheme
            });
            
            if (created) {
                addedCount++;
                console.log(`  Added: ${scheme.name}`);
                console.log(`  Category: ${scheme.category}`);
                console.log(`  Website: ${scheme.official_website}`);
                console.log(`  Helpline: ${scheme.helpline_number}`);
                console.log('   ---');
            } else {
                existingCount++;
                console.log(` Already exists: ${scheme.name}`);
            }
        }
        
        console.log('\nSEEDING COMPLETE');
        console.log('========================================');
        console.log(`✅ New schemes added: ${addedCount}`);
        console.log(`📌 Existing schemes: ${existingCount}`);
        console.log(`📋 Total schemes in database: ${schemes.length}`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
}

seed();
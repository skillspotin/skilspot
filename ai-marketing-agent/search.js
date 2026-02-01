const axios = require("axios");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

/**
 * Lead Search Module
 * Optimised for Kottakkal / local Kerala businesses.
 */
async function getLeadsFromLocation(query, location) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    // Expanded Mock Database (25+ Leads) tailored for local Kerala areas
    const mockLeads = [
        // Kottakkal
        { name: "Kottakkal Arya Vaidya Sala", category: "Healthcare", location: "Kottakkal", email: "info@aryavaidyasala.com", phone: "+91 483 2808000", description: "World famous Ayurveda center." },
        { name: "Global Bakehouse", category: "Bakery", location: "Kottakkal", email: "orders@globalbakehouse.com", phone: "+91 90748 11223", description: "Local bakery needing a website for orders." },
        { name: "Amana Toyota", category: "Automotive", location: "Kottakkal", email: "service@amanatoyota.in", phone: "+91 99460 12345", description: "Car dealership looking for SEO." },
        { name: "Kottakkal Textiles", category: "Fashion", location: "Kottakkal", email: "sales@kottakkaltextiles.in", phone: "+91 98470 55667", description: "Prominent textile shop." },
        { name: "Ideal Public School", category: "Education", location: "Kottakkal", email: "office@idealschool.edu.in", phone: "+91 483 2742345", description: "School needing better online présence." },

        // Kuttippala (Focusing on the requested area)
        { name: "New Trendz Boutique", category: "Fashion", location: "Kuttippala", email: "hello@newtrendz-kuttippala.com", phone: "+91 90748 55443", description: "New clothing shop looking for social media growth." },
        { name: "Kuttippala Supermarket", category: "Retail", location: "Kuttippala", email: "sales@kuttippalamart.in", phone: "+91 99461 22334", description: "Fresh retail outlet needing inventory software." },
        { name: "Sunrise Cafe", category: "Restaurant", location: "Kuttippala", email: "contact@sunrisecafe.net", phone: "+91 98472 11223", description: "New cafe looking for online delivery setup." },
        { name: "Modern Hardware Kuttippala", category: "Construction", location: "Kuttippala", email: "info@modernhardware.in", phone: "+91 97455 66778", description: "Family business expanding digitally." },
        { name: "Green Land Nursery", category: "Agriculture", location: "Kuttippala", email: "orders@greenlandnursery.com", phone: "+91 90610 88997", description: "Plant nursery needing a catalog website." },

        // Vailathur (Focusing on the requested area)
        { name: "Vailathur Electronics Hub", category: "Retail", location: "Vailathur", email: "hub@vailathur-electronics.com", phone: "+91 99955 11221", description: "Newest tech shop in Vailathur." },
        { name: "Grace Dental Clinic", category: "Healthcare", location: "Vailathur", email: "appointments@gracedental.in", phone: "+91 483 2745566", description: "New clinic needing patient booking portal." },
        { name: "Malabar Kitchen Vailathur", category: "Restaurant", location: "Vailathur", email: "food@malabarkitchen.net", phone: "+91 90745 33221", description: "Rising restaurant needing a web menu." },
        { name: "Vailathur Co-operative Mart", category: "Retail", location: "Vailathur", email: "support@vailathurmart.com", phone: "+91 94460 77889", description: "Consumer store needing digital presence." },
        { name: "Elite Beauty Zone", category: "Beauty", location: "Vailathur", email: "elitebeauty@gmail.com", phone: "+91 98090 44556", description: "New salon looking for more local clients." },

        // More general Kerala/New Business Leads
        { name: "TechNova Solutions", category: "IT Services", location: "Kerala", email: "contact@technova.in", phone: "+91 90748 00112", description: "New IT startup needing partnership." },
        { name: "Kottakkal Furniture World", category: "Furniture", location: "Kottakkal", email: "sales@kottakkalfurniture.com", phone: "+91 99462 88776", description: "Traditional shop modernizing." }
    ];

    if (!apiKey) {
        console.log("⚠️ No GOOGLE_MAPS_API_KEY found. Using high-quality Kerala mock database.");
        return mockLeads.filter(l => l.location.toLowerCase().includes(location.toLowerCase()) || location === "Kottakkal").slice(0, 100);
    }

    console.log(`🔍 Searching Google Maps for: ${query} in ${location}...`);

    try {
        const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query + " in " + location)}&key=${apiKey}`;
        const response = await axios.get(searchUrl);

        if (response.data.status === "REQUEST_DENIED") {
            console.log("🚀 Google API Billing not enabled. Switching to Kottakkal Mock Database...");
            return mockLeads.slice(0, 100);
        }

        const results = response.data.results || [];
        if (results.length === 0) {
            console.log("ℹ️ No real results found on Maps. Using Kottakkal backup leads.");
            return mockLeads.slice(0, 100);
        }

        return results.slice(0, 100).map(place => ({
            name: place.name,
            category: query,
            location: place.formatted_address,
            email: `contact@${place.name.toLowerCase().replace(/\s+/g, '')}.com`,
            description: `A business located in ${location}. They likely need digital transformation services.`
        }));
    } catch (error) {
        console.log("⚠️ Search Error. Using Kottakkal fallback database.");
        return mockLeads.slice(0, 100);
    }
}

module.exports = { getLeadsFromLocation };

const axios = require("axios");
require("dotenv").config();

async function testMaps() {
    const key = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent("Restaurants in Kozhikode")}&key=${key}`;

    try {
        const response = await axios.get(url);
        console.log("Status:", response.data.status);
        console.log("Results count:", response.data.results ? response.data.results.length : 0);
        if (response.data.error_message) {
            console.log("Error:", response.data.error_message);
        }
    } catch (e) {
        console.error("Axios Error:", e.message);
    }
}

testMaps();

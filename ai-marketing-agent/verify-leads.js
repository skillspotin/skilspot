const { getLeadsFromLocation } = require("./search");
const { isEmailValid } = require("./mail");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

async function getValidLeads(location) {
    const leads = await getLeadsFromLocation("New Businesses", location);
    const validLeads = [];

    for (const lead of leads) {
        const isValid = await isEmailValid(lead.email);
        if (isValid) {
            validLeads.push(lead);
        }
    }
    return validLeads;
}

async function run() {
    const kLeads = await getValidLeads("Kuttippala");
    const vLeads = await getValidLeads("Vailathur");

    console.log("--- VALID LEADS TO BE CONTACTED ---");
    [...kLeads, ...vLeads].forEach((l, i) => {
        console.log(`${i + 1}. ${l.name} (${l.email}) - ${l.location}`);
    });
}

run();

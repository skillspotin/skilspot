const { getLeadsFromLocation } = require("./search");
const { analyzeAndGeneratePitch } = require("./analyze");
const { sendOutreachEmail, isEmailValid } = require("./mail");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const LOG_FILE = path.join(__dirname, "campaign_report.log");
const JS_LOG_FILE = path.join(__dirname, "campaign-data.js");

// Initialize JS log file if it doesn't exist
if (!fs.existsSync(JS_LOG_FILE)) {
    fs.writeFileSync(JS_LOG_FILE, "window.CAMPAIGN_LOGS = [];");
}

function logCampaign(message, dataValue = null) {
    const timestamp = new Date().toLocaleString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, logEntry);
    console.log(message);

    // Determine if we should save to JS data file
    const isData = (typeof dataValue === 'boolean' && dataValue === true) || (typeof dataValue === 'object' && dataValue !== null);
    const dataFields = typeof dataValue === 'object' && dataValue !== null ? dataValue : {};

    if (isData) {
        try {
            let content = fs.readFileSync(JS_LOG_FILE, "utf8");
            let logs = [];
            if (content.includes("window.CAMPAIGN_LOGS = ")) {
                const jsonStr = content.replace("window.CAMPAIGN_LOGS = ", "").replace(";", "");
                logs = JSON.parse(jsonStr || "[]");
            }
            logs.unshift({
                timestamp,
                message,
                ...dataFields
            });
            // Keep only last 100 logs for performance
            if (logs.length > 100) logs = logs.slice(0, 100);
            fs.writeFileSync(JS_LOG_FILE, `window.CAMPAIGN_LOGS = ${JSON.stringify(logs, null, 2)};`);
        } catch (e) {
            console.error("Failed to update JS log:", e);
        }
    }
}

const cron = require("node-cron");

const SENT_HISTORY_FILE = path.join(__dirname, "sent_emails.json");

// Initialize sent history if it doesn't exist
if (!fs.existsSync(SENT_HISTORY_FILE)) {
    fs.writeFileSync(SENT_HISTORY_FILE, JSON.stringify([], null, 2));
}

function getSentHistory() {
    try {
        const data = fs.readFileSync(SENT_HISTORY_FILE, "utf8");
        const parsed = JSON.parse(data || "[]");
        // Migration: If old history was just a list of strings, convert to objects
        if (parsed.length > 0 && typeof parsed[0] === 'string') {
            return parsed.map(email => ({ email, lastSent: "2026-01-30" }));
        }
        return parsed;
    } catch (e) {
        return [];
    }
}

function addToSentHistory(email) {
    const history = getSentHistory();
    const today = new Date().toISOString().split('T')[0];

    const index = history.findIndex(h => h.email === email);
    if (index !== -1) {
        history[index].lastSent = today;
    } else {
        history.push({ email, lastSent: today });
    }
    fs.writeFileSync(SENT_HISTORY_FILE, JSON.stringify(history, null, 2));
}

async function runMarketingCampaign(query, location) {
    logCampaign("-----------------------------------------");
    logCampaign(`🚀 Starting AI Marketing Agent for: ${query} in ${location}`);
    logCampaign("-----------------------------------------");

    try {
        // 1. Discovery Phase
        const leads = await getLeadsFromLocation(query, location);
        logCampaign(`✅ Found ${leads.length} potential leads.`, true);

        const sentHistory = getSentHistory();

        for (const lead of leads) {
            const today = new Date().toISOString().split('T')[0];
            const alreadySent = sentHistory.find(h => h.email === lead.email);

            // 1. Strict Duplicate Check (Prevent same-day resending)
            if (alreadySent && alreadySent.lastSent === today) {
                logCampaign(`⏭️ Skipping ${lead.name} (${lead.email}): Already contacted TODAY.`, {
                    email: lead.email,
                    type: 'SKIPPED_DUPLICATE_TODAY'
                });
                continue;
            }

            // 2. Global History Check (Optional: skip if ever sent, or keep as is for re-runs)
            // If you want to allow resending after X days, change logic here. 
            // For now, we allow resending on different days, but block same-day.

            logCampaign(`Processing: ${lead.name}`, true);

            // 1.5 Validation Phase (Pre-Check to save API costs)
            logCampaign(`  - Verifying email: ${lead.email}...`);
            const isValid = await isEmailValid(lead.email);

            if (!isValid) {
                logCampaign(`⚠️ Skipping ${lead.name}: Invalid or Non-existent email (${lead.email})`, {
                    email: lead.email,
                    type: 'SKIPPED_INVALID'
                });
                continue; // Move to next lead
            }

            // 2. Analysis Phase (AI Gemini)
            logCampaign(`  - Analyzing ${lead.name} with Gemini AI...`);
            const pitch = await analyzeAndGeneratePitch(lead);

            logCampaign(`  - Pitch Generated: "${pitch.subject}"`, true);

            // 3. Outreach Phase (Nodemailer)
            logCampaign(`  - Sending automated email to: ${lead.email}...`);
            const success = await sendOutreachEmail(lead.email, pitch);

            if (success) {
                addToSentHistory(lead.email);
                logCampaign(`✅ Successfully contacted ${lead.name}`, {
                    email: lead.email,
                    phone: lead.phone || 'N/A',
                    type: 'SUCCESS'
                });
            } else {
                logCampaign(`❌ Failed to send email to ${lead.name}`, {
                    email: lead.email,
                    phone: lead.phone || 'N/A',
                    type: 'FAILED'
                });
            }

            // Wait 30 seconds between emails to look human and avoid spam blocks
            logCampaign("  ⌛ Cooling down for 30 seconds...");
            await new Promise(resolve => setTimeout(resolve, 30000));
        }

        logCampaign("\n-----------------------------------------");
        logCampaign("🎯 Marketing Campaign Completed!");
        logCampaign("-----------------------------------------");

    } catch (error) {
        logCampaign(`Critical Campaign Error: ${error.message}`);
    }
}

// Check for --daily flag
if (process.argv.includes("--daily")) {
    console.log("⏰ AI Marketing Agent is now in DAILY MODE.");
    console.log("It will run every morning at 9:00 AM.");

    // Schedule: Minute Hour DayOfMonth Month DayOfWeek
    cron.schedule("0 9 * * *", () => {
        const categories = ["Schools", "Hospitals", "Retailers", "Real Estate"];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        runMarketingCampaign(randomCategory, "Kottakkal");
    });
} else {
    // Normal single-run mode
    const query = process.argv[2] || "Traditional & Modern Businesses";
    const location = process.argv[3] || "Kottakkal";
    runMarketingCampaign(query, location);
}

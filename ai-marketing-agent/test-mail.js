const { analyzeAndGeneratePitch } = require("./analyze");
const { sendOutreachEmail } = require("./mail");
require("dotenv").config();

async function sendDemoMail() {
    console.log("🚀 Starting Demo AI Mail Test...");

    const demoLead = {
        name: "Haris Ali P",
        category: "Tech Entrepreneur",
        location: "Kerala",
        description: "Founder of SkillSpot.in, interested in scaling business using AI and automated marketing."
    };

    try {
        console.log("1. Generating AI Pitch with Gemini...");
        const pitch = await analyzeAndGeneratePitch(demoLead);
        console.log(`   ✅ Pitch Generated: "${pitch.subject}"`);

        console.log(`2. Sending Demo Email to: harisalisg@gmail.com...`);
        // We send to the user's own email for testing
        const success = await sendOutreachEmail("harisalisg@gmail.com", pitch);

        if (success) {
            console.log("\n✨ SUCCESS! Check your inbox at harisalisg@gmail.com");
            console.log("The email has also been logged in campaign_report.log");
        } else {
            console.log("\n❌ FAILED to send email. Check your .env credentials.");
        }
    } catch (error) {
        console.error("Test Error:", error);
    }
}

sendDemoMail();

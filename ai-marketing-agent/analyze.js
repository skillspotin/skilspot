const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Analyzes a business and generates a personalized marketing pitch using Gemini AI.
 */
async function analyzeAndGeneratePitch(businessInfo) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        Context: You are Antigravity, an AI growth strategist for SkillSpotin Digital Solutions.
        SkillSpotin is launching the "Digital Kerala Initiative" specifically for businesses in the ${businessInfo.location} area.
        
        Our Star Offer: 
        A Professional Single-Page Business Website for just ₹2,999 (Includes Domain & Hosting). 
        This is a high-volume, low-cost entry product designed to help local businesses get online instantly.
        
        SkillSpotin also provides:
        1. Performance Marketing: Ad campaigns (Meta, Google) for ROI.
        2. Business Automation: ERP systems & Shop Management Web Apps.
        3. Interactive Service Robots: For hospitals, hotels, and schools.
        
        Target Business:
        Name: ${businessInfo.name}
        Category: ${businessInfo.category}
        Location: ${businessInfo.location}
        
        Task:
        1. Lead with the "Digital Kerala Initiative" and the ₹2,999 website offer.
        2. Specifically address them as a "Forward-thinking" or "Newly established" business (even if you're not 100% sure, frame it as growth-focused).
        3. Mention that for modern shops, we build specialized Web Apps that help with inventory, ordering, and customer management.
        4. Explain how this small investment of ₹2,999 can significantly increase their visibility in the ${businessInfo.location} market.
        5. Keep the tone warm, professional, and locally focused. Mention that Haris Ali P is helping businesses in their specific area. Address the recipient as "Hi [Business Name] team," or similar.
        4. Crucial: The email should sound like a personal outreach from a local growth strategist, not a generic robot.
        5. Limit email to 150 words. Use simple, effective language.
        
        Mandatory Signature:
        ---
        Best Regards,
        Haris Ali P
        Growth Strategist | SkillSpotin Digital Solutions
        📞 WhatsApp: +91 9074854599
        🌐 Website: https://skillspot.in

        Format your response as a JSON object:
        {
            "subject": "Email Subject Line",
            "body": "Email Body Text",
            "perceived_value": "Brief summary of why this pitch works"
        }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up the response if it contains markdown code blocks
        let cleanedText = text.replace(/```json|```/g, "").trim();

        // Find first { and last } to handle potential text outside JSON
        const firstBrace = cleanedText.indexOf('{');
        const lastBrace = cleanedText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
        }

        return JSON.parse(cleanedText);

    } catch (error) {
        console.error("AI Analysis Error:", error);
        return {
            subject: `Digital Kerala Initiative: Growth Partnership for ${businessInfo.name}`,
            body: `Hi ${businessInfo.name} team,\n\nI'm Haris Ali P from SkillSpotin. We are launching a "Digital Kerala Initiative" in ${businessInfo.location} to help local businesses grow online.\n\nWe are offering professional business websites for just ₹2,999 (including domain and hosting) for a limited time. I'd love to help your business transition to the digital space.\n\nBest Regards,\nHaris Ali P\nSkillSpotin Digital Solutions\nWhatsApp: +91 9074854599`,
            perceived_value: "Standard fallback pitch"
        };
    }
}

module.exports = { analyzeAndGeneratePitch };

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
        SkillSpotin is launching the "SkillSpot 360 AI & Automation Strategy" specifically for businesses in the ${businessInfo.location} area.
        
        Our Star Offer: 
        1. AI-Powered Business Website: A modern, lightning-fast site for just ₹4,999 (Includes Domain & Hosting).
        2. Business Automation: Custom Dashboards & Shop Management Systems to track inventory and sales.
        3. AI Marketing: Using Gemini AI to target the right customers in ${businessInfo.location}.
        4. Interactive Service Robots: For hospitals, hotels, and schools to automate repetitive tasks.
        
        Target Business:
        Name: ${businessInfo.name}
        Category: ${businessInfo.category}
        Location: ${businessInfo.location}
        
        Task:
        1. Lead with the "SkillSpot 360 Strategy" – focusing on modernizing their business with AI.
        2. Specifically address how they can outpace competitors in ${businessInfo.location} by using data and automation.
        3. Mention the ₹4,999 AI website if they don't have a modern one, but prioritize automation/AI growth.
        4. Keep the tone warm, professional, and results-driven. Mention that Haris Ali P is local and can collaborate directly.
        5. Limit email to 150 words. Use simple, effective language.
        
        Mandatory Signature:
        ---
        Best Regards,
        Haris Ali P
        Founder & Strategist | SkillSpotin Digital Solutions
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
            subject: `Growth Strategy for ${businessInfo.name} in ${businessInfo.location}`,
            body: `Hi ${businessInfo.name} team,\n\nI'm Haris Ali P from SkillSpotin. We are helping businesses in ${businessInfo.location} implement AI-driven growth strategies and automated management systems.\n\nFrom smart websites to custom inventory apps, we help you save time and scale your profits. I'd love to discuss a 360 transformation for your business.\n\nBest Regards,\nHaris Ali P\nSkillSpotin Digital Solutions\nWhatsApp: +91 9074854599`,
            perceived_value: "Standard fallback pitch"
        };
    }
}

module.exports = { analyzeAndGeneratePitch };

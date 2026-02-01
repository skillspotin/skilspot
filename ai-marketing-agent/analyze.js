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
        Context: You are Haris Ali P, founder of SkillSpotin Digital Solutions.
        We are running a "Digital Express Launch" for local businesses in ${businessInfo.location}.
        
        Our High-Impact Offer: 
        A Professional Business Website for just ₹2,999 (Everything included: Domain, Hosting, SSL, and Mobile-Friendly Design).
        
        Why we are doing this:
        To help 100 local businesses in ${businessInfo.location} get online this month. This is a limited-time "Zero-Hassle" package.
        
        SkillSpotin also provides:
        - Google Maps/SEO Optimization (to show up when people search for ${businessInfo.category}).
        - WhatsApp Business Integration (so customers can chat with you instantly).
        - Business Automation (for bigger shops and hospitals).
        
        Target Business:
        Name: ${businessInfo.name}
        Category: ${businessInfo.category}
        Location: ${businessInfo.location}
        
        Task:
        1. Lead with the "Digital Express Launch" ₹2,999 offer.
        2. Explain how ${businessInfo.name} can benefit from having a professional site (e.g., getting more customers in ${businessInfo.location}).
        3. Make it sound urgent but professional. "Getting your business online should cost less than a pair of shoes."
        4. Focus on the value: Domain + Hosting + Website all for ₹2,999 one-time.
        5. Limit email to 120 words. Simple English. No corporate jargon.
        
        Mandatory Signature:
        ---
        Best Regards,
        Haris Ali P
        Founder | SkillSpotin Digital Solutions
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
            subject: `Website Launch for ${businessInfo.name} - Special ₹2,999 Offer`,
            body: `Hi ${businessInfo.name}, \n\nI'm Haris from SkillSpotin. We're helping 100 businesses in ${businessInfo.location} get online with a full professional website for just ₹2,999 (includes domain and hosting).\n\n I noticed your business doesn't have a modern landing page yet, and I'd love to set this up for you this week. Would you like to see a demo?\n\nBest Regards,\nHaris Ali P\nSkillSpotin\nWhatsApp: +91 9074854599`,
            perceived_value: "Standard fallback pitch"
        };
    }
}

module.exports = { analyzeAndGeneratePitch };

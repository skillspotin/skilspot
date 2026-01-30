const nodemailer = require("nodemailer");
const dns = require("dns").promises;
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

/**
 * Validates email existence by checking MX records of the domain
 */
async function isEmailValid(email) {
    if (!email || !email.includes('@')) return false;

    // 1. Basic syntax check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    const domain = email.split('@')[1].toLowerCase();

    // 2. Blacklisted/Common fake domains (optional but good)
    const blacklist = ['example.com', 'test.com', 'mailinator.com'];
    if (blacklist.includes(domain)) return false;

    try {
        // 3. DNS MX Check
        let mxRecords = [];
        try {
            mxRecords = await dns.resolveMx(domain);
        } catch (e) {
            // If domain doesn't exist at all, this will throw
            if (e.code === 'ENOTFOUND') return false;
        }

        // Ensure records exist and at least one has a valid exchange
        // (Handles "." or empty exchanges which mean "No Mail Service")
        const hasValidMx = mxRecords && mxRecords.length > 0 && mxRecords.some(r =>
            r.exchange &&
            r.exchange.length > 0 &&
            r.exchange !== '.' &&
            r.exchange !== '0.0.0.0'
        );

        if (hasValidMx) return true;

        // If MX records were found but none were valid, it's a domain that doesn't accept mail
        if (mxRecords && mxRecords.length > 0) return false;

        // 4. Fallback: Check A record ONLY if MX records are missing
        const aRecords = await dns.resolve(domain, 'A').catch(() => []);
        return aRecords && aRecords.length > 0;

    } catch (error) {
        console.warn(`⚠️ Validation Failed for ${domain}: ${error.code}`);
        return false;
    }
}

async function sendOutreachEmail(targetEmail, pitch) {
    // 1. Pre-Check Email Validity
    const isValid = await isEmailValid(targetEmail);
    if (!isValid) {
        console.log(`❌ Invalid or Non-existent email: ${targetEmail}. Aborting send.`);
        return false;
    }

    // 2. Create transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        // Professional HTML Email Template
        const htmlContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 35px 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 26px; letter-spacing: 1px; font-weight: 800;">Business Growth Proposal</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Curated by SkillSpotin Digital Solutions</p>
                </div>
                
                <div style="padding: 40px 30px; background: #ffffff;">
                    <div style="font-size: 16px; color: #444;">
                        ${pitch.body.replace(/\n/g, '<br>')}
                    </div>
                </div>
                
                <div style="padding: 30px; background: #f8fafc; border-top: 1px solid #edf2f7;">
                    <p style="margin: 0 0 15px; font-weight: bold; color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Best Regards,</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 800; color: #6366f1;">Haris Ali P</p>
                    <p style="margin: 4px 0 20px; color: #64748b; font-size: 14px; font-weight: 500;">Growth Strategist | SkillSpotin Digital Solutions</p>
                    
                    <div style="display: grid; gap: 10px; font-size: 14px;">
                        <div style="margin-bottom: 8px;">
                            <span style="color: #6366f1; font-weight: bold; margin-right: 10px;">🌐 Website:</span> 
                            <a href="https://skillspot.in" style="color: #6366f1; text-decoration: none; font-weight: 600;">skillspot.in</a>
                        </div>
                        <div style="margin-bottom: 8px;">
                            <span style="color: #6366f1; font-weight: bold; margin-right: 10px;">📞 WhatsApp:</span> 
                            <a href="https://wa.me/919074854599" style="color: #6366f1; text-decoration: none; font-weight: 600;">+91 9074854599</a>
                        </div>
                        <div style="margin-bottom: 8px;">
                            <span style="color: #6366f1; font-weight: bold; margin-right: 10px;">📧 Email:</span> 
                            <a href="mailto:skillspot.in@gmail.com" style="color: #6366f1; text-decoration: none; font-weight: 600;">skillspot.in@gmail.com</a>
                        </div>
                    </div>
                    
                    <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; font-style: italic;">
                        📍 Connect with us for Digital Services & Professional Courses.
                    </div>
                </div>
                
                <div style="background: #0f172a; padding: 20px; text-align: center;">
                    <p style="color: #64748b; font-size: 11px; margin: 0;">&copy; 2026 SkillSpotin Digital Solutions. Empowering Business Growth.</p>
                </div>
            </div>
        `;

        const info = await transporter.sendMail({
            from: `"SkillSpotin Growth Team" <${process.env.EMAIL_USER}>`,
            to: targetEmail,
            bcc: ["skillspot.in@gmail.com", process.env.EMAIL_USER],
            subject: pitch.subject,
            html: htmlContent,
            attachments: pitch.subject.toLowerCase().includes('robot') ? [
                {
                    filename: 'robot-showcase.jpg',
                    path: 'c:/Users/hp/Pictures/skilspot-master/images/robot-1.jpg'
                }
            ] : []
        });

        console.log("Email sent successfully: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Email Sending Error:", error);
        return false;
    }
}

module.exports = { sendOutreachEmail, isEmailValid };

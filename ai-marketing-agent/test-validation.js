const { sendOutreachEmail } = require("./mail.js");

async function verifyValidation() {
    console.log("🧪 Testing Email Verification System...");

    const pitch = {
        subject: "Verification Test",
        body: "Checking if validation works."
    };

    console.log("\n--- Case 1: Real Domain (gmail.com) ---");
    await sendOutreachEmail("test@gmail.com", pitch);

    console.log("\n--- Case 2: Fake Domain (thisisafakedomain12345.com) ---");
    await sendOutreachEmail("someone@thisisafakedomain12345.com", pitch);

    console.log("\n--- Case 3: Bad Format (not-an-email) ---");
    await sendOutreachEmail("not-an-email", pitch);
}

verifyValidation();

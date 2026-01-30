# SkillSpot AI Marketing Agent 🤖

This automated agent finds business leads, analyzes their specific needs using **Google Gemini AI**, and sends personalized marketing proposals via email.

## 🛠 Setup Instructions

1.  **Enter the Directory**:
    ```bash
    cd ai-marketing-agent
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure API Keys**:
    *   Rename `.env.example` to `.env`.
    *   Add your **Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/)).
    *   Add your **SMTP Settings** (If using Gmail, generate an "App Password").

4.  **Run the Agent**:
    ```bash
    node index.js "Schools" "Kerala"
    ```

## 📂 Project Structure

*   `index.js`: The orchestrator that runs the campaign.
*   `search.js`: Discovery module (currently mock data, expandable to Google Places API).
*   `analyze.js`: Uses **Gemini AI** to research the business and write the "Hook".
*   `mail.js`: Handles automated delivery via **Nodemailer**.

## 🚀 Future Upgrades
*   Connect to **Google Places API** for real-time lead discovery.
*   Add a CSV export for all leads found.
*   Track email open rates using tracking pixels.

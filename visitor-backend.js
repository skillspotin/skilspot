/**
 * SkillSpot Visitor Logging Backend
 * Run this with: node visitor-backend.js
 * 
 * This script creates a local server that receives visitor data 
 * from the browser and saves it to a permanent JSON file.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const LOG_FILE = path.join(__dirname, 'visitor-logs-db.json');

// Initialize log file if it doesn't exist
if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify([], null, 2));
}

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/api/log-visitor') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const newData = JSON.parse(body);
                console.log(`[${new Date().toISOString()}] New visitor from ${newData.ip} (${newData.city})`);

                // Read existing logs
                const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));

                // Add new entry
                logs.unshift(newData);

                // Keep last 5000 logs
                const trimmedLogs = logs.slice(0, 5000);

                // Save back to file
                fs.writeFileSync(LOG_FILE, JSON.stringify(trimmedLogs, null, 2));

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'success' }));
            } catch (error) {
                console.error('Error processing log:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'error', message: error.message }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/api/get-logs') {
        // Allow the admin panel to fetch logs from the server
        try {
            const logs = fs.readFileSync(LOG_FILE, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(logs);
        } catch (error) {
            res.writeHead(500);
            res.end('Error reading logs');
        }
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`SkillSpot Visitor Backend is running!`);
    console.log(`Listening on: http://localhost:${PORT}`);
    console.log(`Logs will be saved to: ${LOG_FILE}`);
    console.log(`========================================`);
});

import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(__dirname));

const feedbackRateLimit = new Map();

app.post('/api/feedback', async (req, res) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const lastSubmit = feedbackRateLimit.get(clientIP) || 0;
    
    if (now - lastSubmit < 60000) {
        return res.status(429).json({ error: 'Please wait before submitting again' });
    }
    
    const { message, type, username, timestamp } = req.body;
    
    if (!message || typeof message !== 'string' || message.length > 1000) {
        return res.status(400).json({ error: 'Invalid message' });
    }
    
    const sanitize = (str) => {
        if (typeof str !== 'string') return '';
        return str.replace(/[<>&"'`]/g, (c) => ({
            '<': '&lt;', '>': '&gt;', '&': '&amp;', 
            '"': '&quot;', "'": '&#39;', '`': '&#96;'
        }[c])).substring(0, 200);
    };
    
    const safeMessage = sanitize(message);
    const safeUsername = sanitize(username || 'Anonymous');
    const safeType = ['feedback', 'comment', 'bug'].includes(type) ? type : 'feedback';
    
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
        return res.status(500).json({ error: 'Webhook not configured' });
    }
    
    try {
        const embed = {
            title: safeType === 'comment' ? 'New Game Comment' : 'New Feedback',
            color: safeType === 'comment' ? 0x6366f1 : 0x22c55e,
            fields: [
                { name: 'User', value: safeUsername, inline: true },
                { name: 'Type', value: safeType, inline: true },
                { name: 'Message', value: safeMessage.substring(0, 1000) }
            ],
            timestamp: new Date().toISOString(),
            footer: { text: "Shindo's Hub" }
        };
        
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });
        
        feedbackRateLimit.set(clientIP, now);
        res.json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Failed to send' });
    }
});

const server = createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Shindo's Hub running on http://0.0.0.0:${PORT}`);
});

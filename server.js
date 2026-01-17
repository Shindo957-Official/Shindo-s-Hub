import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.get('/proxy/:url', async (req, res) => {
    const targetUrl = decodeURIComponent(req.params.url);
    
    try {
        new URL(targetUrl);
        
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            }
        });
        
        const contentType = response.headers.get('content-type') || 'text/html';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        if (contentType.includes('text/html')) {
            let html = await response.text();
            const baseUrl = new URL(targetUrl);
            const base = `<base href="${baseUrl.origin}/">`;
            html = html.replace(/<head>/i, `<head>${base}`);
            res.send(html);
        } else {
            const buffer = await response.arrayBuffer();
            res.send(Buffer.from(buffer));
        }
    } catch (err) {
        console.error('Proxy error:', err.message);
        res.status(500).send(`
            <html>
            <head><title>Proxy Error</title></head>
            <body style="background:#1a1a2e;color:#fff;font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;">
                <div style="text-align:center;">
                    <h1>Could not load page</h1>
                    <p style="color:#888;">${err.message}</p>
                    <a href="/apps/youtube/" style="color:#e94560;">Go back</a>
                </div>
            </body>
            </html>
        `);
    }
});

app.use(express.static(__dirname));

const server = createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Shindo's Hub running on http://0.0.0.0:${PORT}`);
});

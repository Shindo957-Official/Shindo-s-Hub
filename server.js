import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.static(__dirname));

const server = createServer(app);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Shindo's Hub running on http://0.0.0.0:${PORT}`);
});

import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
import wisp from 'wisp-server-node';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const epoxyPath = join(dirname(require.resolve('@mercuryworkshop/epoxy-transport')), '..');

const app = express();
const PORT = 5000;

app.use(express.static(__dirname));

app.use('/uv/', express.static(uvPath));
app.use('/epoxy/', express.static(join(epoxyPath, 'dist')));
app.use('/baremux/', express.static(baremuxPath));

const server = createServer(app);

server.on('upgrade', (req, socket, head) => {
    if (req.url.endsWith('/wisp/')) {
        wisp.routeRequest(req, socket, head);
    } else {
        socket.end();
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Shindo's Hub running on http://0.0.0.0:${PORT}`);
    console.log('Ultraviolet proxy enabled');
});

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 5000;

const INVIDIOUS_URL = 'https://invidious.nerdvpn.de';

app.use('/proxy', createProxyMiddleware({
    target: INVIDIOUS_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/proxy': ''
    },
    onProxyRes: function(proxyRes, req, res) {
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
        proxyRes.headers['access-control-allow-origin'] = '*';
    },
    onProxyReq: function(proxyReq, req, res) {
        proxyReq.setHeader('Accept-Encoding', 'identity');
    }
}));

app.use(express.static('.'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});

require('dotenv/config');
const path = require('path');
const cors = require('cors');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * @type {Redis.Redis}
 */

const app = express();
const port = process.env.PORT || 3000;

// Import routes
const { indexRoutes } = require('./routes/index');
const { animeRoutes } = require('./routes/anime');
const { watchRoutes } = require('./routes/watch');
const { searchRoutes } = require('./routes/search');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRoutes);
app.use('/anime', animeRoutes);
app.use('/watch', watchRoutes);
app.use('/search', searchRoutes);
app.get('/test', (req, res) => {
    res.render('test');
});

// app.get('/health', async (req, res) => {
//     res.json({ test: true });
// });

const createDynamicProxy = (req, res, next) => {
    const targetUrl = req.query.targetUrl;

    if (!targetUrl) {
        return res.status(400).send('targetUrl parameter is required');
    }

    try {
        const url = new URL(targetUrl);
        const baseUrl = `${url.protocol}//${url.host}`;

        const proxy = createProxyMiddleware({
            target: baseUrl,
            changeOrigin: true,
            pathRewrite: () => url.pathname + url.search,

            // Add headers to request (client -> target server)
            onProxyReq: (proxyReq, req) => {
                proxyReq.setHeader('X-Forwarded-For', req.connection.remoteAddress);
                proxyReq.setHeader('X-My-Custom-Header', 'MyCustomValue');
            },

            // Add/modify headers in response (target server -> client)
            onProxyRes: (proxyRes) => {
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';
                proxyRes.headers['Access-Control-Allow-Methods'] =
                    'GET, POST, PUT, DELETE, OPTIONS';
                proxyRes.headers['Access-Control-Allow-Headers'] =
                    'Origin, X-Requested-With, Content-Type, Accept';
                proxyRes.headers['X-Reverse-Proxy'] = 'MyCustomReverseProxy';
            },
        });

        return proxy(req, res, next);
    } catch (error) {
        return res.status(400).send(`Invalid URL: ${error.message}`);
    }
};

app.get('/proxy', createDynamicProxy);

app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Not Found',
        message: 'Page not found',
        error: { status: 404 },
    });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).render('error', {
        title: 'Error',
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {},
    });

    console.log(err.message);
});
app.listen(port, () => {
    console.log(`Anime website running on http://localhost:${port}`);
});

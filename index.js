require('dotenv/config');
const path = require('path');
const cors = require('cors');
const express = require('express');

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

// Error handling
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

// Start server
app.listen(port, () => {
    console.log(`Anime website running on http://localhost:${port}`);
});

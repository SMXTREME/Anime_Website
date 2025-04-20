function enableCORS(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow these HTTP methods
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    ); // Allow these headers

    if (req.method === 'OPTIONS') {
        // Preflight request
        return res.sendStatus(200); // Stop processing for OPTIONS requests and return 200 status
    }

    next(); // Continue to the next middleware or route handler
}

module.exports = { enableCORS };
